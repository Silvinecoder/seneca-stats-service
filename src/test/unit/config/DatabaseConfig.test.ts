import { initializeDatabase, AppDataSource } from "../../../config/DatabaseConfig"; // adjust the import path
import { config } from "dotenv";

// Mock the 'DataSource' class from 'typeorm' so no real database interaction happens
jest.mock("typeorm", () => {
  const actualTypeORM = jest.requireActual("typeorm");
  return {
    ...actualTypeORM,
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn(),
    })),
  };
});

// Mock dotenv configuration
config();

describe("initializeDatabase", () => {
  let initializeMock: jest.Mock;

  beforeEach(() => {
    // Reset the mock before each test
    initializeMock = AppDataSource.initialize as jest.Mock;

    // Mock process.exit to prevent it from terminating the test process
    jest.spyOn(process, "exit").mockImplementation((code?: string | number | null | undefined): never => {
      // Do nothing here, just return `never` explicitly
      return undefined as never;
    });
  });

  afterEach(() => {
    // Restore process.exit mock after each test
    jest.restoreAllMocks();
  });

  it("should call initialize on AppDataSource", async () => {
    // Arrange
    initializeMock.mockResolvedValueOnce(undefined); // Mock a successful connection

    // Spy on console.log to check success message
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    // Act
    await initializeDatabase();

    // Assert
    expect(initializeMock).toHaveBeenCalledTimes(1);  // Ensure it was only called once
    expect(logSpy).toHaveBeenCalledWith("✅ Database connected!");

    logSpy.mockRestore(); // Restore original console.log
  });

  it("should handle connection errors", async () => {
    // Arrange
    const errorMessage = "Connection failed!";
    initializeMock.mockRejectedValueOnce(new Error(errorMessage));

    // Spy on console.error to check error message
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Act
    await initializeDatabase();

    // Assert
    expect(initializeMock).toHaveBeenCalledTimes(1);  // Ensure it was only called once
    expect(errorSpy).toHaveBeenCalledWith("❌ Database connection error:", expect.any(Error));

    errorSpy.mockRestore(); // Restore original console.error
  });
});



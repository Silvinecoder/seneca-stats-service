<h1 align="center">Seneca Statistics Service</h1>

The platform needs to track user statistics for specific courses.
A statistics service is required to store and manage user statistics for each course.
The service will expose these statistics through an HTTP API.

## Setup your environment
```
Install your packages with
npm install 

Setup docker with your database seed
docker-compose up --build

Run the seed script to populate your database
npx ts-node src/database-seed/seeds.ts

Then start your application
npx ts-node src/index.ts

Test your endpoints with postman
https://web.postman.co/workspace/a046d3b4-8fd4-4e62-8527-9454eda49867/collection/41168150-78da16b7-4a5a-4cae-bb73-d44eaf236396?action=share&source=copy-link&creator=41168150
```


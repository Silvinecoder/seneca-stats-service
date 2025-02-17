FROM node:16

WORKDIR /src

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Then copy the rest of the code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
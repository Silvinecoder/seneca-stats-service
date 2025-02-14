FROM node:16

WORKDIR /src

COPY package.json ./

RUN npm install

COPY ./ /src

EXPOSE 3000

CMD ["npm", "start", "dev"]
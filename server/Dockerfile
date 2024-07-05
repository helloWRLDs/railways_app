FROM node:20.15.0-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run seed

EXPOSE 8080

CMD [ "npm", "start" ]
FROM node:alpine

RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN npm install

CMD npx nodemon server/index.js;

EXPOSE 8000

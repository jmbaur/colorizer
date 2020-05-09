FROM node:alpine

RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npx", "nodemon", "index.js" ]
EXPOSE 8000

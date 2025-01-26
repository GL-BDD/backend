# Description: Dockerfile for the nodejs image
FROM node:v23.1.0

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "node", "index.js" ]



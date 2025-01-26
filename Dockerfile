# Description: Dockerfile for the nodejs image
FROM node:lts

# Bundle app source
COPY . .

RUN npm install


EXPOSE 5000

CMD [ "node", "index.js" ]



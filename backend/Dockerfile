FROM node:14.16.0
WORKDIR /usr/src/backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "--experimental-json-modules", "app.js"]
FROM node:15.10.0-alpine3.10
WORKDIR /usr/src/backend
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD [ "node", "--experimental-json-modules", "app.js"]
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install both dependencies and devDependencies
RUN npm install

COPY . .

EXPOSE 5001
FROM node:10.15.3 as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm build
FROM nginx:1.15.11-alpine
ADD default.conf /etc/nginx/conf.d/default.conf
COPY perceptia/build/ /usr/share/nginx/html
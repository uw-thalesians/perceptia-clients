FROM node:10.15.3 as builder
ARG REACT_APP_WEB_SERVER_HOST
ARG REACT_APP_API_SERVER_HOST
ARG REACT_APP_API_SERVER_PORT
ARG REACT_APP_API_SERVER_SCHEME
WORKDIR /usr/src/app
COPY perceptia/package-lock.json perceptia/package.json ./
RUN npm install
COPY perceptia/ ./
RUN npm run build

FROM nginx:1.15.11-alpine
ADD default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
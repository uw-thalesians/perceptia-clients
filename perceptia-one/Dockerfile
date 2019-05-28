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
# Create directory to hold script
RUN mkdir -p /script
WORKDIR /script
ADD config/perceptia.template /etc/nginx/conf.d/perceptia.template
ADD config/entrypoint.sh /script/entrypoint.sh
# Make setup script executable
RUN chmod +x entrypoint.sh

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80 443

CMD /bin/sh /script/entrypoint.sh
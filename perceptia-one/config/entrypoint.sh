#!/bin/sh

envsubst '${PONE_SERVER_HOST} ${PONE_TLS_CERT} ${PONE_TLS_KEY}' < /etc/nginx/conf.d/perceptia.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
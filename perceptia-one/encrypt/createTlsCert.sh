#!/usr/bin/env bash
openssl req -x509 -out fullchain.pem -keyout privkey.pem \
  -newkey rsa:2048 -nodes -sha256 \
  -extensions EXT -config openssl.conf
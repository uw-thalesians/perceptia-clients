kubectl create secret tls web-tls --cert=$Env:SECRET_PERCEPTIA_CLIENTS\ssl\archive\perceptia.info\fullchain1.pem --key=$Env:SECRET_PERCEPTIA_CLIENTS\ssl\archive\perceptia.info\privkey1.pem --namespace production
kubectl create secret tls web-tls --cert=$Env:SECRET_PERCEPTIA_CLIENTS\ssldev\archive\dev.perceptia.info\fullchain1.pem --key=$Env:SECRET_PERCEPTIA_CLIENTS\ssldev\archive\dev.perceptia.info\privkey1.pem --namespace development
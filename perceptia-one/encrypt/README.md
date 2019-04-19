# Local Development Encryption Files

## PerceptiaOne web client tls cert and key

The script createTlsCert.sh will generate a private key and a certificate for "localhost" signed with that key.
The script uses the openssl application to generate the key and cert. The local .gitignore file in this directory ensures that the generated .pem files are not added to the Git repository. The script should be run in a bash interpreter and the openssl application should already be installed.
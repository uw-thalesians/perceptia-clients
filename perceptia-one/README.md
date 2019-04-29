# PerceptiaOne Client Implementation

Last updated: 2019-04-18

The PerceptiaOne web client is the first iteration of the Perceptia applications web front-end. This readme explains how the files in this directory are used to build the web client.

## Getting Started

The web client is designed to run within an the nginx docker container. This README will describe the key files used to build and run this client in a container.

## Setup

### Directory Structure

#### Root ./

The root of the PerceptiaOne directory contains the supporting files for building the application.

**Dockerfile:** multi-stage docker file to build the client and package it with the nginx docker image

**.dockerignore:** identifies which files should be accessible to commands in the Dockerfile and sent to the docker deamon

**.gitignore:** identifies which files in the perceptia-one directory should be tracked by git

**localStartExample.ps1:** is meant for local testing of the client in a docker container

#### Perceptia ./perceptia/

 Directory containing the source code for the PerceptiaOne web client.

**./public/:** the main index.html file, the entrypoint for the web app

**./src/** directory containing the source code for the web app

**package.json:** used to define the create-react-app config and project dependencies

**./node_modules** should not be checked into version control. Contains the dependencies of the application. Created by running `npm install`

**./build/** should not be checked into version control. Contains the built version of the web client, ready to be served. Created by running `npm run build`

### Building the container image

Builds of this container image are automatically triggered by pushes to the GitHub repository.
Builds are tagged using the semver scheme, incrementing as features and breaking changes are made (as defined in an variable in the azure-pipelines.yml file in the root of this repository). For a complete description of the possible tags see the [perceptiaone container repository](https://hub.docker.com/r/uwthalesians/perceptiaone) on the container registry DockerHub.

### Running the PerceptiaOne Client Locally (no container)

The PerceptiaOne client was initialized using the create react app tooling. This site can be worked on locally, but will require certain environment variables to be set (see configuration below).

First, you will need to initialize the environment variables listed below. You can either place these in the local environment, or create a .env.local file in the perceptia directory containing the two environment variables. The Web Server Host variable should be set to 'localhost', and the Api Server Host should be set to the host name for which ever api server you are running the client against (prod, dev, local instance).

Now, from within the perceptia directory, run `npm start` which will build the client and host it from localhost. The script should automatically open the site in your web browser.

### Running the PerceptiaOne Client Locally

The PerceptiaOne client was initialized using the create react app tooling. This site can be worked on locally, but will require certain environment variables to be set (see configuration below) and a tls certificate will also need to be created. The following instructions explain how to build and run a docker container locally to serve the PerceptiaOne client.

First, you will need to follow the instructions in the encrypt directory to generate a self-signed certificate for localhost. This is required by the container to host the site over https.

Now that the certificate and key have been created, you should be able to run the `localStartExample.ps1` script to build the container and run it.

Note, the default api server used by the client is `api.dev.perceptia.info`. If you want to use a local api server you can provide the host portion to the script using the -ApiServerHost, -ApiServerPort and -ApiServerScheme option.

### Build Configuration

#### Requirements

 TODO

#### Environment Variables

Use the following variables to configure the client for the given environment during the build process (passed as build args to docker build command).

`REACT_APP_WEB_SERVER_HOST=<hostname>` (REQUIRED) identifies the host portion the site is being served from. Replace \<hostname\> with the appropriate ip or hostname such as localhost

`REACT_APP_API_SERVER_HOST=<hostname>` (REQUIRED) indicates the hostname that should be used for all requests to the API server. Replace \<hostname\> with the appropriate ip or hostname

`REACT_APP_API_SERVER_SCHEME=<scheme>` (REQUIRED) indicates the scheme that should be used for all requests to the API server. Replace \<scheme\> with the appropriate scheme, such as "https"

`REACT_APP_API_SERVER_PORT=<port>` (REQUIRED) indicates the port that should be used for all requests to the API server. Replace \<port\> with the appropriate port, such as "443" for default https

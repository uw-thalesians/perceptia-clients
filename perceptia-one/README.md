# PerceptiaOne Client Implementation

Last updated: 2019-05-08

The PerceptiaOne web client is the first iteration of the Perceptia applications web front-end. This readme explains how the files in this directory are used to build the web client.

## [Contents](#contents)

* [Getting Started](#getting-started)

* [Structure](#structure)

  * [Config and Setup Files](#config-and-setup-files)

  * [Perceptia Source](#perceptia-source)

* [Setup](#setup)

  * [Building the Image](#building-the-image)

  * [Custom Image](#custom-image)

* [Start Server Locally](#start-server-locally)

  * [Start with Script](#start-with-script)

    * [PowerShell](#powershell)

  * [Start with NPM Locally](#start-with-npm-locally)

    * [Environment Variables](#environment-variables)

## [Getting Started](#getting-started)

The web client is designed to run within an the nginx docker container. This README will describe the key files used to build and run this client in a container.

## [Structure](#structure)

### [Config and Setup Files](#config-and-setup-files)

The root of the PerceptiaOne directory contains the supporting files for building the application.

[Dockerfile](./Dockerfile): multi-stage docker file to build the client and package it with the nginx docker image

[.dockerignore:](./.dockerignore) identifies which files should be accessible to commands in the Dockerfile and sent to the docker deamon

[.gitignore:](./.gitignore) identifies which files in the perceptia-one directory should be tracked by git

[localStartExample.ps1:](./localStartExample.ps1) is meant for local testing of the client in a docker container

### [Perceptia Source](#perceptia-source)

[Perceptia:](./perceptia/) Directory containing the source code for the PerceptiaOne web client.

### [NGINX Config](#nginx-config)

[config:](./config/) Directory containing the config for the nginx server.

## [Setup](#setup)

The perceptia react app is designed to be deployed using a linux container. The following subsections explain how this container is built and how to use it. The perceptia react app is currently built on the [Nginx](https://hub.docker.com/_/node/) image `node:10.15.3`, and the perceptiaone image is then based off the [Nginx](https://hub.docker.com/_/nginx/) image `nginx:1.15.11-alpine`.

### [Building the Image](#building-the-image)

Builds of this container image are automatically triggered by pushes to the GitHub repository.

Builds are tagged using the semver scheme, incrementing as features and breaking changes are made (as defined in an variable in the azure-pipelines.yml file in the root of this repository). For a complete description of the possible tags see the [perceptiaone container repository](https://hub.docker.com/r/uwthalesians/perceptiaone) on the container registry DockerHub.

#### [Build](#build)

The image can be built locally using the docker build command. This command should be run from this directory (where the Dockerfile is located). See the local start script for an automated build and run.

Example docker build command: `    docker build --tag "${PERCEPTIAONE_IMAGE_AND_TAG}" --build-arg REACT_APP_WEB_SERVER_HOST=$REACT_APP_WEB_SERVER_HOST --build-arg REACT_APP_API_SERVER_HOST=$REACT_APP_API_SERVER_HOST --build-arg REACT_APP_API_SERVER_PORT=$REACT_APP_API_SERVER_PORT --build-arg REACT_APP_API_SERVER_SCHEME=$REACT_APP_API_SERVER_SCHEME --no-cache .`

Commands:

  `--tag` is the name the image will be given (the name used to then run the built image as a container)

  `--build-arg` is an argument made available to the builder container used to build the prepared source for the perceptiaone image

  `--no-cache` ensures that source code is always updated in container

  `.` the final period in the command indicates the root directory to send to the docker deamon for the build process, this should be the directory where the Dockerfile is located

### [Custom Image](#custom-image)

The Perceptiaone image will be used during development and production. Information about this custom image can be found in the Thalesians container registry on DockerHub [uwthalesians/perceptiaone](https://hub.docker.com/r/uwthalesians/perceptiaone).

Please refer to the description on the [container registry](https://hub.docker.com/r/uwthalesians/perceptiaone) for specifics on how to configure it. The information below only provides an exmaple setup.

#### [Custom Image Specific Options](#custom-image-specific-options)

This section list any configuration options for the custom image.

##### [Container Environment Variables](#custom-image-env-vars)

Environment variables must be passed to be accessible to the entrypoint.sh script (such as using the --env flag with the docker run commnad)

Use the following variables to configure the nginx server for the given environment.

`PONE_SERVER_HOST={hostname}` (REQUIRED) configures the hostname that the server is serving files for.

`PONE_TLS_CERT={fileName}` (REQUIRED) should be the name of the tls cert mounted into the volume at "/etc/sitecert/"

`PONE_TLS_KEY={fileName}` (REQUIRED) should be the name of the tls key mounted into the volume at "/etc/sitecert/"

## [Start Server Locally](#start-server-locally)

This setup explains how to build and start the server locally.

### [Start with Script](#start-with-script)

Building and starting the perceptiaone container locally can be more involed than running one script. The following must be setup:

1. Populate the [./encrypt](./encrypt) directory with the apprioriate TLS certificates for localhost. See [./encrypt/README.md](./encrypt/README.md) for instructions.

2. Continue to script, [PowerShell](#powershell)

#### [PowerShell](#powershell)

For testing the perceptiaone locally, the [localStartExample.ps1](./localStartExample.ps1) script can be used. This script assumes that docker is already installed and running on the system and that the TLS cert and key have been generated (see note above). Note, the script is a PowerShell script and thus requires a PowerShell shell. Additionally, PowerShell will not run unsigned scripts by default, therefore you [may need to enable running unsigned scripts](https://superuser.com/questions/106360/how-to-enable-execution-of-powershell-scripts) to use it.

The PowerShell script, [localStartExample.ps1](./localStartExample.ps1) will run the perceptiaone image as a container inside a docker network and expose it to localhost. This script has several command line options which allow you to customize the instance.

##### Comand Line Options

The script accepts several comand line options which can be set when running the script in a PowerShell terminal. No positional options.

Unless you need to build the perceptiaone image locally, you should not have to provide any options to the local start script.

Run: `.\locaStartExample.ps1`

However, **if you want to build the image locally from source**, you need to include the -BuildPOne switch parameter.

Run: `.\locaStartExample.ps1 -BuildPOne`

Note, **if you want to build the image locally from source but want to use an api server that is not the default**, you need to include the options defined below: -ApiServerHost, -ApiServerScheme, -ApiServerPort.

Run: `.\locaStartExample.ps1 -BuildPOne`

`-ApiServerHost` (string) which is the host that the website should make api calls to. Default value is "localhost". Note, if you do not use the -BuildPOne switch option, the only host the client will use is "api.dev.perceptia.info"

`-ApiServerScheme` (string) which is the scheme that the website should make api calls using. Default value is "https". Note, if you do not use the -BuildPOne switch option, the only scheme the client will use is "https"

`-ApiServerPort` (string) which is the port that the website should make api calls to. Default value is "4443". Note, if you do not use the -BuildPOne switch option, the only port the client will use is "443"

`-POnePortPublish` (string) which is the port to publish the perceptiaone container if run by this script, default is: "4444"

`-BuildPOne` (switch) will build the perceptiaone image using the local source, default is: false. To set true, include the switch

`-Latest` (switch) will use the latest version of the perceptiaone image build for the develop branch, instead of a spcific version

`-CleanUp` (switch) will remove the container(s) started by this script

### [Start with Docker Commands](#start-with-docker-commands)

For directions to start the container locally using a script, see [Start Server Locally](#start-server-locally).

1. pull the image from docker (check [registry](https://hub.docker.com/r/uwthalesians/perceptiaone) for latest images)

   `docker pull uwthalesians/perceptiaone:0.0.1-build-latest-branch-develop`

2. run the container image (replace variables with the correct values)

   See end of [localStartExample.ps1](./localStartExample.ps1) for example docker run

### [Start with NPM Locally](#start-with-npm-locally)

The PerceptiaOne client was initialized using the create react app tooling. This site can be worked on locally, but will require certain environment variables to be set (see configuration below) and a local env file to be created.

1. First, you will need to initialize the environment variables listed below. You can either place these in the local environment, or **create a .env.local file in the perceptia directory** containing the  environment variables. If you decide to create the .env.local file you can read [facebook article for react developers](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#adding-development-environment-variables-in-env) to see the specifics of this file. Basically it is a text file where each line is a key=value pair for each of the environemnt variables you want the react build command to replace. Note, the [.gitignore](./.gitignore) is setup to ignore the .env.local file so that your local env setup will not impact another developer.

2. If this is your first time running the perceptia react app locally, you should first run the command `npm install` to download all the packages described in the [package.json](./perceptia/package.json) file.

3. Now, from within the perceptia directory, run `npm run start` which will build the client and host it from localhost. The script should automatically open the site in your web browser.

#### [Environment Variables](#environment-variables)

Use the following variables to configure the client for the given environment during the build process (passed as build args to docker build command or placed in .env.local file for the npm build command).

`REACT_APP_WEB_SERVER_HOST=<hostname>` (REQUIRED) identifies the host portion the site is being served from. Replace \<hostname\> with the appropriate ip or hostname such as localhost

`REACT_APP_API_SERVER_HOST=<hostname>` (REQUIRED) indicates the hostname that should be used for all requests to the API server. Replace \<hostname\> with the appropriate ip or hostname

`REACT_APP_API_SERVER_SCHEME=<scheme>` (REQUIRED) indicates the scheme that should be used for all requests to the API server. Replace \<scheme\> with the appropriate scheme, such as "https"

`REACT_APP_API_SERVER_PORT=<port>` (REQUIRED) indicates the port that should be used for all requests to the API server. Replace \<port\> with the appropriate port, such as "443" for default https

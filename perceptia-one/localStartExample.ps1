Param (
    [String]$ApiServerHost = "dev.perceptia.info"
)

Write-Host "Preparing to build the PerceptiaOne image"
Write-Host "The value for the ApiServerHost was: $ApiServerHost"

Set-Variable -Name LATEST_COMMIT -Value "$(git rev-parse --short HEAD)"
Set-Variable -Name PERCEPTIAONE_IMAGE_NAME -Value "perceptiaone"
Set-Variable -Name PERCEPTIAONE_IMAGE_TAG -Value "${LATEST_COMMIT}"
Set-Variable -Name PERCEPTIAONE_IMAGE_AND_TAG -Value "${PERCEPTIAONE_IMAGE_NAME}:${PERCEPTIAONE_IMAGE_TAG}"
Set-Variable -Name PERCEPTIAONE_CONTAINER_NAME -Value "perceptiaone"

Set-Variable -Name REACT_APP_WEB_SERVER_HOST -Value "localhost"
Set-Variable -Name REACT_APP_API_SERVER_HOST -Value $ApiServerHost

Write-Host "Building the container image..."
docker build --tag "${PERCEPTIAONE_IMAGE_AND_TAG}" `
--build-arg REACT_APP_WEB_SERVER_HOST=$REACT_APP_API_SERVER_HOST `
--build-arg REACT_WEB_SERVER_HOST=REACT_APP_WEB_SERVER_HOST .

Set-Variable -Name PERCEPTIAONE_TLSMOUNTSOURCE -Value "$(Get-Location)\encrypt\"

Write-Host "Removing any existing containers with the name: $PERCEPTIAONE_CONTAINER_NAME"
docker rm --force ${PERCEPTIAONE_CONTAINER_NAME}

Write-Host "Running the container..."
docker run `
--detach `
--name ${PERCEPTIAONE_CONTAINER_NAME} `
--publish "4443:443" `
--restart on-failure `
--mount type=bind,source="$PERCEPTIAONE_TLSMOUNTSOURCE",target="/etc/sitecert",readonly `
${PERCEPTIAONE_IMAGE_AND_TAG}

Write-Host "Container is listening for requests at https://localhost:4443"
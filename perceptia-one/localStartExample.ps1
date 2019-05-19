Param (
    [String]$ApiServerHost = "localhost",
    [String]$ApiServerPort = "4443",
    [String]$ApiServerScheme = "https",
    [String]$POnePortPublish = "4444",
    [switch]$BuildPOne = $false,
    [switch]$Latest = $false,
    [switch]$CleanUp

)

Set-Variable -Name LATEST_COMMIT -Value "$(git rev-parse --short HEAD)"
Set-Variable -Name PERCEPTIAONE_IMAGE_NAME -Value "perceptiaone"
Set-Variable -Name PERCEPTIAONE_IMAGE_TAG -Value "${LATEST_COMMIT}"
Set-Variable -Name PERCEPTIAONE_IMAGE_AND_TAG -Value "${PERCEPTIAONE_IMAGE_NAME}:${PERCEPTIAONE_IMAGE_TAG}"
Set-Variable -Name PERCEPTIAONE_CONTAINER_NAME -Value "perceptiaone"

Set-Variable -Name REACT_APP_WEB_SERVER_HOST -Value "localhost"
Set-Variable -Name REACT_APP_API_SERVER_HOST -Value $ApiServerHost
Set-Variable -Name REACT_APP_API_SERVER_PORT -Value $ApiServerPort
Set-Variable -Name REACT_APP_API_SERVER_Scheme -Value $ApiServerScheme

Set-Variable -Name PART_OF -Value "perceptiaone-svc"


if (!$CleanUp) {
    if ($BuildPOne) {
        Write-Host "Preparing to build the PerceptiaOne image"
        Write-Host "Building perceptiaone image: $PERCEPTIAONE_IMAGE_AND_TAG"
        docker build --tag "${PERCEPTIAONE_IMAGE_AND_TAG}" `
        --build-arg REACT_APP_WEB_SERVER_HOST=$REACT_APP_WEB_SERVER_HOST `
        --build-arg REACT_APP_API_SERVER_HOST=$REACT_APP_API_SERVER_HOST `
        --build-arg REACT_APP_API_SERVER_PORT=$REACT_APP_API_SERVER_PORT `
        --build-arg REACT_APP_API_SERVER_SCHEME=$REACT_APP_API_SERVER_SCHEME `
        --no-cache `
        .
    } else {
        Write-Host "-BuildPOne option false, using prebuilt image from dockerhub"
        Set-Variable -Name PONE_OPT -Value "163"
        if ($Latest) {
            Set-Variable -Name PONE_OPT -Value latest
        }
        Set-Variable -Name PERCEPTIAONE_IMAGE_AND_TAG -Value "uwthalesians/perceptiaone:0.0.1-build-${PONE_OPT}-branch-develop"
    }
    
    
    Set-Variable -Name PERCEPTIAONE_TLSMOUNTSOURCE -Value "$(Get-Location)/encrypt/"
    
    Write-Host "Removing any existing containers with the label: 'label.perceptia.info/part-of=$PART_OF' "
    docker rm --force (docker ps -aq --filter "label=label.perceptia.info/part-of=$PART_OF")
    
    Write-Host "Running the container..."
    docker run `
    --detach `
    --label "label.perceptia.info/name=perceptiaone" `
    --label "label.perceptia.info/instance=perceptiaone-1" `
    --label "label.perceptia.info/managed-by=docker" `
    --label "label.perceptia.info/component=server" `
    --label "label.perceptia.info/part-of=$PART_OF" `
    --name ${PERCEPTIAONE_CONTAINER_NAME} `
    --publish "8080:80" `
    --publish "${POnePortPublish}:443" `
    --restart on-failure `
    --mount type=bind,source="$PERCEPTIAONE_TLSMOUNTSOURCE",target="/etc/sitecert",readonly `
    ${PERCEPTIAONE_IMAGE_AND_TAG}
    
    Write-Host "Container is listening for requests at https://localhost:${POnePortPublish}"
    Start-Process "https://localhost:${POnePortPublish}"
} else {
    docker rm --force (docker ps -aq --filter "label=label.perceptia.info/part-of=$PART_OF")
}

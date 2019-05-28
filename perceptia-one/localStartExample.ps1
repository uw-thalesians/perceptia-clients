Param (
    [switch]$Latest,
    [string]$Build = "309",
    [string]$Branch = "develop",
    [switch]$CurrentBranch,

    [switch]$BuildPOne,
    [string]$POneVersion = "0.1.1",
    [String]$POnePortPublish = "4444",

    [String]$ApiServerHost = "localhost",
    [String]$ApiServerPort = "4443",
    [String]$ApiServerScheme = "https",
    [switch]$ApiServerDev,
    [switch]$ApiServerProd,

    [switch]$CleanUp
)

# Setup Base Veriables

Set-Variable -Name DOCKERHUB_ORG -Value "uwthalesians"

Set-Variable -Name LATEST_COMMIT -Value "$(git rev-parse --short HEAD)"

## Perceptiaone Variables
Set-Variable -Name PERCEPTIAONE_SERVICE_NAME -Value "perceptiaone-lc-svc"

Set-Variable -Name PERCEPTIAONE_IMAGE_NAME -Value "perceptiaone"
Set-Variable -Name PERCEPTIAONE_CONTAINER_NAME -Value "perceptiaone"

Set-Variable -Name PERCEPTIAONE_TLSMOUNTSOURCE -Value "$(Get-Location)/encrypt/"

### Perceptiaone Build Variables
Set-Variable -Name REACT_APP_WEB_SERVER_HOST -Value "localhost"
Set-Variable -Name REACT_APP_API_SERVER_PORT -Value "443"
Set-Variable -Name REACT_APP_API_SERVER_SCHEME -Value "https"




if (!$CleanUp) {
    if ($ApiServerProd -and $BuildPOne) {
        Write-Host "-ApiServerProd option set, ignoring individual -ApiServer* options"
        Write-Host "API requests will be made to: https://api.perceptia.info:443"
        Set-Variable -Name REACT_APP_API_SERVER_HOST -Value "api.perceptia.info"
    
    } elseif ($ApiServerDev -and $BuildPOne) {
        Write-Host "-ApiServerDev option set, ignoring individual -ApiServer* options"
        Write-Host "API requests will be made to: https://api.dev.perceptia.info:443"
        Set-Variable -Name REACT_APP_API_SERVER_HOST -Value "api.dev.perceptia.info"
    } else {
        Set-Variable -Name REACT_APP_API_SERVER_HOST -Value $ApiServerHost
        Set-Variable -Name REACT_APP_API_SERVER_PORT -Value $ApiServerPort
        Set-Variable -Name REACT_APP_API_SERVER_SCHEME -Value $ApiServerScheme
    }
    
    Write-Host "`n"
    if (($POneVersion).Length -eq 0) {
        Write-Host "Version must be provided, but no version provided for perceptiaone, exiting..."
        exit(1)
}
    # Define Image Tags to use
    Set-Variable -Name TAG_BRANCH -Value $Branch
    if ($CurrentBranch) {
            Set-Variable -Name TAG_BRANCH -Value ((git rev-parse --abbrev-ref HEAD) -replace "^(?:(?:[^//]{0,})[/]{1,1}){1,}")
            Write-Host "CurrentBranch switch provided, using build from branch: $TAG_BRANCH"
    }

    if (($TAG_BRANCH).Length -eq 0) {
            Write-Host "Branch must be set, but no branch set, exiting"
            exit(1)
    }

    
    Set-Variable -Name TAG_BUILD -Value $Build # Build number 
    
    if ($Latest) {
            Write-Host "Latest switch provided, using latest build from branch: $TAG_BRANCH"
            Set-Variable -Name TAG_BUILD -Value "latest"              
    } else {
            Write-Host "Using build $TAG_BUILD from branch: $TAG_BRANCH"
            Set-Variable -Name TAG_BUILD -Value "$Build"              
    }
    if (($TAG_BUILD).Length -eq 0) {
            Write-Host "Build must be provided, but no build provided, exiting..."
            exit(1)
    } 
    Write-Host "`n"
    
    Set-Variable -Name BUILD_AND_BRANCH -Value "build-${TAG_BUILD}-branch-${TAG_BRANCH}"
    if ($BuildPOne) {
        Write-Host "-BuildPOne option provided, ignoring branch, build, and version modifying options..."
        Write-Host "Preparing to build the PerceptiaOne image from source"
        Write-Host "`n"
        Set-Variable -Name PERCEPTIAONE_IMAGE_TAG -Value "${LATEST_COMMIT}"
        Set-Variable -Name PERCEPTIAONE_IMAGE_AND_TAG -Value "${PERCEPTIAONE_IMAGE_NAME}:${PERCEPTIAONE_IMAGE_TAG}"
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
        
        Set-Variable -Name PERCEPTIAONE_IMAGE_AND_TAG -Value "${DOCKERHUB_ORG}/${PERCEPTIAONE_IMAGE_NAME}:${POneVersion}-${BUILD_AND_BRANCH}"
        Write-Host "Using perceptiaone image: $PERCEPTIAONE_IMAGE_AND_TAG"
        Write-Host "`n"
    }
    

    # Remove Existing Containers
    if ((docker ps -aq --filter "label=label.perceptia.info/part-of=${PERCEPTIAONE_SERVICE_NAME}").Length -gt 0) {
        Write-Host "`n"
        Write-Host "Removing all containers started by this script..."
        Write-Host "`n"
        docker rm --force (docker ps -aq --filter "label=label.perceptia.info/part-of=${PERCEPTIAONE_SERVICE_NAME}")
    }
    if (!$BuildPOne) {
        # Check if image exists
        (docker pull $PERCEPTIAONE_IMAGE_AND_TAG) | Out-Null 
        if (!$?) {
                Write-Host "Image: $PERCEPTIAONE_IMAGE_AND_TAG not found on dockerhub, exiting"
                exit(1)
        }
    }
    
    Write-Host "Running the perceptiaone container..."
    docker run `
    --detach `
    --env PONE_SERVER_HOST="localhost" `
    --env PONE_TLS_CERT="fullchain.pem" `
    --env PONE_TLS_KEY="privkey.pem" `
    --label "label.perceptia.info/name=${PERCEPTIAONE_CONTAINER_NAME}" `
    --label "label.perceptia.info/instance=${PERCEPTIAONE_CONTAINER_NAME}-1" `
    --label "label.perceptia.info/managed-by=docker" `
    --label "label.perceptia.info/component=server" `
    --label "label.perceptia.info/part-of=${PERCEPTIAONE_SERVICE_NAME}" `
    --name ${PERCEPTIAONE_CONTAINER_NAME} `
    --publish "8080:80" `
    --publish "${POnePortPublish}:443" `
    --restart on-failure `
    --mount type=bind,source="$PERCEPTIAONE_TLSMOUNTSOURCE",target="/etc/sitecert",readonly `
    ${PERCEPTIAONE_IMAGE_AND_TAG}
    Write-Host "`n"
    Write-Host "Container is listening for requests at https://localhost:${POnePortPublish}"
    Start-Process "https://localhost:${POnePortPublish}"
    Write-Host "`n"
    if (!$BuildPOne) {
        Write-Host "`n"
        Write-Host "Reminder: Script was run without -BuildPOne option, meaning client will be using the api.dev.perceptia.info as the host for all api reqeusts."
        Write-Host "`n"
        Write-Host "To run the container for local host you must build locally using the -BuildPOne option."
        Write-Host "If you use -BuildPOne option, you can use the -ApiServerHost, -ApiServerPort, and ApiServerScheme options to specify a different api server."
        Write-Host "`n"
    } else {
        Write-Host "`n"
        Write-Host "Api requests will be made to: ${REACT_APP_API_SERVER_SCHEME}://${REACT_APP_API_SERVER_HOST}:${REACT_APP_API_SERVER_PORT}"
        Write-Host "`n"
    }
} else {
    # Remove Existing Containers
    if ((docker ps -aq --filter "label=label.perceptia.info/part-of=${PERCEPTIAONE_SERVICE_NAME}").Length -gt 0) {
        Write-Host "`n"
        Write-Host "Removing all containers started by this script..."
        Write-Host "`n"
        docker rm --force (docker ps -aq --filter "label=label.perceptia.info/part-of=${PERCEPTIAONE_SERVICE_NAME}")
    } else {
        Write-Host "`n"
        Write-Host "No containers started by this script were found, you're good to go."
        Write-Host "`n"
    }
    Write-Host "CleanUp complete."
    Write-Host "`n"
}

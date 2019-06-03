Param (
        [Switch]$DeleteDeployment,
        [switch]$Prod
)


if ($Prod) {
        Set-Variable -Name NAMESPACE -Value "production" 
        Set-Variable -Name DEPLOY_DIR -Value "prod"
        Write-Host "Prod switch set, using $NAMESPACE namespace for all actions..."
} else {
        Set-Variable -Name NAMESPACE -Value "development"
        Set-Variable -Name DEPLOY_DIR -Value "dev"
        Write-Host "Prod switch not set, defaulting to $NAMESPACE namespace for all actions..."
}

if ($DeleteDeployment) {
        Write-Host "`n"
        Write-Host "Deleting Deployment for namespace: $NAMESPACE"
        kubectl delete -f "./../deploy/common" -f "./../deploy/$DEPLOY_DIR" --namespace $NAMESPACE

} else {
        Write-Host "`n"
        Write-Host "Deploying for namespace: $NAMESPACE"
        kubectl apply -f "./../deploy/common" -f "./../deploy/$DEPLOY_DIR" --namespace $NAMESPACE
}
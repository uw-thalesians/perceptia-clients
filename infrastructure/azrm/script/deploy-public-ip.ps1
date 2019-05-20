# deploy-public-ip.ps1
# Deploy public ip to be used by web services in cluster

param(
        [switch]$DeployProd,
        [switch]$DeployDev
)

if ($DeployProd) {
        Write-Host "Deploying public ip named: web"
        New-AzResourceGroupDeployment `
        -ResourceGroupName perceptiaWeb `
        -Name PerceptiaPublicIpWebDeployment `
        -TemplateFile ..\template\deploypublicip.json `
        -TemplateParameterFile ..\parameter\deploypublicip.web.json
}

if ($DeployDev) {
        Write-Host "Deploying public ip named: web-dev"
        New-AzResourceGroupDeployment `
        -ResourceGroupName perceptiaWeb `
        -Name PerceptiaPublicIpWebDevDeployment `
        -TemplateFile ..\template\deploypublicip.json `
        -TemplateParameterFile ..\parameter\deploypublicip.web.dev.json
}





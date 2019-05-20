# deploy-rg.ps1
# Deploys resource groups used by perceptia web service

Write-Host "Deploying resource group: perceptiaWeb"
New-AzDeployment `
-Name PerceptiaWebRgDeployment `
-Location "westus2" `
-TemplateFile ..\template\deployrg.json `
-TemplateParameterFile ..\parameter\deployrg.perceptiaWeb.json
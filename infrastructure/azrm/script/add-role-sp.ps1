# add-roll-sp.ps1
# Adds role to sp used by Aks cluster
Write-Host "Adding Network Contributor role to perceptiaCluster sp for perceptiaWeb rg"

New-AzResourceGroupDeployment `
-ResourceGroupName perceptiaWeb `
-Name PerceptiaAksSpRoleWebDeployment `
-TemplateFile ..\template\addrole.json `
-TemplateParameterFile "..\parameter\addrole.perceptiaWeb.json" `
-roleNameGuid  $(New-Guid)
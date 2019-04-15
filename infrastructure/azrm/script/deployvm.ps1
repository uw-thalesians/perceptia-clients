New-AzResourceGroupDeployment `
-Name PerceptiaWebVmDeployment `
-Location "westus2" `
-TemplateFile ..\template\deployrg.json
-TemplateParameterFile ..\template\parameters-deployvm.json

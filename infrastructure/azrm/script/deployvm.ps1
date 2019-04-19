New-AzResourceGroupDeployment `
-ResourceGroupName perceptiaWeb `
-Name PerceptiaWebVmDeployment `
-TemplateFile ..\template\deployvm.json `
-TemplateParameterFile ..\template\parameters-deployvm.json

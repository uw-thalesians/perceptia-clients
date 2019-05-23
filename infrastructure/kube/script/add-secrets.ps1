# Add production secrets

kubectl create secret generic perceptiaone --type=string `
--from-literal=server-host="perceptia.info" `
--namespace production

# Add development secrets

kubectl create secret generic perceptiaone --type=string `
--from-literal=server-host="dev.perceptia.info" `
--namespace development
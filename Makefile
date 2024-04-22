# check k8s created secret `kubectl get secret`
mongo-secret: # 1 step (before dependent deploys)
	kubectl apply -f mongodb-secret.yaml 

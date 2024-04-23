# check k8s created secret `kubectl get secret`
mongo-secret: # 1 step (before dependent deploys)
	kubectl apply -f secret-mongodb.yaml 

restart-front:
	kubectl delete deploy deploy-front
	kubectl apply -f deploy-front.yaml

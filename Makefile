# creaet namespace and switch to it
namespace:
	kubectl create namespace user-tracker
	kubens user-tracker
# check k8s created secret `kubectl get secret`
mongo-secret: # 1 step (before dependent deploys)
	kubectl apply -f secret-mongodb.yaml

# ---
apply-configmaps:
	kubectl apply -f configmap-back.yaml
	kubectl apply -f configmap-front.yaml
	kubectl apply -f configmap-mongodb.yaml
apply-secrets:
	kubectl apply -f secret-mongodb.yaml
apply-deploys:
	kubectl apply -f deploy-mongodb.yaml
	kubectl apply -f deploy-back.yaml
	kubectl apply -f deploy-front.yaml
apply-nfs:
	kubectl apply -f nfs-pv.yaml
	kubectl apply -f nfs-pvc.yaml
apply-all:
	make apply-configmaps
	make apply-secrets
	make apply-nfs
	make apply-deploys

apply-ingress:
	kubectl apply -f ingress.yaml

# ---
restart-back:
	kubectl apply -f configmap-back.yaml
	kubectl delete deploy deploy-back
	kubectl apply -f deploy-back.yaml
restart-front:
	kubectl apply -f configmap-front.yaml
	kubectl delete deploy deploy-front
	kubectl apply -f deploy-front.yaml
restart-mongodb:
	kubectl apply -f secret-mongodb.yaml
	kubectl apply -f configmap-mongodb.yaml
	kubectl delete deploy deploy-mongodb
	kubectl apply -f deploy-mongodb.yaml
restart-nfs:
	kubectl delete pvc nfs-pvc
	kubectl delete pv nfs-pv
	make apply-nfs
restart-all:
	# make namespace
	# make restart-nfs
	make restart-mongodb
	make restart-back
	make restart-front
restart-ingress:
	kubectl delete ingress ingress-user-tracker
	kubectl apply -f ingress.yaml

# ---
expose-front: # only for minikube envs !!!
	minikube service service-front

# ---
docker-images:
	cd frontend && sudo make docker-all
	cd backend && sudo make docker-all

# --
remove-sudo: # disable sudo for k3s commands
	sudo chown -R $USER:$USER /etc/rancher/k3s

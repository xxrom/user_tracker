# 0
docker-login: # admin 1-!
	sudo docker login 192.168.77.150:8044 

docker-run:
	docker run --name utb --env-file ./.env.docker --rm -p 6075:6075 --network=custom-network users-tracker-backend


# 1
docker:
	docker build -t ut-back:latest . 
# 2
docker-tag:
	docker tag ut-back 192.168.77.150:8044/library/ut-back:latest
# 3
docker-push:
	docker push 192.168.77.150:8044/library/ut-back:latest

# build - tag - push
docker-all:
	make docker && make docker-tag && make docker-push


# --------------
docker-run-mongodb-prod:
	docker compose up -d

docker-run-mongodb-dev:
	docker compose up -f docker-compose-dev.yml -d

# --------------
docker-init-network:
	docker network create --driver bridge custom-network



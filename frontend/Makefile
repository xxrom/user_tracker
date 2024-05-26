# MAIN COMMAND: "sudo make docker-all"
# login => build => tag => push
docker-all:
	make docker-login && make docker && make docker-tag && make docker-push

# Harbor
docker-login: # admin 1-!
	sudo docker login 192.168.77.150:8044

# local
docker-run:
	docker run --name utf --env-file ./.env.docker --rm -p 6070:6070 --network=ut-network ut-front

# 1
docker:
	docker build -t ut-front:latest .
# 2
docker-tag:
	docker tag ut-front 192.168.77.150:8044/library/ut-front:latest
# 3
docker-push:
	docker push 192.168.77.150:8044/library/ut-front:latest

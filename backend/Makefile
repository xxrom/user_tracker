docker:
	docker build -t users-tracker-backend:latest . 

docker-run:
	docker run --name utb --env-file ./.env.docker --rm -p 6075:6075 --network=custom-network users-tracker-backend

docker-run-mongodb-prod:
	docker compose up -d

docker-run-mongodb-dev:
	docker compose up -f docker-compose-dev.yml -d

docker-init-network:
	docker network create --driver bridge custom-network

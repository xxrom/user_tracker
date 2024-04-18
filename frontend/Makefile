docker:
	docker build -t users-tracker-frontend:latest . 

docker-run:
	docker run --name utf --env-file ./.env.docker --rm -p 6070:6070 --network=custom-network users-tracker-frontend
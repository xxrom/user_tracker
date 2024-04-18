docker:
	docker build -t users-tracker-backend:latest . 

docker-run:
	docker run --name utb --env-file ./.env.docker --rm --network=custom-network users-tracker-backend

docker-run-mongodb:
	docker compose up -d

docker-init-network:
	docker network create --driver bridge custom-network

# # to use it inside dockerfile
#     networks:
#       - custom-network
# # to init this network
# networks:
#   custom-network:
#     driver: bridge
# # how to inspect network
# docker network inspect custom-network
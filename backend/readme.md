## build image

`docker build -t users-tracker-backend:latest .`

## run new image

`docker run --name utb --env-file ./.env.docker --rm --network=backend_mongodb-network users-tracker-backend`

## inspect docker network

`docker network inspect custom-network`

- check "containers" object for connected containers and there names

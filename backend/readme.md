## build image

`docker build -t users-tracker-backend:latest .`

## run new image

`docker run --name utb --env-file ./.env.docker --rm --network=backend_mongodb-network users-tracker-backend`

## inspect docker network

`docker network inspect custom-network`

- check "containers" object for connected containers and there names

## to use it inside dockerfile

````
# add it to any services
...
    networks:
      - custom-network

...

# init network
networks:
  custom-network:
    driver: bridge
    external: true

```

## how to inspect network

`docker network inspect custom-network`

Check `containers` object for connected containers to network
````

## k3s deploy

check all deployments
`kubectl get deployments --all-namespaces`

`kubectl get all` - get all info about everything

`kubectl describe pod <fullPodName from 'k get pod'>` - get all info and logs from pod

## Create/validate secrets

`kubectl apply -f mongodb-secret.yaml` - create secret
`kubectl get secret` - validate created secrets

## How to use secrets in deploys

How to use secrets:

```
        env:
          - name: MONGO_INITDB_ROOT_USERNAME
            valueFrom:
              secretKeyRef:
                name: mongodb-secret
                key: mongodb-username
```

## How to validate service endpoints (IPs)

`kubectl describe service ut-mongodb-service` - get info about service
check `IP` and compare with `IP` from pod, they should be the same
`kubectl get pods -o wide`

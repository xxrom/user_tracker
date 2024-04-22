## k3s deploy

check all deployments
`kubectl get deployments --all-namespaces`

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

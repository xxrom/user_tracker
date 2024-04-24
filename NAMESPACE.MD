# Namespace in k8s/k3s

- `namespace` is a good way to split application inside k8s/k3s cluster
- Each namespace will be isolated from another, you have to have configMaps/secrets in each of them even if they are the same.
- But, services could be shared between namespaces, so for example if we would like to use url it will be mysql-service.database (where database will be namespace where this service is working). In that way we can use shared resources.
- You can't use namespaces for volumes and nodes. We can't isolate them and they are always global in the cluster.

- By default we are working in "default NS".
  we can validate it wil command:
  `kubectl get configmap -n default` - for checking all configmaps in default NS.
  OR
  `kubectl get configmap -o yaml` - and check `namespace` field

### Hot to add namespaces:

`kubectl apply -f configmap.yaml --namespace=my-namespace` - with command
OR

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-configmap
  namespace: my-namespace
data:
  db_url: mysql-service.database-namespace
```

It's better to use metadata with particular namespace information.

---

### Kubens

If we need to activate new _default_ namespace for example for new team or for using in commands without padding `-n my-namespace` for each `kubectl apply -f ...` we can use `kubens`.

`brew install kubectx` - on macos

usage:
`kubens` - will show all current namespaces.
`kubens my-namespace` - will change namespace to new one.

### Where to use namespaces:

- So for example if you have a lot of teams, then you can split your cluster by using namespaces with the names of the teams.
- we can split databases/ monitoring/ logging / development / Nginx-ingress to according namespace.
- For Green/Blue production , where blue - current production and green will be next/updated production.

### How to create new namespace

`kubectl create namespace my-name-space-test` - create new one
`kubectl get namespace` - get all namespace

OR !

Creating namespace config file (it's better and easier)

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-configmap
  namespace: my-namespace
data:
  test: test
```

Command to check resources without namespaces:
`kubectl api-resources --namespaced=false`
Command to check resources with namespaces:
`kubectl api-resources --namespaced=true`

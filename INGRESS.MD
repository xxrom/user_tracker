# Ingress

DigitalOcean port 6070 and local pc will have 80 port. (tunnel should be created 6070 => 80).

Routes requests to different services in the cluster

Example of the `Ingress config`:

```
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: myapp-ingress
spec:
  rules:
  - host: myapp.com # should be existed host ! we are not using any ports for that
    http: # this is not http or https. it's just how it should be
      paths:
      - backend:
        serviceName: myapp-service # service name inside cluster
        servicePort: 8080 # service port inside cluster
```

Only one config is not enough, we need `Ingress Controller` it will be another pod that will evaluate and route all requests in the cluster

We need to chose one of the many implementations of ingress controller:

- k8s nginx ingress controller (url: https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/)
- traefik
- clouds will have particular `Cloud Load Balancer` that will route to particular ingress controller pod.
- others...

In minikube:
`minikube addons enable ingress` - start ingress controller and configures
`kubectl get pods -n ingress-nginx` - check ingress pods/controllers

---

Get minikube local IP:
`minikube ip`
get Ip and put it in hosts
`sudo vim /etc/hosts` and add

```
192.168.49.2 ut-front.com
```

Get created ingress
`kubectl get ingress -n my-namespace`

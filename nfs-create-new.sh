#!/bin/bash

# Variables
NFS_DIRECTORY="/srv/nfs/kubedata"
NFS_EXPORTS_FILE="/etc/exports"
IP_RANGE="*"  # Change this to your specific IP range if needed
STORAGE_SIZE="4Gi"

echo "Installing NFS Server..."
sudo apt update
sudo apt install -y nfs-kernel-server

echo "Creating NFS export directory..."
sudo mkdir -p ${NFS_DIRECTORY}
sudo chown nobody:nogroup ${NFS_DIRECTORY}

echo "Configuring NFS Exports..."
echo "${NFS_DIRECTORY} ${IP_RANGE}(rw,sync,no_subtree_check,no_root_squash)" | sudo tee -a ${NFS_EXPORTS_FILE}

echo "Exporting NFS directories and restarting NFS server..."
sudo exportfs -ra
sudo systemctl restart nfs-kernel-server
sudo systemctl enable nfs-kernel-server

echo "Creating Kubernetes Persistent Volume and Claim..."

echo "kubectl apply -f -
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv
spec:
  capacity:
    storage: ${STORAGE_SIZE}
  volumeMode: Filesystem
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  storageClassName: nfs
  nfs:
    path: ${NFS_DIRECTORY}
    server: $(hostname -I | awk '{print $1}')  # Assumes the first IP is the desired one

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-pvc
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  resources:
    requests:
      storage: ${STORAGE_SIZE}
"

echo "Checking the Persistent Volume and Persistent Volume Claim..."

kubectl get pv
kubectl get pvc

#!/bin/sh

# stopping and deleting all containers:
docker container stop frontend
docker container rm frontend

docker container stop dataservice
docker container rm dataservice

docker container stop userservice
docker container rm userservice

# removing all images:
docker image rm nyal/to_frontend
docker image rm nyal/to_dataservice
docker image rm nyal/to_userservice

# going to each subfolder and building + running every service in docker
cd userservice ||return
docker build . -t nyal/to_userservice
docker run --rm -d  -p 3001:3001/tcp --name userservice nyal/to_userservice:latest

cd ..
cd dataservice ||return
docker build . -t nyal/to_dataservice
docker run --rm -d  -p 3000:3000/tcp --name dataservice nyal/to_dataservice:latest

cd ..
cd frontend ||return
docker build . -t nyal/to_frontend
docker run --rm -d  -p 8080:80/tcp --name frontend nyal/to_frontend:latest

firefox http://127.0.0.1:8080
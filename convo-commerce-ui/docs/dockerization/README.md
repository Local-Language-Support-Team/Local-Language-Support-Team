
# Dockerization

- [Dockerization](#dockerization)
  - [Overview](#overview)
    - [Basic topics covered in the dockerization](#basic-topics-covered-in-the-dockerization)
    - [Files related to dockerization](#files-related-to-dockerization)
    - [Command to run the docker-compose file](#command-to-run-the-docker-compose-file)

## Overview

We use the docker to containarize the recat-app and its dependent services.Docker enables developers to easily pack, ship, and run any application as a lightweight, portable, self-sufficient container, which can run virtually anywhere

### Basic topics covered in the dockerization

- dockerfile
- docker-compose
- multi-stage docker builds
- ngnix-deploy
- containerize the react-app and mock-server

### Files related to dockerization

```txt
<rootDir>/
├── docker-compose.yaml
└── packages/
    ├── client/
    |   ├── .dockerignore
    |   ├── Dockerfile
    └── mock-server/
        ├── .dockerignore
        └── Dockerfile
```

### Command to run the docker-compose file

```bash
docker-compose -f ./docker-compose.yaml build
docker-compose -f ./docker-compose.yaml up
```

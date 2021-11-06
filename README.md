# nosnol

image or gif

## Overview
A service for sharing audio files.

## Requirement
- Nuxt.js v2.15.6
- node v14.17.0
- npm 6.14.13
- docker 19.03.13

## Usage
```bash
# Starting the Docker daemon
$ systemctl start docker

# Activate automatically
$ systemctl enable docker

# Generate a docker image
$ docker-compose build

# Start the docker container
$ docker-compose up
​
# If you get the message "nuxt: command not found."
$ npm install --save nuxt

# Enter the qpp container
$ docker-compose exec app sh
​
# install dependencies
$ npm install
​
# Environment settings
$ vi .env

$ cp .env_local .env

# Access the following URL
http://localhost:4000/
```

# nosnol

![image](https://user-images.githubusercontent.com/49152949/141650271-3e7cc3a2-3443-4f7c-9129-fbd907e97531.png)

## Overview
A service for sharing audio files.

## Requirement
- Nuxt.js v2.15.6
- node v14.17.0
- npm 6.14.13
- docker 19.03.13
- typescript 3.9.9

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
## UI Wireframe
### adobexd
<img width="1139" alt="スクリーンショット 2021-11-23 21 45 17" src="https://user-images.githubusercontent.com/49152949/143026238-b3207987-54ef-4018-8df1-72a6a61c7bdf.png">
https://xd.adobe.com/view/8558decb-1b1a-4a45-8f98-4cc82483ab27-d00b/grid

### figma
<img width="1125" alt="スクリーンショット 2021-11-23 21 35 27" src="https://user-images.githubusercontent.com/49152949/143024886-aca9cdfb-bd4e-4aee-8757-e5db7f5ba60b.png">
https://www.figma.com/file/DOeKHbpoZ7eco5HBVYhmHX/Nosnol?node-id=0%3A1



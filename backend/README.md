# README

- **ABOUT**: The API service server for the dashboard project.

- **How to start the applicaiton**

  - buid the image
```sh
docker build -t dashboard/backend .
```
  - start the container

  ```sh
    docker run -p 8080:3000 dashboard/backend 
  ```
  - Start container in detach mode
  ```sh
  docker run -p 8080:3000  -d dashboard/backend 
  ```

After runing the above two commands, our API services serves us at the **8080** port.


- Reference: 
  - https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
  - https://docs.docker.com/get-started/overview/
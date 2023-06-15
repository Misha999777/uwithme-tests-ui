# University With Me Test System

[![License](https://img.shields.io/:license-GPL-blue.svg)](https://github.com/Misha999777/uwithme-tests-ui/blob/master/LICENSE)

## Description

System for testing students. Uses [React](https://react.dev/)

## Requirements

For building the application you will need:

- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/)

## Running the application locally

You can run this application by

1. Downloading [Docker files](https://github.com/HappyMary16/uwithme-docker-files)

2. Starting them with
    ```shell
    docker compose up -d
    ```

3. Downloading [University With Me Tests Service](https://github.com/Misha999777/uwithme-tests-service)

4. Starting it with
    ```shell
    mvn spring-boot:run
    ```

5. Installing University With Me Tests UI dependencies with
    ```shell
    npm install
    ```

6. Starting University With Me Tests UI with
    ```shell
    npm start
    ```

## Copyright

Released under the GNU General Public License v2.0.
See the [LICENSE](https://github.com/Misha999777/uwithme-tests-ui/blob/master/LICENSE) file.
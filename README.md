# University With Me Test System

As a component of the broader `University With Me` project, this application provides universities and other educational entities with a platform to set up tests and assess students.

## Requirements

To develop the application, you will need:

- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/)

## Running the application locally

To run this application, follow these steps:

1. Download the [Docker files](https://github.com/HappyMary16/uwithme-docker-files).
2. Start them using:

```shell
docker compose up -d
```

3. Download the [University With Me Tests Service](https://github.com/Misha999777/uwithme-tests-service).
4. Start it using:

```shell
mvn spring-boot:run
```

5. Install the UI dependencies using:

```shell
npm install
```

6. Start the UI using:

```shell
npm start
```

## Copyright

Released under the GNU General Public License v2.0.
See the [LICENSE](https://github.com/Misha999777/uwithme-tests-ui/blob/master/LICENSE) file.
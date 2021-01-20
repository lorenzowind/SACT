[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
![size-shield]
![commit-shield]

<br />
<p align="center">
  <a href="https://github.com/lorenzowind/UBEMath">
    <img src="logo.png" alt="Logo" width="360" height="180">
  </a>

  <h3 align="center">SACT Project</h3>

  <p align="center">
    Web system for evaluating technical completion projects!
    <br />
    <a href="https://app.swaggerhub.com/apis/lorenzowind/SACT/1.0.0"><strong>Explore the API Spec »</strong></a>
    <br />
    <br />
    <a href="https://SACT.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/lorenzowind/SACT/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/lorenzowind/SACT/issues/new">Request Feature</a>
  </p>
</p>

## Table of Contents
* [About the Project](#about-the-project)
* [Team](#team)
* [How to install?](#how-to-install)
* [Built With](#built-with)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## About The Project
This project deals with a intern software solution for the [Fundação Matias Machline](https://www.fundacaomatiasmachline.org.br/), who intends to efficiently assist in the planning and organization of the evaluations of the course completion projects during the technical fair at the FMM. 

The system should store information about the evaluators, also providing evaluation sheets for them based on their respective schedule, avoiding possible conflicts of visits and evaluations. The system must also be able to inform the projects that have been evaluated or not in real time.

## Team
- Apolo Freitas (Front-end developer)
- Débora Colhyer (Designer)
- Euclides Lins (Back-end developer)
- Ian Marcony (Front-end developer)
- Leonardo Viana (Back-end developer)
- Lorenzo Windmoller Martins (Full-stack developer)

## How to install?
1. To run the backend, follow these steps:
- Navigate to the backend folder and install the dependencies:
```bash
// Navigate to the backend folder
$ cd backend

// Install application dependencies
$ yarn
```
- Install MySQL, Redis and Adminer Docker images using docker-compose:
```bash
// Run the Docker images
$ docker-compose up -d
```
- Create a file called .env based on .env.example and enter your AWS credentials;
- Create a file called .ormconfig.json based on .ormconfig.example.json and insert the MySQL host and port according to the previously installed Docker images, in addition to exchanging the src recipient for dist and .ts for .js;
- Configure the credentials of the MySQL Docker image using the following commands:
```bash
// Enter the MySQL image bash
$ docker exec -it IMAGE_NAME bash
// Enter the MySQL image root
$ mysql -u root -p
// Change the password
$ ALTER USER root IDENTIFIED WITH mysql_native_password BY ‘ROOT_USER_PASSWORD’;
```
- Run the database migrations using the command:
```bash
// Run the migrations
$ node_modules/.bin/typeorm migration:run
```
- Add a no-restart configuration for each Docker image using the command:
```bash
// Change the configuration of the Docker images
$ docker update --restart=unless-stopped ID_DA_IMAGEM
```
- Start the server using the command:
```bash
// Start the server
$ yarn dev:server
```
2. To run the frontend, follow these steps:
- Navigate to the frontend folder and install the dependencies:
```bash
// Navigate to the frontend folder
$ cd frontend

// Install application dependencies
$ yarn
```
- Start the application using the command:
```bash
// Start the application
$ yarn start
```

## Built With
* Framework for platform frontend: [React.js](https://reactjs.org/)
* Backend Framework: [Node.js](https://nodejs.org)
* Database technology: [MySQL](https://www.mysql.com/) and [Redis](https://redis.io/)
* Backend data processing technology: [TypeORM](https://typeorm.io)
* Technology for testing implementation: [Jest](https://jestjs.io/)
* API documentation tool: [SwaggerHUB](https://swagger.io/tools/swaggerhub/)
* Prototyping tool: [Figma](https://www.figma.com/)

## Contact
Apolo Freitas - [LinkedIn](linkedin.com/in/apolofreitas) - apolobrener11@gmail.com

Débora Colhyer - [LinkedIn](linkedin.com/in/débora-colhyer-395061195) - dcolhyer@gmail.com

Euclides Lins - [LinkedIn](linkedin.com/in/euclides-lins) - euclidesvasconcelos01@gmail.com

Ian Marcony - [LinkedIn](https://www.linkedin.com/in/ian-marcony-94996319b/) - imarconyls@gmail.com

Leonardo Viana - [LinkedIn](https://www.linkedin.com/in/leo-viana/) - vianaleonardo.es@gmail.com

Lorenzo Windmoller Martins - [LinkedIn](https://www.linkedin.com/in/lorenzo-windmoller-martins/) - lorenzomart01@gmail.com

## Acknowledgements
* [README Template by othneildrew](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)

[contributors-shield]: https://img.shields.io/github/contributors/lorenzowind/SACT?style=flat-square
[contributors-url]: https://github.com/lorenzowind/SACT/graphs/contributors

[issues-shield]: https://img.shields.io/github/issues/lorenzowind/SACT?style=flat-square
[issues-url]: https://github.com/lorenzowind/SACT/issues

[size-shield]: https://img.shields.io/github/repo-size/lorenzowind/SACT?style=flat-square

[commit-shield]: https://img.shields.io/github/last-commit/lorenzowind/SACT?style=flat-square
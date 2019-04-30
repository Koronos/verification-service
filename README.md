# Phone checker service

This project was a seeded with [Microsoft Typescript Template](https://github.com/Microsoft/TypeScript-Node-Starter.git), updated and cleaned.

Why Typescript?, because helps a lot to simplify the creation of code OOP in javascript. In this code I use both. Complex logic is created purely in classes like the [MessageSender](src/services/messageSenderService.ts). Common flow as routing and controllers was created in functional programming.

- [Run the project](#run-the-project)
  - [Pre-reqs](#pre-reqs)
  - [Getting started](#getting-started)
- [Project Structure](#project-structure)

[Algorithms](resources/docs/algorithms.md)\
[Api description](resources/docs/api.md)\
[Testing](resources/docs/testing.md)

## Run the project

The project uses Sqlite and [Sequelize](http://docs.sequelizejs.com/) as database to make it portable, and thanks to Sequelize we can change the database for other more... "persistent".

### Pre-reqs
To build and run this app locally you will need:
- Install [Node.js](https://nodejs.org/en/)

### Getting started
- Clone the repository
```
git clone https://github.com/Koronos/verification-service
```
- Install dependencies
```
npm install
```
- Build and run the project
```
npm run build
npm start
```

- For easy test I have included a [Postman](https://www.getpostman.com/) collection, that have the 4 posible requests and have the x-auth header configured.

## Project Structure

The full folder structure of this app is explained below:

> **Note** Make sure you have already built the app using `npm run build`
> **Note 2** In general is a copy paste from seed

| Name                | Description                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| **dist**            | Contains the distributable (or output) from your TypeScript build. This is the code you ship            |
| **node_modules**    | Contains all your npm dependencies                                                                      |
| **src**             | Contains your source code that will be compiled to the dist dir                                         |
| **src/config**      | Contains the services that requires a several configurations, here are loaded the environment variables |
| **src/controllers** | Controllers define functions that respond to various http requests                                      |
| **src/models**      | Models defined that aren't store in database                                                            |
| **src/public**      | Static assets that will be used client side                                                             |
| **src**/server.ts   | Entry point to your express app                                                                         |
| **test**            | Contains your tests. Separate from source because there is a different build process.                   |
| **views**           | Views define how your app renders on the client. In this case we're using pug                           |
| .env.example        | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos.           |
| .travis.yml         | Used to configure Travis CI build                                                                       |
| jest.config.js      | Used to configure Jest                                                                                  |
| package.json        | File that contains npm dependencies as well as build scripts                                            |
| tsconfig.json       | Config settings for compiling server code written in TypeScript                                         |
| tslint.json         | Config settings for TSLint code style checking                                                          |
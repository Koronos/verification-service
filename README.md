# Phone checker service

This project was a seeded with [Microsoft Typescript Template](https://github.com/Microsoft/TypeScript-Node-Starter.git), updated and cleaned.

# Run the project

The project uses Sqlite and [Sequelize](http://docs.sequelizejs.com/) as database to make it portable, and thanks to Sequelize we can change the database for other more... "persistent".

# Pre-reqs
To build and run this app locally you will need:
- Install [Node.js](https://nodejs.org/en/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/Koronos/verification-service
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
# Testing

Tests are based in [SuperTest](https://github.com/visionmedia/supertest) and [Jest](https://jestjs.io/en/)

```
npm run test
```

# Api description

The service was created in base an HTTP Api Rest, but in this case I had to format the service as verbs because isn't fit as CRUD resource.


| Endpoint                    | Description                                      | Params                                          |
| --------------------------- | ------------------------------------------------ | ----------------------------------------------- |
| **POST** /verification-code | Creates a verification code for the current user | **phoneNumber** *Required*: A real phone number |
**201**: verification code created
**400**: phoneNumber invalid


> **POST** /verification-code

Creates a verification code for the current user

```js
// Params
{
    "phoneNumber": ""
}
```

**200**: verificationCode created correctly and sended
**400**: verificationCode is invalid
**404**: The user actually doesn't have a verificationCode

> **POST** /verification-code/send

Resend the verification code for the current user

```js
// Params
Not required
```

**200**: verificationCode created correctly and sended
**400**: verificationCode is invalid
**404**: The user actually doesn't have a verificationCode

## Project Structure
Copy - from seed... forgive me

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

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


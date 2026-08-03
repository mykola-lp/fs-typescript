# Patientor backend

### Getting started
  - To get the app running just install its dependencies with ```npm install``` and run it with ```npm run dev```.
  - The app should work without a frontend, but make sure that the request made to ```/api/ping``` made on startup is successful before continuing.

## Exercises

### Exercise 9: Patientor backend, step1

For this set of exercises, you will develop a backend for an existing project called Patientor, a simple medical record application for doctors who handle diagnoses and basic health information for their patients.

Outsider experts have already built the frontend, and your task is to create a backend to support the existing code. Make sure that the frontend code is in the directory patientor/frontend of your submission repository.

Initialize a backend project in the directory patientor/backend that will work with the frontend. Configure ESLint and tsconfig using the same settings as provided in the material. Define an endpoint that handles HTTP GET requests at the route /api/ping.

The project should be runnable with npm scripts, both in development mode with npm run dev and, in production mode with npm start.

### Exercise 10: Patientor backend, step2

Make sure you have copied the frontend code to the directory patientor/frontend of your submission repository.

Start the project with the help of the README file.

You should be able to use the frontend without a functioning backend.

Ensure that the backend answers the ping request that the frontend has made on startup. Check the developer tools to make sure it works.

You might also want to have a look at the console tab. If something fails, [part 3](https://fullstackopen.com/en/part3) of the course shows how the problem can be solved.

### Exercise 11: Patientor backend, step3

Similar to Ilari's flight service, we do not use a real database in our app, but instead use hardcoded data that is in the files [diagnoses.ts](https://github.com/fullstack-hy2020/misc/blob/master/diagnoses.ts) and [patients.ts](https://github.com/fullstack-hy2020/misc/blob/master/patients.ts). Get the files and store those in a directory called data in your project. All data modification can be done in runtime memory, so during this part, it is not necessary to write to a file.

Create a type Diagnosis and use it to create endpoint /api/diagnoses for fetching all diagnoses with HTTP GET.

Structure your code properly by using meaningfully-named directories and files.

**Note:** that diagnoses may or may not contain the field latin. You might want to use [optional properties](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#optional-properties) in the type definition.

**Hint:** Enabling the ESLint rule [consistent-type-imports](https://typescript-eslint.io/rules/consistent-type-imports/) could save you from many headaches.

### Exercise 12: Patientor backend, step4

Create data type Patient and set up the GET endpoint /api/patients which returns all the patients to the frontend, excluding field ssn. Use a [utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html) to make sure you are selecting and returning only the wanted fields.

In this exercise, you may assume that field gender has type string.

Try the endpoint with your browser and ensure that ssn is not included in the response.

After creating the endpoint, ensure that the frontend shows the list of patients.

### Exercise 13: Patientor backend, step5

Create a POST endpoint /api/patients for adding patients. Ensure that you can add patients also from the frontend. You can create unique ids of type string using the [uuid](https://github.com/uuidjs/uuid) library:

```ts
import { v1 as uuid } from 'uuid'
const id = uuid()
```

### Exercise 14: Patientor backend, step6

Set up safe parsing, validation and type predicate to the POST /api/patients request.

Refactor the gender field to use a const object based type.

### Exercise 15: Patientor backend, step7

Use Zod to validate the requests to the POST endpoint /api/patients.

### Exercise 16: Checkup

Similarly to Exercise 8, run the tests in the directory patientor-api-tests. Tests assume that the backend runs on port 3001.

Enable those also in GitHub by modifying .github/workflows/patientor-api-tests.yml as follows:

```yaml
name: Patientor API Tests
on:
  push:
    branches: [ main, master ]
```
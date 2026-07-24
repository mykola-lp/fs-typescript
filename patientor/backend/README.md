# Patientor backend

### Getting started

<b>Clone project:</b>

```bash
git clone <repository-url>
cd <project-folder>
```

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
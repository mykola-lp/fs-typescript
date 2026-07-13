This is a [TypeScript](https://www.typescriptlang.org/) project.

## Getting Started

<b>Clone project:</b>

```bash
git clone <repository-url>
cd <project-folder>
```

## Exercises

### Exercise 1: Body mass index

For the exercises of this part, you should create a new repository, inside of which you copy the contents of this repository: https://github.com/fullstack-hy2020/fs-typescript

All of the repository content (except the directory `.git`) must be copied to the root directory of your repository.

So the content of your submission repository root should be exactly the below until you can start:

```text
.git
.github
.gitignore
flightdiaries
healthapp
healthapp-tests
patientor
patientor-api-tests
patientor-tests
```

#### Setup

Start by setting up the Node.js project that will be used in this and the next 6 exercises:

1. Initialize a new Node.js project inside the directory named `healthapp` by running `npm init`.
2. Install the development dependency `typescript`.
3. In the `healthapp` directory, create a `tsconfig.json` file with the following contents:

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "noEmit": true
  }
}
```

The compiler option `noImplicitAny` makes it mandatory to have types for all variables used. This option is currently a default, but it lets us define it explicitly.

Remember also set `"type": "module"` in the file `package.json`:

```json
{
  "type": "module"
  // ...
}
```

#### The BMI calculator

Create the code of this exercise in the file `bmiCalculator.ts`.

Write a function `calculateBmi` that calculates a [BMI](https://en.wikipedia.org/wiki/Body_mass_index) based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

Call the function in the same file with hard-coded parameters and print out the result. The code

```ts
console.log(calculateBmi(180, 74));
```

should print the following message:

```text
Normal range
```

The message content is defined based on the BMI Wikipedia page.

Create a script for typechecking and running the program with the command:

```bash
npm run calculateBmi
```

### Exercise 2: Exercise calculator

Create the code of this exercise in file `exerciseCalculator.ts` in the same project with the previous exercise.

Write a function `calculateExercises` that calculates the average time of daily exercise hours, compares it to the target amount of daily hours and returns an object that includes the following values:

- the number of days
- the number of training days
- the original target value
- the calculated average time
- boolean value describing if the target was reached
- a rating between the numbers **1–3** that tells how well the hours are met. You can decide on the metric on your own.
- a text value explaining the rating, you can come up with the explanations

The daily exercise hours are given to the function as an array that contains the number of exercise hours for each day in the training period.

For example, a week with **3** hours of training on Monday, none on Tuesday, **2** hours on Wednesday, **4.5** hours on Thursday, and so on would be represented by the following array:

```ts
[3, 0, 2, 4.5, 0, 3, 1]
```

For the result object, you should create an `interface`.

If you call the function with parameters:

```ts
calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
```

it should return:

```text
{
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286
}
```

Create an npm script, `npm run calculateExercises`, to call the function with hard-coded values.

### Exercise 3: Command line

Change the previous exercises so that you can give the parameters of `bmiCalculator` and `exerciseCalculator` as command-line arguments.

Your program could work eg. as follows:

```bash
$ npm run calculateBmi 180 91
```

```text
Overweight
```

and:

```bash
$ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
```

```text
{
  periodLength: 9,
  trainingDays: 6,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.7222222222222223
}
```

In the example, the first argument is the target value.

Handle exceptions and errors appropriately. The `exerciseCalculator` should accept inputs of varied lengths. Determine by yourself how you manage to collect all needed input.

A thing to notice: if you define helper functions in other modules, you should use the JavaScript module system, that is, the one we have used with React, where importing is done with:

```ts
import { isNotNumber } from "./utils.ts";
```

and exporting:

```ts
export const isNotNumber = (argument: any): boolean =>
  isNaN(Number(argument));

export default "this is the default...";
```

### Exercise 4: Express

We will continue to build the app from the previous exercises.

Add now **Express** to the app dependencies and create an HTTP `GET` endpoint `/hello` that answers:

```text
Hello Full Stack!
```

The web app should be started with the following commands:

- Production mode:

```bash
npm start
```

- Development mode:

```bash
npm run dev
```

Replace your existing `tsconfig.json` file with the following content:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "module": "nodenext",
    "esModuleInterop": true,
    "allowImportingTsExtensions": true
  }
}
```

Make sure there aren't any errors!

### Exercise 5: Web BMI

Add an endpoint for the BMI calculator that can be used by doing an HTTP `GET` request to the endpoint `/bmi` and specifying the input with [query string](https://en.wikipedia.org/wiki/Query_string) parameters.

For example, to get the BMI of a person with a height of `180` and a weight of `72`, the URL is:

```text
http://localhost:3003/bmi?height=180&weight=72
```

The response is a JSON of the form:

```json
{
  "weight": 72,
  "height": 180,
  "bmi": "Normal range"
}
```

See the [Express documentation](https://expressjs.com/en/5x/api/) for information on how to access the query parameters.

If the query parameters of the request are missing or of the wrong type, return a response with the proper status code and the following error message:

```json
{
  "error": "malformatted parameters"
}
```

Do **not** copy the calculator code to `index.ts`; instead, make it a [TypeScript module](https://www.typescriptlang.org/docs/handbook/modules/introduction.html) that can be imported into `index.ts`.

Consider adding the following condition to `bmiCalculator.ts`:

```ts
if (process.argv[1] === import.meta.filename) {
  // do not run this code if module is imported
}
```

It tests whether the module is the main module (i.e. it is run directly from the command line with `npm run calculateBmi`) or whether it is imported by another module (e.g. `index.ts`).

Parsing command-line arguments only makes sense when the module is run directly. Without this condition, you might see argument validation errors when starting the application via:

```bash
npm start
```

or

```bash
npm run dev
```

### Exercise 6: Eslint

Configure your project to use the above ESLint settings and fix all the warnings.

**Note**

At the time of writing this (28.3.2026), the most recent `typescript-eslint` version (`5.57.2`) is not compatible with **TypeScript 6**, which was released on **23.3.2026**.

Because of this, the `npm install` command fails. Until a new compatible version is released, run the installation using:

```bash
npm install --legacy-peer-deps
```
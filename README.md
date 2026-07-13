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
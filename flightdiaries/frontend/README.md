## Exercises

### Exercise 19: Flight diaries, step1

Let us now build a frontend for Ilari's flight diaries that was developed in [the previous chapter](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-typescript/chapter-4). The application goes to the directory `flightdiaries` in your submission repository. It already has the backend code.

Create a TypeScript React app with similar configurations to the apps of this chapter. The code should be in the directory `flightdiaries/frontend`.

Fetch the diaries from the backend and render those to the screen. Do all the required typing and ensure that there are no ESLint errors.

> Remember to keep the network tab open. It might give you a valuable hint...

You can decide how the diary entries are rendered. Note that the backend API does not return the diary comments. You may modify it to return also those on a GET request if you wish.

### Exercise 20: Flight diaries, step2

Make it possible to add new diary entries from the frontend. In this exercise you may skip all validations and assume that the user just enters the data in a correct form
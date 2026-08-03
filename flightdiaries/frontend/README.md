# Flightdiaries frontend

### Getting started
  - To get the app running just install its dependencies with ```npm install``` and run it with ```npm run dev```.
  - The app should work without a backend.

## Exercises

### Exercise 19: Flight diaries, step1

Let us now build a frontend for Ilari's flight diaries that was developed in [the previous chapter](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-typescript/chapter-4). The application goes to the directory `flightdiaries` in your submission repository. It already has the backend code.

Create a TypeScript React app with similar configurations to the apps of this chapter. The code should be in the directory `flightdiaries/frontend`.

Fetch the diaries from the backend and render those to the screen. Do all the required typing and ensure that there are no ESLint errors.

> Remember to keep the network tab open. It might give you a valuable hint...

You can decide how the diary entries are rendered. Note that the backend API does not return the diary comments. You may modify it to return also those on a GET request if you wish.

### Exercise 20: Flight diaries, step2

Make it possible to add new diary entries from the frontend. In this exercise you may skip all validations and assume that the user just enters the data in a correct form.

### Exercise 21: Flight diaries, step3

Notify the user if the the creation of a diary entry fails in the backend, show also the reason for the failure.

See eg. [this](https://dev.to/mdmostafizurrahaman/handle-axios-error-in-typescript-4mf9) to see how you can narrow the Axios error so that you can get hold of the error message.

### Exercise 22: Flight diaries, step4

Addition of a diary entry is now very error prone since user can type anything to the input fields. The situation must be improved.

Modify the input form so that the date is set with a HTML [date](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date) input element, and the weather and visibility are set with HTML radio [buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/radio). We have already used radio buttons in part 6, that material may or may not be useful...

Your app should always stay well-typed, with no ESLint errors and no ESLint rules ignored.
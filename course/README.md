# Course

## Exercises

### Exercise 17: Course, step1

Create a new Vite app with TypeScript in the `course` directory of your submission repository.

This exercise is similar to the one already done in [Part 1](https://fullstackopen.com/en/part1/java_script#exercises-1-3-1-5) of the course, but with TypeScript and some extra tweaks.

Start off by modifying the contents of `main.tsx` to the following:

```tsx
import ReactDOM from 'react-dom/client'
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
```

And `App.tsx`:

```tsx
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  );
};

export default App;
```

Remove the unnecessary boilerplate files that Vite generates by default.

The whole app is currently in one component — that's not what we want.

Refactor the code so it consists of three components:

- **`Header`** — renders the name of the course
- **`Content`** — renders the names of the different parts and the number of exercises in each part
- **`Total`** — renders the total sum of exercises in all parts

All data stays in the `App` component, which passes the necessary data down to each component as **props**.

> **Be sure to add type declarations for each component's props!**

The `App` component should look somewhat like this:

```tsx
const App = () => {
  // const-declarations

  return (
    <div>
      <Header name={courseName} />
      <Content ... />
      <Total ... />
    </div>
  )
};
```
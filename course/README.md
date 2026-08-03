# Course

### Getting started
  - To get the app running just install its dependencies with ```npm install``` and run it with ```npm run dev```.

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

### Exercise 18: Course, step2

Let us now continue extending the app created in the previous exercise.

**Add the type information**

First, add the type information and replace the variable `courseParts` with the one from the example below.

```ts
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
];
```

**Extract the shared `description` attribute**

Now we know that both interfaces `CoursePartBasic` and `CoursePartBackground` share not only the base attributes but also an attribute called `description`, which is a string in both interfaces.

Your task:

- Declare a new interface that includes the `description` attribute and extends the `CoursePartBase` interface.
- Modify the code so that you can remove the `description` attribute from both `CoursePartBasic` and `CoursePartBackground` without getting any errors.

**Create the `Part` component**

Create a component `Part` that renders all attributes of each type of course part.

- Use a switch case-based exhaustive type checking!
- Use the new component in the component `Content`.

**Add a fourth course part type**

Now, add another course part interface with the following attributes: `name`, `exerciseCount`, `description`, and `requirements`, the latter being a string array.

The objects of this type look like the following:

```ts
{
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
}
```

Then:

- Add that interface to the type union `CoursePart`.
- Add the corresponding data to the `courseParts` variable.

Now, if you have not modified your `Content` component correctly, you should get an error, because you have not yet added support for the fourth course part type.

**Handle the new type in `Content`**

And lastly, do the necessary changes to `Content` so that:

- All attributes for the new course part also get rendered.
- The compiler doesn't produce any errors.
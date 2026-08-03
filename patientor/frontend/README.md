# Patientor frontend

### Getting started
  - To get the app running just install its dependencies with ```npm install``` and run it with ```npm run dev```.
  - The app should work without a backend, but make sure that the request made to ```/api/ping``` made on startup is successful before continuing.

## Exercises

### Exercise 23: Patientor, step1 (be)

We will soon add a new type for our app, Entry, which represents a lightweight patient journal entry. It consists of a journal text, i.e. a description, a creation date, information regarding the specialist who created it and possible diagnosis codes. Diagnosis codes map to the ICD-10 codes returned from the `/api/diagnoses` endpoint. Our naive implementation will be that a patient has an array of entries.

Before going into this, we need some preparatory work.

Create an endpoint `/api/patients/:id` to the backend that returns all of the patient information for one patient, including the array of patient entries that is still empty for all the patients. For the time being, expand the backend types as follows:

```ts
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
```

### Exercise 24: Patientor, step2

Create a page for showing a patient's full information in the frontend.

The user should be able to access a patient's information by clicking the patient's name.

Fetch the data from the endpoint created in the previous exercise.

You may use [MaterialUI](https://material-ui.com/) for the new components but that is up to you since our main focus now is TypeScript.

You might want to have a look at [part 7](https://fullstackopen.com/en/part7/react_router) if you don't yet have a grasp on how the [React Router](https://reactrouter.com/en/main/start/tutorial) works.

> The example uses [Material UI Icons](https://mui.com/components/material-icons/) to represent genders.

### Exercise 25: Patientor, step3 (be)

Define the types `OccupationalHealthcareEntry` and `HospitalEntry` so that they conform to the new example data.

Ensure that your backend returns the entries properly when you go to an individual patient's route.

> Use types properly in the backend!

### Exercise 26: Patientor, step4

Extend a patient's page in the frontend to list the date, description and diagnoseCodes of the patient's entries.

You can use the same type definition for an Entry in the frontend. For these exercises, it is enough to just copy/paste the definitions from the backend to the frontend.

### Exercise 27: Patientor, step5

Fetch and add diagnoses to the application state from the /api/diagnoses endpoint. Use the new diagnosis data to show the descriptions for patients' diagnosis codes.

### Exercise 28: Patientor, step6

Extend the entry listing on the patient's page to include the Entry's details, with a new component that shows the rest of the information of the patient's entries, distinguishing different types from each other.

You could use eg. [Icons](https://mui.com/components/material-icons/) or some other [Material UI](https://mui.com/) component to get appropriate visuals for your listing.

You should use a switch case-based rendering and exhaustive type checking so that no cases can be forgotten:

```tsx
const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};
```

### Exercise 29: Patientor, step7

We have established that patients can have different kinds of entries. We don't yet have any way of adding entries to patients in our app, so, at the moment, it is pretty useless as an electronic medical record.

Your next task is to add endpoint `/api/patients/:id/entries` to your backend, through which you can POST an entry for a patient.

Remember that we have different kinds of entries in our app, so our backend should support all those types and check that at least all required fields are given for each type.

In this exercise, you quite likely need to remember [this trick](https://fullstackopen.com/en/part9/grande_finale_patientor#omit-with-unions).

You may assume that only correct diagnostics code values are sent to the backend.

**Hint:** If you have defined the `HealthCheckRating` with a const object

```ts
export const HealthCheckRating = {
   Healthy: 0,
   LowRisk: 1,
   HighRisk: 2,
   CriticalRisk: 3,
 } as const;
```

You can not use a Zod enum for validation since it does not support number values. Instead, you can use the Zod [union](https://zod.dev/api?id=unions):

```ts
z.union([
  z.literal(HealthCheckRating.Healthy),
  z.literal(HealthCheckRating.LowRisk),
  z.literal(HealthCheckRating.HighRisk),
  z.literal(HealthCheckRating.CriticalRisk),
])
```

### Exercise 30: Patientor, step8

Now that our backend supports adding entries, we want to add the corresponding functionality to the frontend. In this exercise, you should add a form for adding an entry to a patient. An intuitive place for accessing the form would be on a patient's page.

In this exercise, it is enough to support one entry type. All the fields in the form can be just plain text inputs, so it is up to the user to enter valid values.

Upon a successful submission the new entry should be added to the correct patient and the patient's entries on the patient page should be updated to contain the new entry.

If a user enters invalid values to the form and backend rejects the addition, show a proper error message to the user.

### Exercise 31: Patientor, step9

Extend your solution so that it supports all the entry types.

### Exercise 32: Patientor, step10

Improve the entry creation forms so that it makes it hard to enter incorrect dates, diagnosis codes and health rating.

Your improved form might look something like the following.

1. Picking a date with [Input](https://mui.com/material-ui/api/input/) element type [date](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date).

2. Health rating is selected with Material UI [select](https://mui.com/material-ui/react-select/)

3. Diagnostic codes set with Material UI [multiple select](https://mui.com/material-ui/react-select/#multiple-select)

### Exercise 33: Patientor, the final check

As you might have guessed, it is time to test the Patientor app as a whole. Similar to Exercises [8](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-typescript/chapter-3#7d395c4f-af73-40ae-a915-01b600ff8f93) and [16](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-typescript/chapter-4#b6ae0349-ef8d-4191-b97a-ef5d751e8800), run the tests in the directory patientor-tests. Tests expect that the frontend is running at port 5173.

Enable test also in GitHub by modifying .github/workflows/patientor-e2e-tests.yml as follows:

```yaml
name: Patientor E2E Tests

on:
  push:
    branches: [ main, master ]
```
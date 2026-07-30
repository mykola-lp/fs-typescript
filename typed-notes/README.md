# Typed Notes

A small notes app built while working through the TypeScript part of the Full Stack Open -  [TS chapter 5](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-typescript/chapter-5) course — practicing typed React components, a typed API service layer (`noteService`), and `Omit`-based types (`NewNote`) for request payloads.

## Getting started

This project needs two servers running at the same time — the frontend and a local mock API.

**1. Install dependencies**

In terminal: `npm install`

**2. Set up the local API**

Copy the example data file, then start `json-server`: `npm run server`

This serves notes at `http://localhost:3001/notes`.

**3. Start the frontend**

In a separate terminal: `npm run dev`

The app runs at `http://localhost:5173/`.
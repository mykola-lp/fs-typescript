import express, { type Express, type Request, type Response } from 'express';

import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
import { isNotNumber } from './utils.ts';

const app: Express = express();

app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const { height, weight } = req.query;

  if (
    typeof height !== "string" ||
    typeof weight !== "string" ||
    isNotNumber(height) ||
    isNotNumber(weight)
  ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  return res.json({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight))
  });
});

app.post("/exercises", (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  if (
    !Array.isArray(daily_exercises) ||
    isNotNumber(String(target)) ||
    daily_exercises.some(
      (value: unknown) => isNotNumber(String(value))
    )
  ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  return res.json(
    calculateExercises(
      daily_exercises.map(Number),
      Number(target)
    )
  );
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
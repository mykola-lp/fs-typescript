import express, { type Express, type Request, type Response } from 'express';

import { calculateBmi } from "./bmiCalculator.ts";
import { isNotNumber } from './utils.ts';

const app: Express = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
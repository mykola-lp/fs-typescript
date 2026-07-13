import { isNotNumber, getErrorMessage } from "./utils.ts";

interface ExerciseResult {
  period: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const period = dailyHours.length;

  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);

  const average = totalHours / period;

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to exercise more";
  }

  return {
    period,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

interface ExerciseArguments {
  target: number;
  dailyHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  const values = args.slice(2);

  if (values.some(isNotNumber)) {
    throw new Error("Provided values were not numbers!");
  }

  const numbers = values.map(Number);

  const [target, ...dailyHours] = numbers;

  return {
    target,
    dailyHours,
  };
};

try {
  const { target, dailyHours } = parseExerciseArguments(process.argv);

  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  console.log(`Failed to calculate exercise. Error: ${getErrorMessage(error)}`);
}
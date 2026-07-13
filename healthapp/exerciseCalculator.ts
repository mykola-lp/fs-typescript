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

  const numbers = args.slice(2).map(Number);

  if (numbers.some(number => isNaN(number))) {
    throw new Error("Provided values were not numbers!");
  }

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
  let errorMessage = "Failed to calculate exercise.";

  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }

  console.log(errorMessage);
}
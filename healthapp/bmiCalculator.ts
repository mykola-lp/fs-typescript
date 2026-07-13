import { isNotNumber, getErrorMessage } from "./utils.ts";

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let res: string;

  if (bmi < 18.5) {
    res = "Underweight";
  } else if (bmi < 25) {
    res = "Normal range";
  } else if (bmi < 30) {
    res = "Overweight";
  } else {
    res = "Obese";
  }

  return res;
};

try {
  const { height, weight } = parseArguments(process.argv);

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  console.log(`Failed to calculate BMI. Error: ${getErrorMessage(error)}`);
}
interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const classifyBmi = (height: number, weight: number): void => {
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

  console.log(res);
};

try {
  const { height, weight } = parseArguments(process.argv);

  classifyBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = "Failed to calculate BMI.";

  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }

  console.log(errorMessage);
}
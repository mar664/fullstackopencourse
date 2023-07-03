import { isNotNumber } from "./utils";

interface ExerciseValues {
    hours: Array<number>;
    target: number;
}
  
const parseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (!args.slice(3).some(v => isNotNumber(v))) {
        return {
            hours: args.slice(3).map((a: string) : number => Number(a)),
            target: Number(args[2])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

type Rating = 1 | 2 | 3;

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  targetReached: boolean;
  rating: Rating;
  ratingExplanation: string;
}

/* Calculates the average time of daily exercise hours and compares it to the target amount of daily
    exercise hours and compares it to the target amount of daily hours and returns an object
*/
const calculateExercises = (hours: Array<number>, target: number): ExerciseResult => {
  if(target <= 0) throw new Error("target daily hours should be greater than zero");

  const periodLength = hours.length;

  if(periodLength === 0) throw new Error("period length must be greater than zero");

  const trainingDays = hours.filter(h => h > 0).length;
  const totalHours = hours.reduce((acc, h) => acc + h, 0);
  const average = totalHours / periodLength;
  const targetReached = average >= target;
  
  let rating: Rating = 1;
  let ratingExplanation = 'not too bad but could be better';
  if (targetReached) {
    rating = 2;
    ratingExplanation = 'average';
    
    if (average >= target * 1.5) {
        rating = 3;
        ratingExplanation = 'above average';
    }
  }
  
  return {
    periodLength,
    trainingDays,
    target,
    average,
    targetReached,
    rating,
    ratingExplanation,
  };
};

try {
    const { hours, target } = parseArguments(process.argv);

    console.log(calculateExercises(hours, target));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

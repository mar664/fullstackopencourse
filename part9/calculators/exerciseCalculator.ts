import { calculateExercises } from "./calculateExercises";
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

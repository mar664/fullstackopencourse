import { calculateBmi } from "./calculateBMI";
import { isNotNumber } from "./utils";

interface BMIValues {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!args.slice(2).some(v => isNotNumber(v))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}


try {
    const { height, weight } = parseArguments(process.argv);

    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
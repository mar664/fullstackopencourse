import express = require('express');
import { calculateBmi } from './calculateBMI';
import { isNotNumber } from './utils';
import { calculateExercises } from './calculateExercises';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { weight, height } = req.query;

    try {    
        if(isNotNumber(weight) || isNotNumber(height)) throw new Error("Height and weight must be numbers");
        const bmi : string = calculateBmi(Number(height), Number(weight));
        return res.send({height: Number(height), weight: Number(weight), bmi});
    } catch (error: unknown) {
        let errorMessage = '';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
        return res.status(401).send({ error: errorMessage });
    }
  });

  app.post('/exercises', (req, res) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    try {    
        if(!Array.isArray(daily_exercises) || isNaN(target as number)) throw new Error("input data incorrect");
        const result = calculateExercises(daily_exercises as Array<number>, target as number);
        return res.send(result);
    } catch (error: unknown) {
        let errorMessage = '';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
        return res.status(401).send({ error: errorMessage });
    }
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
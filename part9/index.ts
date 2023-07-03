import express = require('express');
import { calculateBmi } from './calculateBMI';
import { isNotNumber } from './utils';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
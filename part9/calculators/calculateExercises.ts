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
export const calculateExercises = (hours: Array<number>, target: number): ExerciseResult => {
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
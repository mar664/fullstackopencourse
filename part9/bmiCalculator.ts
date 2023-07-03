/* Calculates the BMI given height in cm and weight in kg and returns a message conveying the result */
const calculateBmi = (height : number, weight : number) : string => {
    if(height <= 0) throw new Error("Height must be greater than zero")
    if(weight <= 0) throw new Error("Weight must be greater than zero")

    height = height / 100
    const BMI = weight / (height*height)

    if (BMI < 16.0) return "Underweight (Severe thinness)"
    else if (BMI > 16.0 && BMI < 17.0) return "Underweight (Moderate thinness)"
    else if (BMI >= 17.0 && BMI < 18.5) return "Underweight (Mild thinness)"
    else if (BMI >= 18.5 && BMI < 25.0) return "Normal (healthy weight)"
    else if (BMI >= 25.0 && BMI < 30.0) return "Overweight (Pre-obese)"
    else if (BMI >= 30.0 && BMI < 35.0) return "Obese (Class I)"
    else if (BMI >= 35.0 && BMI < 40.0) return "Obese (Class II)"
    else if (BMI >= 40.0) return "Obese (Class III)"
}

try {
    console.log(calculateBmi(180, 74));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

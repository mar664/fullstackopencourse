import patientData from "../data/patients";
import { v1 as uuid } from "uuid";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const patients: Patient[] = patientData;

const getNonSentitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNewPatient = (_patient: NewPatient): NonSensitivePatient => {
  const id: string = uuid();
  return {
    id,
    name: "Matti Luukkainen",
    dateOfBirth: "1971-04-09",
    gender: "male",
    occupation: "Digital evangelist",
  };
};

export default {
  getNonSentitivePatients,
  addNewPatient,
};

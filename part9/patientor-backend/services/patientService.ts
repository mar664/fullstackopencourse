import patientData from "../data/patients";
import { v1 as uuid } from "uuid";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const patients: Patient[] = patientData;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }): NonSensitivePatient => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addNewPatient = (patient: NewPatient): NonSensitivePatient => {
  const id: string = uuid();
  const newPatient: Patient = {
    id,
    ...patient,
  };

  patients.push(newPatient);

  // remove sensitive info from return
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...nonSensitivePatient } = newPatient;

  return nonSensitivePatient;
};

export default {
  getNonSensitivePatients,
  getPatient,
  addNewPatient,
};
import patientData from "../data/patients";
import { v1 as uuid } from "uuid";
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";

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

const addNewEntry = (patientId: Patient["id"], entry: NewEntry): Entry => {
  const id: string = uuid();
  const newEntry: Entry = {
    id,
    ...entry,
  };

  const patient = getPatient(patientId);
  patient?.entries.push(newEntry);

  return newEntry;
};
export default {
  getNonSensitivePatients,
  getPatient,
  addNewPatient,
  addNewEntry,
};

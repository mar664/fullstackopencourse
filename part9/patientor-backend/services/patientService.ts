import patientData from '../data/patients';

import { NonSensitivePatient, Patient } from '../types';

const patients: Patient[] = patientData;

const getNonSentitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

export default {
  getNonSentitivePatients,
};
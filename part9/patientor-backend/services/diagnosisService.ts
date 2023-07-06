import diagnosisData from '../data/diagnoses';

import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosisData;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
    getDiagnoses,
};
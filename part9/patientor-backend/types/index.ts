export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnose["code"][];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: { date: string; criteria: string };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  ssn: string;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntry = UnionOmit<Entry, "id">;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;

export type NewHospitalEntry = Omit<HospitalEntry, "id">;

export type NewOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  "id"
>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

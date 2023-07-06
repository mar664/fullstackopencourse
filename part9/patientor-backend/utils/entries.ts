import { isDate, isHealthCheckRating, isString } from ".";
import {
  Diagnose,
  NewEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
} from "../types";
import { assertNever } from "./helpers";

const parseType = (type: unknown): string => {
  if (!type || !isString(type)) {
    throw new Error("Incorrect or missing type");
  }

  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnose["code"]> => {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
    return [] as Array<Diagnose["code"]>;
  }

  return diagnosisCodes as Array<Diagnose["code"]>;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (
    isNaN(healthCheckRating as number) ||
    !isHealthCheckRating(Number(healthCheckRating))
  ) {
    throw new Error("Incorrect or missing healthCheckRating");
  }

  return Number(healthCheckRating);
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }

  return employerName;
};

const parseSickLeave = (
  sickLeave: unknown
): NewOccupationalHealthcareEntry["sickLeave"] | undefined => {
  if (
    !sickLeave ||
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave && "endDate" in sickLeave)
  ) {
    return undefined;
  } else if (!isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
    throw new Error("Incorrect or missing startDate");
  } else if (!isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
    throw new Error("Incorrect or missing endDate");
  }

  return sickLeave as NewOccupationalHealthcareEntry["sickLeave"];
};

const parseDischarge = (
  discharge: unknown
): NewHospitalEntry["discharge"] | undefined => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge && "criteria" in discharge)
  ) {
    return undefined;
  } else if (
    !discharge.date ||
    !isString(discharge.date) ||
    !isDate(discharge.date)
  ) {
    throw new Error("Incorrect or missing discharge date");
  } else if (!discharge.criteria || !isString(discharge.criteria)) {
    throw new Error("Incorrect or missing criteria");
  }

  return discharge as NewHospitalEntry["discharge"];
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object
  ) {
    switch (parseType(object.type)) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const newEntry: NewHealthCheckEntry = {
            type: "HealthCheck",
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return newEntry;
        }
        throw new Error(
          "Incorrect HealthCheck data: healthCheckRating missing"
        );
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          const newEntry: NewOccupationalHealthcareEntry = {
            type: "OccupationalHealthcare",
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            employerName: parseEmployerName(object.employerName),
          };

          if ("sickLeave" in object) {
            return { ...newEntry, sickLeave: parseSickLeave(object.sickLeave) };
          }
          return newEntry;
        }
        throw new Error(
          "Incorrect OccupationalHealthcare data: employerName missing"
        );
      case "Hospital":
        const newEntry: NewHospitalEntry = {
          type: "Hospital",
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        };
        if ("discharge" in object) {
          return { ...newEntry, discharge: parseDischarge(object) };
        }

        return newEntry;
      default:
        assertNever(object.type as never);
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default { toNewEntry };

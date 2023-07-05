import { Gender, HealthCheckRating } from "../types";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

export const isHealthCheckRating = (
  param: number
): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

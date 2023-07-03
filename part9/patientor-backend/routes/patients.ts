import express from "express";
import patientService from "../services/patientService";
import { NonSensitivePatient } from "../types";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSentitivePatients());
});

router.post("/", (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, gender, ssn, occupation } = req.body;

  const addedPatient: NonSensitivePatient = patientService.addNewPatient({
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
  });
  res.send(addedPatient);
});

export default router;

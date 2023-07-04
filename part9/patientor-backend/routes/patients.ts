import express from "express";
import patientService from "../services/patientService";
import patientUtils from "../utils/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSentitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = patientUtils.toNewPatient(req.body);

    const addedPatient = patientService.addNewPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

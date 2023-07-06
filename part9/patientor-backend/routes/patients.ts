import express from "express";
import patientService from "../services/patientService";
import patientUtils from "../utils/patients";
import entriesUtils from "../utils/entries";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient = patientService.getPatient(id);
  if (patient) res.json(patient);
  else res.status(400).send("Error: patient not found");
});

router.post("/:id/entries", (req, res) => {
  try {
    const { id: patientId } = req.params;

    const newEntry = entriesUtils.toNewEntry(req.body);

    const addedEntry = patientService.addNewEntry(patientId, newEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

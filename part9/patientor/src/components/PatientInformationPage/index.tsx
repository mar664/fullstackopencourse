import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Diagnosis, EntryFormValues, Gender, Patient } from "../../types";
import patientService from "../../services/patients";
import axios from "axios";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryComponent from "./EntryComponent";
import AddEntryModal from "../AddEntryModal";
interface Props {
  patientId: string | undefined;
  diagnoses: Map<string, Diagnosis>;
}

const PatientInformationPage = ({ patientId, diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (!patientId || !patient)
        throw new Error("Patient id or patient is missing");
      const entry = await patientService.createEntry(patientId, values);
      const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(entry),
      };
      setPatient(updatedPatient);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  useEffect(() => {
    if (patientId) {
      const fetchPatient = async () => {
        const patient = await patientService.getById(patientId);
        setPatient(patient);
      };
      void fetchPatient();
    }
  }, [patientId]);

  if (!patientId || !patient) return null;

  return (
    <div className="App">
      <Box>
        <Typography variant="h4">
          {" "}
          {patient.name}
          {patient.gender === Gender.Male ? <MaleIcon /> : ""}
          {patient.gender === Gender.Female ? <FemaleIcon /> : ""}
          {patient.gender === Gender.Other ? <TransgenderIcon /> : ""}
        </Typography>
        <Box>ssn: {patient.ssn}</Box>
        <Box>occupation: {patient.occupation}</Box>
        <Box>date of birth: {patient.dateOfBirth}</Box>
        <Typography variant="h5">entries</Typography>
        {patient.entries.map((entry) => (
          <EntryComponent key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          diagnoses={diagnoses}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </Box>
    </div>
  );
};

export default PatientInformationPage;

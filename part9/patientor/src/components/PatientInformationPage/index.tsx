import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Gender, Patient } from "../../types";
import patientService from "../../services/patients";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
interface Props {
  patientId: string | undefined;
}

const PatientInformationPage = ({ patientId }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);

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
      </Box>
    </div>
  );
};

export default PatientInformationPage;

import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import diagnoseService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientInformationPage from "./components/PatientInformationPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Map<string, Diagnosis>>(
    new Map<string, Diagnosis>()
  );
  const match = useMatch("/:id");

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnoseList = async () => {
      const diagnoses = await diagnoseService.getAll();
      const diagnosesMap = new Map<string, Diagnosis>();
      diagnoses.forEach((d) => diagnosesMap.set(d.code, d));
      setDiagnoses(diagnosesMap);
    };
    void fetchDiagnoseList();
  }, []);

  const patient = match?.params.id;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/:id"
            element={
              <PatientInformationPage
                patientId={patient}
                diagnoses={diagnoses}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;

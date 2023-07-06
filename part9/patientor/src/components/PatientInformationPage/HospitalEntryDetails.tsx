import { Diagnosis, HospitalEntry } from "../../types";
import { Box } from "@mui/material";
import DiagnosisCodes from "./DiagnosisCodes";

interface Props {
  entry: HospitalEntry;
  diagnoses: Map<string, Diagnosis>;
}

const HospitalEntryDetails = ({ entry, diagnoses }: Props) => {
  return (
    <Box>
      {entry.date}
      <br />
      <i>{entry.description}</i>
      <br />
      <br />
      {entry.discharge
        ? `Discharged on: ${entry.discharge?.date} due to '${entry.discharge?.criteria}'`
        : ""}
      <DiagnosisCodes entry={entry} diagnoses={diagnoses} />
      diagnose by {entry.specialist}
    </Box>
  );
};

export default HospitalEntryDetails;

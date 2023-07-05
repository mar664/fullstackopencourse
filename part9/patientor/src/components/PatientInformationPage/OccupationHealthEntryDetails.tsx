import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import { Box } from "@mui/material";
import DiagnosisCodes from "./DiagnosisCodes";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Map<string, Diagnosis>;
}

const OccupationHealthEntryDetails = ({ entry, diagnoses }: Props) => {
  return (
    <Box>
      {entry.date}
      <br />
      <i>{entry.description}</i>
      <br />
      <br />
      Works for: {entry.employerName}
      <br />
      {entry.sickLeave
        ? `Sick on: '${entry.sickLeave?.startDate}' to '${entry.sickLeave?.endDate}'`
        : ""}
      <DiagnosisCodes entry={entry} diagnoses={diagnoses} />
      diagnose by {entry.specialist}
    </Box>
  );
};

export default OccupationHealthEntryDetails;

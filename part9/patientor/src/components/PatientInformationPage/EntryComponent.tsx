import { Box, Card } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import EntryDetails from "./EntryDetails";
interface Props {
  entry: Entry;
  diagnoses: Map<string, Diagnosis>;
}

const EntryComponent = ({ entry, diagnoses }: Props) => {
  return (
    <Box sx={{ padding: "10px" }}>
      <Card variant="outlined" sx={{ padding: "10px" }}>
        <EntryDetails entry={entry} diagnoses={diagnoses} />
      </Card>
    </Box>
  );
};

export default EntryComponent;

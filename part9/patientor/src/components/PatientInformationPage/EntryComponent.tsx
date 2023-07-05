import { Box } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
interface Props {
  entry: Entry;
  diagnoses: Map<string, Diagnosis>;
}

const EntryComponent = ({ entry, diagnoses }: Props) => {
  return (
    <Box>
      {entry.date} <i>{entry.description}</i>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes?.map((c) => (
            <li key={c}>
              {c} {diagnoses.get(c)?.name}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </Box>
  );
};

export default EntryComponent;

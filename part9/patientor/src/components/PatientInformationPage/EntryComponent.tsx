import { Box } from "@mui/material";
import { Entry } from "../../types";
interface Props {
  entry: Entry;
}

const EntryComponent = ({ entry }: Props) => {
  return (
    <Box>
      {entry.date} <i>{entry.description}</i>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes?.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </Box>
  );
};

export default EntryComponent;

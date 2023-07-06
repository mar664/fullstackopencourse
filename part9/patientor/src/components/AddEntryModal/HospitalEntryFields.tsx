import { TextField, InputLabel } from "@mui/material";
import { HospitalEntry } from "../../types";
interface Props {
  discharge: HospitalEntry["discharge"];
  setDischarge: React.Dispatch<
    React.SetStateAction<HospitalEntry["discharge"]>
  >;
}

const HospitalEntryFields = ({ discharge, setDischarge }: Props) => {
  return (
    <>
      <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={discharge && "date" in discharge ? discharge.date : ""}
        onChange={({ target }) => {
          if (discharge) {
            setDischarge({ ...discharge, date: target.value });
          } else {
            setDischarge({ criteria: "", date: target.value });
          }
        }}
      />
      <TextField
        label="Critieria"
        fullWidth
        value={discharge && "criteria" in discharge ? discharge.criteria : ""}
        onChange={({ target }) => {
          if (discharge) {
            setDischarge({ ...discharge, criteria: target.value });
          } else {
            setDischarge({ date: "", criteria: target.value });
          }
        }}
      />
    </>
  );
};

export default HospitalEntryFields;

import { TextField, InputLabel } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../types";
interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeave: OccupationalHealthcareEntry["sickLeave"];
  setSickLeave: React.Dispatch<
    React.SetStateAction<OccupationalHealthcareEntry["sickLeave"]>
  >;
}

const OccupationalHealthcareFields = ({
  employerName,
  setEmployerName,
  sickLeave,
  setSickLeave,
}: Props) => {
  return (
    <>
      <TextField
        label="EmployerName"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel style={{ marginTop: 20 }}>Sickleave</InputLabel>
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={sickLeave && "startDate" in sickLeave ? sickLeave.startDate : ""}
        onChange={({ target }) => {
          if (sickLeave) {
            setSickLeave({ ...sickLeave, startDate: target.value });
          } else {
            setSickLeave({ endDate: "", startDate: target.value });
          }
        }}
      />
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={sickLeave && "endDate" in sickLeave ? sickLeave.endDate : ""}
        onChange={({ target }) => {
          if (sickLeave) {
            setSickLeave({ ...sickLeave, endDate: target.value });
          } else {
            setSickLeave({ startDate: "", endDate: target.value });
          }
        }}
      />
    </>
  );
};

export default OccupationalHealthcareFields;

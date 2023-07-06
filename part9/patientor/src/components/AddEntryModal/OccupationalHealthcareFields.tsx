import { TextField, InputLabel } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
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
      <DatePicker
        label="StartDate"
        value={
          sickLeave && "startDate" in sickLeave && sickLeave.startDate
            ? dayjs(sickLeave.startDate)
            : null
        }
        onChange={(value: Dayjs | null) => {
          if (value) {
            if (sickLeave) {
              setSickLeave({
                ...sickLeave,
                startDate: value.format("DD/MM/YYYY"),
              });
            } else {
              setSickLeave({
                endDate: "",
                startDate: value.format("DD/MM/YYYY"),
              });
            }
          }
        }}
      />
      <DatePicker
        label="EndDate"
        value={
          sickLeave && "endDate" in sickLeave && sickLeave.endDate
            ? dayjs(sickLeave.endDate)
            : null
        }
        onChange={(value: Dayjs | null) => {
          if (value) {
            if (sickLeave) {
              setSickLeave({
                ...sickLeave,
                endDate: value.format("DD/MM/YYYY"),
              });
            } else {
              setSickLeave({
                startDate: "",
                endDate: value.format("DD/MM/YYYY"),
              });
            }
          }
        }}
      />
    </>
  );
};

export default OccupationalHealthcareFields;

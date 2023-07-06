import { TextField, InputLabel } from "@mui/material";
import { HospitalEntry } from "../../types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
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
        label="Criteria"
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

      <DatePicker
        label="Date"
        value={
          discharge && "date" in discharge && discharge.date
            ? dayjs(discharge.date)
            : null
        }
        onChange={(value: Dayjs | null) => {
          if (value) {
            if (discharge) {
              setDischarge({
                ...discharge,
                date: value.format("DD/MM/YYYY"),
              });
            } else {
              setDischarge({ criteria: "", date: value.format("DD/MM/YYYY") });
            }
          }
        }}
      />
    </>
  );
};

export default HospitalEntryFields;

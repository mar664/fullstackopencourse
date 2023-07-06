import { useState, SyntheticEvent } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";

import {
  Diagnosis,
  EntryFormValues,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { assertNever } from "../../helpers";
import HospitalEntryFields from "./HospitalEntryFields";
import OccupationalHealthcareFields from "./OccupationalHealthcareFields";
import HealthCheckFields from "./HealthCheckFields";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Map<string, Diagnosis>;
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.LowRisk
  );
  const [discharge, setDischarge] =
    useState<HospitalEntry["discharge"]>(undefined);

  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] =
    useState<OccupationalHealthcareEntry["sickLeave"]>(undefined);

  const diagnosisCodesOptions = [...diagnoses.values()].map((v) => ({
    value: v.code,
    label: v.code,
  }));

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value);
  };

  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    event.preventDefault();
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const extraFields = (): JSX.Element => {
    switch (type) {
      case "HealthCheck":
        return (
          <HealthCheckFields
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        );
      case "Hospital":
        return (
          <HospitalEntryFields
            discharge={discharge}
            setDischarge={setDischarge}
          />
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareFields
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        );
      default:
        return assertNever(type as never);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (type) {
      case "HealthCheck":
        return onSubmit({
          type,
          date,
          description,
          specialist,
          diagnosisCodes,
          healthCheckRating,
        });
      case "Hospital":
        return onSubmit({
          type,
          date,
          description,
          specialist,
          diagnosisCodes,
          discharge,
        });
      case "OccupationalHealthcare":
        return onSubmit({
          type,
          date,
          description,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave,
        });
      default:
        assertNever(type as never);
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <FormLabel>Type</FormLabel>
        <RadioGroup row value={type} onChange={handleChangeType}>
          <FormControlLabel
            value="HealthCheck"
            control={<Radio />}
            label="HealthCheck"
          />
          <FormControlLabel
            value="Hospital"
            control={<Radio />}
            label="Hospital"
          />
          <FormControlLabel
            value="OccupationalHealthcare"
            control={<Radio />}
            label="OccupationalHealthcare"
          />
        </RadioGroup>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <DatePicker
          label="Date"
          value={date ? dayjs(date) : null}
          onChange={(value: Dayjs | null) => {
            if (value) {
              setDate(value.format("DD/MM/YYYY"));
            }
          }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
        <Select
          label="Diagnosis codes"
          fullWidth
          multiple
          value={diagnosisCodes}
          onChange={handleDiagnosisCodeChange}
        >
          {diagnosisCodesOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {extraFields()}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;

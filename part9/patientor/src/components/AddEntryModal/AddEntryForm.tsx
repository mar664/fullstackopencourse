import { useState, SyntheticEvent } from "react";

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
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { assertNever } from "../../helpers";
import HospitalEntryFields from "./HospitalEntryFields";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Map<string, Diagnosis>;
}

interface HealthCheckRatingOption {
  value: number;
  label: string;
}

// Since typescript Enums are reversible when values are numbers, need to filter when value is key
const healthCheckOptions: HealthCheckRatingOption[] = Object.entries(
  HealthCheckRating
)
  .filter((v) => isNaN(Number(v[0])))
  .map((v) => ({
    value: Number(v[1]),
    label: v[0].toString(),
  }));

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

  const handleCheckCheckRatingChange = (
    event: SelectChangeEvent<typeof healthCheckRating>
  ) => {
    event.preventDefault();
    const value = event.target.value;
    // Check value is a number and exists in HealthCheckRating enum
    if (typeof value === "number") {
      const rating = Object.values(HealthCheckRating).find(
        (r) => typeof r === "number" && r === value
      );
      if (rating) {
        setHealthCheckRating(value);
      }
    }
  };

  const extraFields = (): JSX.Element => {
    switch (type) {
      case "HealthCheck":
        return (
          <>
            <InputLabel style={{ marginTop: 20 }}>
              Health Check Rating
            </InputLabel>
            <Select
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating}
              onChange={handleCheckCheckRatingChange}
            >
              {healthCheckOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
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
          <>
            <TextField
              label="EmployerName"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Sickleave</InputLabel>
            <TextField
              label="Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={
                sickLeave && "startDate" in sickLeave ? sickLeave.startDate : ""
              }
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
              value={
                sickLeave && "endDate" in sickLeave ? sickLeave.endDate : ""
              }
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
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
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

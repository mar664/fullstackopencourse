import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { Diagnosis, EntryFormValues, HealthCheckRating } from "../../types";

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
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.LowRisk
  );

  const diagnosisCodesOptions = [...diagnoses.values()].map((v) => ({
    value: v.code,
    label: v.code,
  }));

  const handleDiagnosisCodeChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    event.preventDefault();
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      date,
      description,
      specialist,
      diagnosisCodes,
      healthCheckRating,
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
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

        <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
        <Select label="Health Check Rating" fullWidth value={healthCheckRating}>
          {healthCheckOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

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

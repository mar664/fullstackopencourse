import { Select, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import { HealthCheckRating } from "../../types";
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
interface Props {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

const HealthCheckFields = ({
  healthCheckRating,
  setHealthCheckRating,
}: Props) => {
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

  return (
    <>
      <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
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
};

export default HealthCheckFields;

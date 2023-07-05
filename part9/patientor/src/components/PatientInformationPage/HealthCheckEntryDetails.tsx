import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import { Box } from "@mui/material";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../../helpers";
import DiagnosisCodes from "./DiagnosisCodes";
interface Props {
  entry: HealthCheckEntry;
  diagnoses: Map<string, Diagnosis>;
}

const HealthCheckEntryDetails = ({ entry, diagnoses }: Props) => {
  const iconColour = (): string | undefined => {
    switch (entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
      default:
        assertNever(entry.healthCheckRating);
    }
  };
  return (
    <Box>
      {entry.date} <MedicalInformationIcon />
      <br />
      <i>{entry.description}</i>
      <br />
      <FavoriteIcon htmlColor={iconColour()} />
      <br />
      <DiagnosisCodes entry={entry} diagnoses={diagnoses} />
      diagnose by {entry.specialist}
    </Box>
  );
};

export default HealthCheckEntryDetails;

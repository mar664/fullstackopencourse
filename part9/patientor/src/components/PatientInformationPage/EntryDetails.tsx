import { Diagnosis, Entry } from "../../types";
import { assertNever } from "../../helpers";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationHealthEntryDetails from "./OccupationHealthEntryDetails";
interface Props {
  entry: Entry;
  diagnoses: Map<string, Diagnosis>;
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationHealthEntryDetails entry={entry} diagnoses={diagnoses} />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

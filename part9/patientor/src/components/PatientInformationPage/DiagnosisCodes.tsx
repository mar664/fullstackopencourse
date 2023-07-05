import { Entry, Diagnosis } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Map<string, Diagnosis>;
}

const DiagnosisCodes = ({ entry, diagnoses }: Props) => {
  return (
    <>
      {entry.diagnosisCodes ? (
        <div>
          {"Diagnoses:"}
          <ul>
            {entry.diagnosisCodes.map((c) => (
              <li key={c}>
                {c} {diagnoses.get(c)?.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default DiagnosisCodes;

import { assertNever } from "../helpers";
import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.kind}
          </b>
          <br />
          <i>{coursePart.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.kind}
          </b>
          <br />
          project exercises {coursePart.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.kind}
          </b>
          <br />
          submit to {coursePart.backgroundMaterial}
        </p>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;

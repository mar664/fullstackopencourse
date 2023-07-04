import { assertNever } from "../helpers";
import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  const coursePartTitle = (
    <b>
      {coursePart.name} {coursePart.kind}
    </b>
  );

  switch (coursePart.kind) {
    case "basic":
      return (
        <p>
          {coursePartTitle}
          <br />
          <i>{coursePart.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          {coursePartTitle}
          <br />
          project exercises {coursePart.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          {coursePartTitle}
          <br />
          <i>{coursePart.description}</i>
          <br />
          submit to {coursePart.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          {coursePartTitle}
          <br />
          <i>{coursePart.description}</i>
          <br />
          required skills: {coursePart.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;

import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((course) => (
        <Part key={course.name} coursePart={course} />
      ))}
    </>
  );
};

export default Content;

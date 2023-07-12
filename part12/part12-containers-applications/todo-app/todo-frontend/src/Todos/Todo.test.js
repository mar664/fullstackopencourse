import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("renders content", () => {
  const onClickDelete = (todo) => () => {};

  const onClickComplete = (todo) => () => {};

  const todo = {
    text: "Component testing is done with react-testing-library",
    done: true,
  };

  render(
    <Todo
      todo={todo}
      onClickDelete={onClickDelete}
      onClickComplete={onClickComplete}
    />
  );

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();

  const element2 = screen.getByText("This todo is done");
  expect(element2).toBeDefined();
});

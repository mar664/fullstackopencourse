import React from "react";

import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import SignUpContainer from "../components/signup/SignUpContainer";

describe("SignUp", () => {
  describe("SignUpContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      render(<SignUpContainer onSubmit={onSubmit} error={undefined} />);

      // render the SignInContainer component, fill the text inputs and press the submit button
      fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
      fireEvent.changeText(
        screen.getByPlaceholderText("Confirm Password"),
        "password"
      );
      fireEvent.press(screen.getByText("Submit"));

      await waitFor(() => {
        // expect the onSubmit function to have been called once
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
          passwordConfirm: "password",
        });
      });
    });
  });
});

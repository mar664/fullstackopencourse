import { Pressable } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { FormikProps } from "formik";

interface IValues {
  username: string;
  password: string;
}

const SignInFields = ({ handleSubmit }: FormikProps<IValues>) => {
  return (
    <>
      <FormikTextInput
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
        }}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
        }}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Pressable
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={{ padding: 10, textAlign: "center" }} blueBackground>
          Submit
        </Text>
      </Pressable>
    </>
  );
};

export default SignInFields;

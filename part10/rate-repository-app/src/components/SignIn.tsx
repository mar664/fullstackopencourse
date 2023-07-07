import { Alert, Pressable, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

interface IValues {
  username: string;
  password: string;
}

const SignIn = () => {
  const onSubmit = (values: IValues) => {
    Alert.alert(JSON.stringify(values));
  };
  return (
    <View style={{ padding: 10 }}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }: FormikProps<IValues>) => (
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
        )}
      </Formik>
    </View>
  );
};

export default SignIn;

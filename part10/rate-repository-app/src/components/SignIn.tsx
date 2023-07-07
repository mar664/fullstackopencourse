import { Alert, View } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import SignInFields from "./SignInFields";

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
        {(props: FormikProps<IValues>) => {
          return <SignInFields {...props} />;
        }}
      </Formik>
    </View>
  );
};

export default SignIn;

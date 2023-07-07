import { Alert, View } from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import SignInFields from "./SignInFields";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

interface IValues {
  username: string;
  password: string;
}

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values: IValues) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
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

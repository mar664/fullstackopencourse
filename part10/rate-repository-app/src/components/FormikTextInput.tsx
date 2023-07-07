import { StyleSheet, TextInputProps, TextStyle } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: "red",
  },
});

interface FormikTextInputProps extends TextInputProps {
  name: string;
  style?: TextStyle;
}

const FormikTextInput = ({ name, ...props }: FormikTextInputProps) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  if (showError) {
    props.style = props.style ? { ...props.style, borderColor: "red" } : {};
  }
  return (
    <>
      <TextInput
        onChangeText={(value) => {
          helpers.setValue(value);
        }}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;

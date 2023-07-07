import { TextInput as NativeTextInput, TextStyle } from "react-native";
import { TextInputProps } from "react-native";

interface ITextInputProps extends TextInputProps {
  styles?: TextStyle;
}

const TextInput = ({ styles, ...props }: ITextInputProps) => {
  const textInputStyle = [styles];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;

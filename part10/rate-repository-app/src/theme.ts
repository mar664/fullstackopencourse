import { ColorValue, Platform, TextStyle, ViewStyle } from "react-native";
interface ITheme {
  fontWeights: {
    [index: string]: TextStyle["fontWeight"];
  };
  colors: {
    [index: string]: ColorValue;
  };
  fontSizes: {
    [index: string]: TextStyle["fontSize"];
  };
  fonts: {
    [index: string]: TextStyle["fontFamily"];
  };
  separator: ViewStyle;
}

const theme: ITheme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    appBar: 20,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  separator: {
    height: 10,
    backgroundColor: "lightgray",
  },
};

export default theme;

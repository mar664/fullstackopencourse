import React from "react";
import {
  Text as NativeText,
  StyleSheet,
  TextProps,
  TextStyle,
} from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  alignCenter: {
    textAlign: "center",
  },
  blueBackground: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 2,
    borderRadius: 4,
  },
  redBackground: {
    backgroundColor: theme.colors.warning,
    color: "white",
    padding: 2,
    borderRadius: 4,
  },
});

interface ITextProps extends TextProps {
  color?: string;
  fontSize?: string;
  bold?: boolean;
  style?: TextStyle;
  alignCenter?: boolean;
  blueBackground?: boolean;
  redBackground?: boolean;
}

const Text = ({
  color,
  fontSize,
  bold,
  style,
  alignCenter,
  blueBackground,
  redBackground,
  ...props
}: ITextProps) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    fontSize === "subheading" && styles.fontSizeSubheading,
    bold && styles.fontWeightBold,
    alignCenter && styles.alignCenter,
    blueBackground && styles.blueBackground,
    redBackground && styles.redBackground,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;

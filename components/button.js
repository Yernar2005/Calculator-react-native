import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const BTN_MARGIN = 5;
const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4 - BTN_MARGIN * 2;

const Button = ({ value, buttonStyle, onPress }) => {
  const btnStyles = [styles.btn];
  const txtStyles = [styles.btnText];

  if (buttonStyle === "secondary") {
    btnStyles.push(styles.btnSecondary);
    txtStyles.push(styles.btnTextSecondary);
  }
  if (buttonStyle === "accent") {
    btnStyles.push(styles.btnAccent);
  }
  if (buttonStyle === "double") {
    btnStyles.push(styles.btnDouble);
  }

  return (
    <TouchableOpacity style={btnStyles} onPress={() => onPress(value)}>
      <Text style={txtStyles}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#333333",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: BTN_MARGIN,
    borderRadius: 100,
    height: buttonWidth,
  },
  btnText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "500",
  },
  btnSecondary: {
    backgroundColor: "#a6a6a6",
  },
  btnTextSecondary: {
    color: "#060606",
  },
  btnAccent: {
    backgroundColor: "Orange",
  },
  btnDouble: {
    alignItems: "flex-start",
    flex: 0,
    width: buttonWidth * 2 + BTN_MARGIN * 2,
    paddingLeft: buttonWidth / 2 - BTN_MARGIN * 1.5,
  },
});

export default Button;
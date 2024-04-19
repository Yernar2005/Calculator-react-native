import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import calculate from '../utils/calculate'; 


const Row = ({ children }) => <View style={styles.row}>{children}</View>;


const BTN_MARGIN = 5
const screen = Dimensions.get("window")
const buttonWidth = screen.width / 4 - BTN_MARGIN * 2

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
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "flex-end",
  },
  computedValue: {
    color: "#fff",
    fontSize: 80,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
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
    backgroundColor: "#f09a36",
  },
  btnDouble: {
    alignItems: "flex-start",
    flex: 0,
    width: buttonWidth  * 2 + BTN_MARGIN  * 2,
    paddingLeft: buttonWidth / 2 - BTN_MARGIN * 1.5,
  },
});

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [operand, setOperand] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(true);

  const handleButtonClick = (value) => {
    if (!isNaN(value) || value === '.') {
      if (waitingForOperand) {
        setDisplayValue(value);
      } else {
        setDisplayValue(displayValue + value);
      }
      setWaitingForOperand(false);
    } else { 
      switch (value) {
        case 'C':
          setDisplayValue('0');
          setOperator(null);
          setOperand(null);
          setWaitingForOperand(true);
          break;
        case '+/-':
          setDisplayValue(String(-parseFloat(displayValue)));
          break;
        case '%':
          setDisplayValue(String(parseFloat(displayValue) / 100));
          break;
        case '/':
        case 'x':
        case '-':
        case '+':
          if (operator && !waitingForOperand) {
            const result = calculate(operand, parseFloat(displayValue), operator);
            setDisplayValue(String(result));
            setOperand(result);
          } else {
            setOperand(parseFloat(displayValue));
          }
          setOperator(value);
          setWaitingForOperand(true);
          break;
        case '=':
          if (operator != null && operand != null) {
            const result = calculate(operand, parseFloat(displayValue), operator);
            setDisplayValue(String(result));
            setOperand(null);
            setOperator(null);
          }
          setWaitingForOperand(true);
          break;
        default:
          break;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.computedValue}>{displayValue}</Text>
      <Row>
        <Button value="C" buttonStyle="secondary" onPress={handleButtonClick} />
        <Button value="+/-" buttonStyle="secondary" onPress={handleButtonClick} />
        <Button value="%" buttonStyle="secondary" onPress={handleButtonClick} />
        <Button value="/" buttonStyle="accent" onPress={handleButtonClick} />
      </Row>
      <Row>
        <Button value="7" onPress={handleButtonClick} />
        <Button value="8" onPress={handleButtonClick} />
        <Button value="9" onPress={handleButtonClick} />
        <Button value="x" buttonStyle="accent" onPress={handleButtonClick} />
      </Row>
      <Row>
        <Button value="4" onPress={handleButtonClick} />
        <Button value="5" onPress={handleButtonClick} />
        <Button value="6" onPress={handleButtonClick} />
        <Button value="-" buttonStyle="accent" onPress={handleButtonClick} />
      </Row>
      <Row>
        <Button value="1" onPress={handleButtonClick} />
        <Button value="2" onPress={handleButtonClick} />
        <Button value="3" onPress={handleButtonClick} />
        <Button value="+" buttonStyle="accent" onPress={handleButtonClick} />
      </Row>
      <Row>
        <Button value="0" buttonStyle="double" onPress={handleButtonClick} />
        <Button value="." onPress={handleButtonClick} />
        <Button value="=" buttonStyle="accent" onPress={handleButtonClick} />
      </Row>
    </SafeAreaView>
  );
};

export default Calculator;

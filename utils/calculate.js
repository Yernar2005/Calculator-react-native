const calculate = (operand1, operand2, operator) => {
    switch (operator) {
      case '+': return operand1 + operand2;
      case '-': return operand1 - operand2;
      case 'x': return operand1 * operand2;
      case '/': return operand2 !== 0 ? operand1 / operand2 : "Error";
      default: throw new Error("Mistake in calculate");
    }
  };
  
  export default calculate
  
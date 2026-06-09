/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   + : Addition
 *   - : Subtraction
 *   * : Multiplication (×)
 *   / : Division (÷)
 *   % : Modulo (remainder)
 *   ** : Exponentiation (power)
 *   sqrt : Square root
 *
 * Usage: node calculator.js <number> <operator> <number>
 * Example: node calculator.js 10 + 5
 * Example: node calculator.js 2 ** 8
 * Example: node calculator.js sqrt 16
 */

// Addition
function add(a, b) {
  return a + b;
}

// Subtraction
function subtract(a, b) {
  return a - b;
}

// Multiplication
function multiply(a, b) {
  return a * b;
}

// Division
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero.");
  }
  return a / b;
}

// Modulo
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero.");
  }
  return a % b;
}

// Exponentiation
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Square Root
function squareRoot(n) {
  if (n < 0) {
    throw new Error("Cannot calculate square root of a negative number.");
  }
  return Math.sqrt(n);
}

// Calculate based on operator
function calculate(num1, operator, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    case "%":
      return modulo(num1, num2);
    case "**":
      return power(num1, num2);
    case "sqrt":
      return squareRoot(num1);
    default:
      throw new Error(`Unknown operator '${operator}'. Use +, -, *, /, %, **, or sqrt`);
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length !== 3 && !(args.length === 2 && args[0] === "sqrt")) {
    console.log("Usage: node calculator.js <number> <operator> <number>");
    console.log("       node calculator.js sqrt <number>");
    console.log("Operators: + - * / % ** sqrt");
    process.exit(1);
  }

  let num1, operator, num2;

  if (args[0] === "sqrt") {
    operator = "sqrt";
    num1 = parseFloat(args[1]);
    num2 = null;
  } else {
    num1 = parseFloat(args[0]);
    operator = args[1];
    num2 = parseFloat(args[2]);
  }

  if (isNaN(num1) || (num2 !== null && isNaN(num2))) {
    console.log("Error: Both operands must be valid numbers.");
    process.exit(1);
  }

  try {
    const result = calculate(num1, operator, num2);
    if (operator === "sqrt") {
      console.log(`sqrt(${num1}) = ${result}`);
    } else {
      console.log(`${num1} ${operator} ${num2} = ${result}`);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };

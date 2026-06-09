/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   + : Addition
 *   - : Subtraction
 *   * : Multiplication (×)
 *   / : Division (÷)
 *   % : Modulo
 *   ^ : Exponentiation (power)
 *   sqrt : Square root
 *
 * Usage:
 *   node calculator.js <number> <operator> <number>
 *   node calculator.js sqrt <number>
 * Example: node calculator.js 10 + 5
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
    throw new Error("Cannot modulo by zero.");
  }
  return a % b;
}

// Exponentiation (power)
function power(base, exponent) {
  return base ** exponent;
}

// Square root
function squareRoot(n) {
  if (n < 0) {
    throw new Error("Cannot take square root of a negative number.");
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
    case "^":
      return power(num1, num2);
    case "sqrt":
      return squareRoot(num1);
    default:
      throw new Error(`Unknown operator '${operator}'. Use +, -, *, /, %, ^, or sqrt`);
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length !== 2 && args.length !== 3) {
    console.log("Usage: node calculator.js <number> <operator> <number>");
    console.log("Usage: node calculator.js sqrt <number>");
    console.log("Operators: + - * / % ^ sqrt");
    process.exit(1);
  }

  if (args.length === 2) {
    const operator = args[0];
    const num = parseFloat(args[1]);

    if (operator !== "sqrt") {
      console.log("Error: Two-argument usage only supports sqrt.");
      process.exit(1);
    }

    if (isNaN(num)) {
      console.log("Error: Operand must be a valid number.");
      process.exit(1);
    }

    try {
      const result = calculate(num, operator);
      console.log(`${operator} ${num} = ${result}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit(1);
    }
    process.exit(0);
  }

  const num1 = parseFloat(args[0]);
  const operator = args[1];
  const num2 = parseFloat(args[2]);

  if (isNaN(num1) || isNaN(num2)) {
    console.log("Error: Both operands must be valid numbers.");
    process.exit(1);
  }

  try {
    if (operator === "sqrt") {
      const num = args.length === 2 ? parseFloat(args[1]) : parseFloat(args[0]);

      if (isNaN(num)) {
        console.log("Error: Operand must be a valid number.");
        process.exit(1);
      }

      const result = squareRoot(num);
      console.log(`sqrt ${num} = ${result}`);
    } else {
      const num1 = parseFloat(args[0]);
      const num2 = parseFloat(args[2]);

      if (isNaN(num1) || isNaN(num2)) {
        console.log("Error: Both operands must be valid numbers.");
        process.exit(1);
      }

      const result = calculate(num1, operator, num2);
      console.log(`${num1} ${operator} ${num2} = ${result}`);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };

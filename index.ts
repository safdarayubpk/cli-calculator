#!/usr/bin/env node

// Importing required modules
import inquirer from "inquirer"; // Importing the Inquirer module for user input
import chalk from "chalk"; // Importing Chalk for coloring console output

// Function to display the welcome message
async function welcome() {
  console.log(
    chalk.yellowBright(`
  ____________________________________________________________
 /                                                            \\
|                                                              |
|                   Welcome to CLI Calculator!                 |
|                                                              |
|        ____________________________________________          |
|       |                                            |         |
|       |          _______     _______     _______    |         |
|       |         |       |   |       |   |       |   |         |
|       |         |   +   |   |   -   |   |   x   |   |         |
|       |         |_______|   |_______|   |_______|   |         |
|       |         |       |   |       |   |       |   |         |
|       |         |   /   |   |   =   |   |   .   |   |         |
|       |         |_______|   |_______|   |_______|   |         |
|       |____________________________________________|         |
|                                                              |
|                                                              |
 \\____________________________________________________________/
`)
  ); // End of the welcome message
}

// Function to perform calculation based on user input
async function askQuestion() {
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "operator",
      message: "Which operation do you want to perform?",
      choices: ["Addition", "Subtraction", "Multiplication", "Division"],
    },
    {
      type: "number",
      name: "num1",
      message: "Enter the first number:",
    },
    {
      type: "number",
      name: "num2",
      message: "Enter the second number:",
    },
  ]);

  let result;
  switch (ans.operator) {
    case "Addition":
      result = ans.num1 + ans.num2;
      break;
    case "Subtraction":
      result = ans.num1 - ans.num2;
      break;
    case "Multiplication":
      result = ans.num1 * ans.num2;
      break;
    case "Division":
      if (ans.num2 === 0) {
        // Check for division by zero
        console.log(chalk.red("Error: Division by zero is not allowed."));
        return;
      }
      result = ans.num1 / ans.num2;
      break;
    default:
      console.log(chalk.red("Error: Invalid operation selected."));
      return;
  }

  // Display the calculation result with proper format
  console.log(
    chalk.green(
      `${ans.num1} ${getOperatorSymbol(ans.operator)} ${ans.num2} = ${result}`
    )
  );
}

// Function to get operator symbol based on operation
function getOperatorSymbol(operator: string): string {
  switch (operator) {
    case "Addition":
      return "+";
    case "Subtraction":
      return "-";
    case "Multiplication":
      return "*";
    case "Division":
      return "/";
    default:
      return "";
  }
}

// Function to ask user if they want to continue
async function startAgain() {
  let restart = "y";
  while (restart.toLowerCase() === "y" || restart.toLowerCase() === "yes") {
    await askQuestion();
    const response = await inquirer.prompt({
      type: "input",
      name: "restart",
      message: "Do you want to continue? (y/n)",
    });
    restart = response.restart;
  }
}

// Main function to run the calculator
async function main() {
  await welcome();
  await startAgain();
  console.log(chalk.yellow("Goodbye!"));
}

// Start the calculator
main();


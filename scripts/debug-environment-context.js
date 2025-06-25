import chalk from "chalk"

const essentialVariables = ["DATABASE_URL", "NEXTAUTH_SECRET", "NEXTAUTH_URL", "BLOB_READ_WRITE_TOKEN"]

function checkEnvironmentVariables() {
  let allVariablesPresent = true

  console.log(chalk.bold("\nChecking essential environment variables:"))

  essentialVariables.forEach((variable) => {
    if (!process.env[variable]) {
      console.log(chalk.red(`  Missing environment variable: ${chalk.bold(variable)}`))
      allVariablesPresent = false
    } else {
      console.log(chalk.green(`  Environment variable ${chalk.bold(variable)} is present.`))
    }
  })

  if (!allVariablesPresent) {
    console.log(
      chalk.yellow(
        "\nWarning: Some essential environment variables are missing. The application may not function correctly.",
      ),
    )
  } else {
    console.log(chalk.green("\nAll essential environment variables are present."))
  }

  return allVariablesPresent
}

checkEnvironmentVariables()

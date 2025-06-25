const requiredVariables = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "OPENAI_API_KEY",
]

function checkEnvVariables() {
  let allVariablesPresent = true

  requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
      console.error(
        `Error: Missing environment variable '${variable}'. Please ensure it is set in your .env file or environment configuration.`,
      )
      allVariablesPresent = false
    }
  })

  if (!allVariablesPresent) {
    console.error("Error: Some required environment variables are missing. The application may not function correctly.")
    process.exit(1) // Exit with a non-zero code to indicate an error
  } else {
    console.log("All required environment variables are present.")
  }
}

checkEnvVariables()

const { execSync } = require("child_process")
const path = require("path")

async function runPrismaMigrate() {
  console.log("Iniciando migração do banco de dados com Prisma...")
  try {
    // Certifica-se de que o diretório de trabalho é a raiz do projeto
    const projectRoot = path.resolve(__dirname, "..")
    process.chdir(projectRoot)

    console.log(`Diretório de trabalho atual: ${process.cwd()}`)
    console.log("Executando: npx prisma migrate deploy")

    // Executa o comando de migração do Prisma
    const output = execSync("npx prisma migrate deploy", { encoding: "utf-8", stdio: "inherit" })
    console.log("Migração concluída com sucesso!")
    console.log(output)
  } catch (error) {
    console.error("Erro durante a migração do Prisma:")
    console.error(error.message)
    process.exit(1) // Sai com código de erro
  }
}

runPrismaMigrate()

const { exec } = require("child_process")

console.log("🔄 Gerando Prisma Client...")

exec("npx prisma generate", (error, stdout, stderr) => {
  if (error) {
    console.error("❌ Erro ao gerar Prisma Client:", error)
    return
  }

  if (stderr) {
    console.error("⚠️ Avisos:", stderr)
  }

  console.log("✅ Prisma Client gerado com sucesso!")
  console.log(stdout)
})

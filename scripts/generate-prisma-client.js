const { exec } = require("child_process")

console.log("🔄 Gerando cliente Prisma...")

exec("npx prisma generate", (error, stdout, stderr) => {
  if (error) {
    console.error("❌ Erro ao gerar cliente Prisma:", error)
    return
  }

  if (stderr) {
    console.error("⚠️ Avisos:", stderr)
  }

  console.log("✅ Cliente Prisma gerado com sucesso!")
  console.log(stdout)

  console.log("\n🎯 Próximos passos:")
  console.log("1. Acesse /orcamento para testar criação de orçamentos")
  console.log("2. Acesse /admin/orcamentos para gerenciar orçamentos")
  console.log("3. Acesse /admin/categorias para gerenciar categorias")
  console.log("4. Acesse /admin/equipamentos para adicionar mais equipamentos")
})

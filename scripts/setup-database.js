const { execSync } = require("child_process")

console.log("🚀 [SETUP-DB] Iniciando configuração do banco de dados...")

try {
  // 1. Generate Prisma Client
  console.log("📦 [SETUP-DB] Gerando Prisma Client...")
  execSync("npx prisma generate", { stdio: "inherit" })
  console.log("✅ [SETUP-DB] Prisma Client gerado")

  // 2. Push schema to database (creates tables)
  console.log("🗄️ [SETUP-DB] Criando tabelas no banco...")
  execSync("npx prisma db push", { stdio: "inherit" })
  console.log("✅ [SETUP-DB] Tabelas criadas no banco")

  // 3. Check if tables were created
  console.log("🔍 [SETUP-DB] Verificando tabelas criadas...")
  execSync("npx prisma db pull", { stdio: "inherit" })
  console.log("✅ [SETUP-DB] Verificação concluída")

  console.log("🎉 [SETUP-DB] Banco configurado com sucesso!")
  console.log("")
  console.log("📋 Próximos passos:")
  console.log("1. Acesse /setup para criar o usuário admin")
  console.log("2. Faça login em /admin/login")
  console.log("")
} catch (error) {
  console.error("❌ [SETUP-DB] Erro na configuração:", error.message)
  console.error("")
  console.error("🔧 Possíveis soluções:")
  console.error("1. Verifique se DATABASE_URL está configurado")
  console.error("2. Verifique se o banco está acessível")
  console.error("3. Verifique permissões do usuário no banco")
  process.exit(1)
}

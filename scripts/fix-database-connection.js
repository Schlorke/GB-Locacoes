// Script para resolver conflitos de DATABASE_URL
async function fixDatabaseConnection() {
  console.log("🔧 [FIX-DB] Resolvendo conflitos de conexão...")

  // Verificar todas as variáveis de ambiente relacionadas ao banco
  console.log("📋 Variáveis de ambiente atuais:")

  const dbVars = Object.keys(process.env).filter(
    (key) => key.includes("DATABASE") || key.includes("POSTGRES") || key.includes("NEON"),
  )

  dbVars.forEach((key) => {
    const value = process.env[key]
    console.log(`- ${key}: ${value ? value.substring(0, 30) + "..." : "NÃO DEFINIDA"}`)
  })

  // Tentar conectar com a URL atual
  if (process.env.DATABASE_URL) {
    console.log("\n🔌 Testando conexão atual...")
    try {
      const { neon } = require("@neondatabase/serverless")
      const sql = neon(process.env.DATABASE_URL)

      const result = await sql`SELECT NOW() as current_time`
      console.log("✅ Conexão funcionando! Hora do servidor:", result[0].current_time)

      // Verificar tabelas existentes
      const tables = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `

      console.log("\n📊 Tabelas existentes:")
      tables.forEach((table) => {
        console.log(`  - ${table.table_name}`)
      })

      return true
    } catch (error) {
      console.error("❌ Erro na conexão:", error.message)
      return false
    }
  } else {
    console.log("❌ DATABASE_URL não encontrada")
    return false
  }
}

fixDatabaseConnection()

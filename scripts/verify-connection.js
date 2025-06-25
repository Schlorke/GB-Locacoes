const { neon } = require("@neondatabase/serverless")

async function verifyConnection() {
  console.log("🔍 [VERIFY] Testando conexão com o banco...")

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL ainda não configurada")
    console.log("👉 Conecte a integração do Neon primeiro!")
    return
  }

  console.log("✅ DATABASE_URL encontrada!")
  console.log("🔗 Testando conexão...")

  try {
    const sql = neon(process.env.DATABASE_URL)
    const result = await sql`SELECT NOW() as current_time`

    console.log("🎉 CONEXÃO ESTABELECIDA!")
    console.log("⏰ Hora do servidor:", result[0].current_time)

    // Verificar tabelas existentes
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `

    console.log("\n📋 Tabelas existentes:")
    tables.forEach((table) => {
      console.log(`  • ${table.table_name}`)
    })

    if (tables.length === 0) {
      console.log("⚠️ Nenhuma tabela encontrada - banco vazio")
      console.log("👉 Execute os scripts de criação das tabelas")
    }
  } catch (error) {
    console.error("❌ Erro na conexão:", error.message)
  }
}

verifyConnection()

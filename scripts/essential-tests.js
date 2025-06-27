// 🧪 TESTES ESSENCIAIS - APENAS O QUE IMPORTA
async function runEssentialTests() {
  console.log("🧪 EXECUTANDO TESTES ESSENCIAIS")
  console.log("===============================")

  const tests = [
    { name: "Database Connection", test: testDatabase },
    { name: "Authentication", test: testAuth },
    { name: "File Upload", test: testBlobStorage },
    { name: "API Endpoints", test: testAPIs },
  ]

  for (const { name, test } of tests) {
    console.log(`\n🔍 Testando: ${name}`)
    try {
      await test()
      console.log(`✅ ${name}: OK`)
    } catch (error) {
      console.log(`❌ ${name}: FALHOU - ${error.message}`)
    }
  }
}

async function testDatabase() {
  const { neon } = await import("@neondatabase/serverless")
  const sql = neon(process.env.DATABASE_URL)

  // Teste básico de conexão
  await sql`SELECT 1 as test`

  // Teste de tabelas essenciais
  const tables = await sql`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name IN ('User', 'Category', 'Equipment', 'Quote')
  `

  if (tables.length < 4) {
    throw new Error(`Tabelas faltando. Encontradas: ${tables.length}/4`)
  }
}

async function testAuth() {
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET não configurado")
  }

  if (!process.env.NEXTAUTH_URL) {
    throw new Error("NEXTAUTH_URL não configurado")
  }
}

async function testBlobStorage() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN não configurado")
  }

  // Teste básico de conectividade (sem upload real)
  const response = await fetch("https://blob.vercel-storage.com", {
    method: "HEAD",
    headers: {
      Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
    },
  })

  if (!response.ok && response.status !== 405) {
    throw new Error(`Blob storage inacessível: ${response.status}`)
  }
}

async function testAPIs() {
  // Teste dos endpoints principais
  const endpoints = ["/api/categories", "/api/equipments", "/api/quotes"]

  for (const endpoint of endpoints) {
    const response = await fetch(`${process.env.NEXTAUTH_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`${endpoint} retornou ${response.status}`)
    }
  }
}

runEssentialTests()

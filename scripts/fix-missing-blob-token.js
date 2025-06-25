// 🚨 DIAGNÓSTICO: BLOB_READ_WRITE_TOKEN AUSENTE
console.log("🔍 VERIFICANDO CONFIGURAÇÃO DO BLOB STORAGE...")

async function checkBlobConfiguration() {
  console.log("\n📋 STATUS DAS VARIÁVEIS:")
  console.log("========================")

  const requiredVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  }

  const missingVars = []

  for (const [key, value] of Object.entries(requiredVars)) {
    if (value) {
      console.log(`✅ ${key}: Configurado`)
    } else {
      console.log(`❌ ${key}: AUSENTE`)
      missingVars.push(key)
    }
  }

  if (missingVars.length > 0) {
    console.log("\n🚨 AÇÃO NECESSÁRIA:")
    console.log("===================")

    if (missingVars.includes("BLOB_READ_WRITE_TOKEN")) {
      console.log("📸 BLOB_READ_WRITE_TOKEN é OBRIGATÓRIO para:")
      console.log("   • Upload de imagens dos equipamentos")
      console.log("   • Funcionamento do admin")
      console.log("   • Cadastro de novos equipamentos")
      console.log("\n🔧 COMO CORRIGIR:")
      console.log("   1. Vá para vercel.com/dashboard")
      console.log("   2. Selecione seu projeto")
      console.log("   3. Vá em Settings > Environment Variables")
      console.log("   4. Adicione BLOB_READ_WRITE_TOKEN")
      console.log("   5. Cole o token do Vercel Blob")
    }

    if (missingVars.includes("NEXTAUTH_URL")) {
      console.log("\n🌐 NEXTAUTH_URL também está ausente!")
      console.log("   • Necessário para autenticação")
      console.log("   • Use: https://seu-dominio.vercel.app")
    }
  } else {
    console.log("\n🎉 TODAS AS VARIÁVEIS CONFIGURADAS!")
  }
}

checkBlobConfiguration()

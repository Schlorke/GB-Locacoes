// Script para verificar e configurar o ambiente
async function setupEnvironment() {
  console.log("🔧 [SETUP-ENV] Configurando ambiente...")

  // Verificar variáveis de ambiente disponíveis
  console.log("📋 Variáveis de ambiente disponíveis:")
  console.log("- DATABASE_URL:", process.env.DATABASE_URL ? "✅ ENCONTRADA" : "❌ NÃO ENCONTRADA")
  console.log("- NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "✅ ENCONTRADA" : "❌ NÃO ENCONTRADA")
  console.log("- NEXTAUTH_URL:", process.env.NEXTAUTH_URL ? "✅ ENCONTRADA" : "❌ NÃO ENCONTRADA")

  if (!process.env.DATABASE_URL) {
    console.log("\n⚠️ AÇÃO NECESSÁRIA:")
    console.log("1. Clique em 'Install Neon' no painel lateral")
    console.log("2. Configure a integração do Neon")
    console.log("3. Execute este script novamente")
    return false
  }

  console.log("\n✅ Ambiente configurado corretamente!")
  return true
}

setupEnvironment()

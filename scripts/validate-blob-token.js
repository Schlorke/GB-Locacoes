// 🔍 VALIDAÇÃO ESPECÍFICA DO BLOB TOKEN
async function validateBlobToken() {
  console.log("🔍 VALIDANDO BLOB_READ_WRITE_TOKEN")
  console.log("=================================")

  const token = process.env.BLOB_READ_WRITE_TOKEN

  if (!token) {
    console.log("❌ BLOB_READ_WRITE_TOKEN não encontrado")
    return false
  }

  // ✅ VERIFICAÇÕES DO TOKEN
  const checks = [
    {
      name: "Formato correto",
      test: () => token.startsWith("vercel_blob_rw_"),
      expected: "Deve começar com 'vercel_blob_rw_'",
    },
    {
      name: "Comprimento adequado",
      test: () => token.length > 50,
      expected: "Deve ter mais de 50 caracteres",
    },
    {
      name: "Caracteres válidos",
      test: () => /^[a-zA-Z0-9_]+$/.test(token),
      expected: "Apenas letras, números e underscore",
    },
  ]

  console.log(`Token encontrado: ${token.substring(0, 30)}...`)
  console.log(`Comprimento: ${token.length} caracteres`)
  console.log("")

  let allValid = true
  for (const { name, test, expected } of checks) {
    const isValid = test()
    console.log(`${isValid ? "✅" : "❌"} ${name}: ${isValid ? "OK" : "FALHOU"}`)
    if (!isValid) {
      console.log(`   Esperado: ${expected}`)
      allValid = false
    }
  }

  if (allValid) {
    console.log("\n🎉 BLOB_READ_WRITE_TOKEN ESTÁ VÁLIDO!")
    console.log("✅ Upload de imagens deve funcionar corretamente")
  } else {
    console.log("\n⚠️  BLOB_READ_WRITE_TOKEN TEM PROBLEMAS")
    console.log("❌ Verifique a configuração no Vercel")
  }

  return allValid
}

validateBlobToken()

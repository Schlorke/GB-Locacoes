#!/bin/bash
# Vercel Build Script
# Este script garante que o Prisma seja configurado corretamente na Vercel

echo "🚀 [Vercel Build] Iniciando setup..."

# Verificar variáveis de ambiente críticas
if [ -z "$DATABASE_URL" ]; then
  echo "❌ [Vercel Build] DATABASE_URL não encontrada!"
  exit 1
fi

if [ -z "$NEXTAUTH_SECRET" ]; then
  echo "❌ [Vercel Build] NEXTAUTH_SECRET não encontrada!"
  exit 1
fi

echo "✅ [Vercel Build] Variáveis de ambiente OK"

# Gerar Prisma Client
echo "🔧 [Vercel Build] Gerando Prisma Client..."
npx prisma generate

# Executar script pós-geração
echo "📝 [Vercel Build] Executando post-prisma-generate..."
node scripts/post-prisma-generate.js

# Verificar se lib/validations/index.ts foi criado
if [ ! -f "lib/validations/index.ts" ]; then
  echo "❌ [Vercel Build] lib/validations/index.ts não foi criado!"
  exit 1
fi

echo "✅ [Vercel Build] lib/validations/index.ts criado com sucesso"

# Executar build do Next.js
echo "🏗️ [Vercel Build] Executando build do Next.js..."
npm run build

echo "🎉 [Vercel Build] Build concluído com sucesso!"

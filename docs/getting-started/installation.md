# 📦 Instalação e Setup - GB Locações

> **Guia completo de instalação, configuração e compatibilidade de
> dependências**

## 📋 Índice

- [🚀 Instalação Rápida](#-instalação-rápida)
- [📋 Pré-requisitos](#-pré-requisitos)
- [⚙️ Configuração Detalhada](#️-configuração-detalhada)
- [🚨 Compatibilidade de Dependências](#-compatibilidade-de-dependências)
- [🔧 Solução de Problemas](#-solução-de-problemas)

---

## 🚀 Instalação Rápida

### ⚡ Setup em 5 Passos

```bash
# 1. Clone o repositório
git clone https://github.com/GBLocacoes/GB-Locacoes.git
cd GB-Locacoes

# 2. Instale as dependências
pnpm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas configurações

# 4. Configure o banco de dados
pnpm db:generate
pnpm db:push
pnpm db:seed

# 5. Inicie o servidor de desenvolvimento
pnpm dev
```

🎉 **Acesse** `http://localhost:3000` e comece a usar!

---

## 📋 Pré-requisitos

### 🔧 Software Necessário

| Software       | Versão Mínima | Recomendada | Download                                      |
| -------------- | ------------- | ----------- | --------------------------------------------- |
| **Node.js**    | 20.0.0        | 20.15.0+    | [nodejs.org](https://nodejs.org/)             |
| **PNPM**       | 10.0.0        | 10.14.0+    | `npm install -g pnpm`                         |
| **Git**        | 2.0.0         | 2.40.0+     | [git-scm.com](https://git-scm.com/)           |
| **PostgreSQL** | 15.0          | 16.0+       | [postgresql.org](https://www.postgresql.org/) |

### ✅ Verificação de Pré-requisitos

```bash
# Verificar todas as versões
node --version    # v20.15.0 ou superior
pnpm --version    # v10.14.0 ou superior
git --version     # v2.40.0 ou superior
psql --version    # PostgreSQL 15+ (se usando local)
```

---

## ⚙️ Configuração Detalhada

### 🔐 Variáveis de Ambiente

Crie o arquivo `.env.local` baseado no `.env.example`:

```env
# =================================================================
# 🗄️ DATABASE
# =================================================================
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
DIRECT_URL="postgresql://username:password@host:port/database?schema=public"

# =================================================================
# ☁️ SUPABASE (Storage e Auth)
# =================================================================
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# =================================================================
# 🔑 NEXTAUTH
# =================================================================
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here-generate-with-openssl"

# =================================================================
# 💳 PAGAMENTOS
# =================================================================
# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Mercado Pago
MERCADO_PAGO_TOKEN="your-mercado-pago-token"

# =================================================================
# 📧 EMAIL
# =================================================================
RESEND_API_KEY="your-resend-api-key"
SENDGRID_API_KEY="your-sendgrid-api-key"

# =================================================================
# 📄 CONTRATOS
# =================================================================
ZAPSIGN_TOKEN="your-zapsign-token"

# =================================================================
# 🚚 LOGÍSTICA
# =================================================================
MELHOR_ENVIO_TOKEN="your-melhor-envio-token"

# =================================================================
# 🔍 LOGS & MONITORING
# =================================================================
LOG_LEVEL="info"
NODE_ENV="development"
```

### 🗄️ Configuração do Banco de Dados

#### **Opção 1: PostgreSQL Local**

```bash
# Instalar PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Criar usuário e banco
sudo -u postgres psql
CREATE USER gblocacoes WITH PASSWORD 'sua-senha-segura';
CREATE DATABASE gblocacoes OWNER gblocacoes;
GRANT ALL PRIVILEGES ON DATABASE gblocacoes TO gblocacoes;
\q

# Configurar .env.local
DATABASE_URL="postgresql://gblocacoes:sua-senha-segura@localhost:5432/gblocacoes?schema=public"
DIRECT_URL="postgresql://gblocacoes:sua-senha-segura@localhost:5432/gblocacoes?schema=public"
```

#### **Opção 2: Supabase (Recomendado)**

1. Acesse [supabase.com](https://supabase.com)
2. Crie novo projeto
3. Vá em **Settings** > **Database**
4. Copie a **Connection string**
5. Configure no `.env.local`

#### **Opção 3: Docker Compose**

```bash
# Usar PostgreSQL via Docker
docker-compose up postgres -d

# As variáveis já estão configuradas no docker-compose.yml
```

### 🎯 Inicialização do Banco

```bash
# Gerar cliente Prisma
pnpm db:generate

# Aplicar schema ao banco
pnpm db:push

# Popular dados iniciais (categorias, admin, etc.)
pnpm db:seed

# Verificar dados (opcional)
pnpm db:studio
```

---

## 🚨 Compatibilidade de Dependências

> ⚠️ **CRÍTICO**: Algumas dependências têm incompatibilidades conhecidas

### 🔴 **Incompatibilidades BLOQUEADORAS**

#### **❌ Prisma 6.14.0 + Next.js 15.4.6**

```bash
# ❌ ERRO que aparece:
Error: @prisma/client did not initialize yet.
Please run "prisma generate" and try to import it again.

# ✅ SOLUÇÃO: Usar NPM para melhor compatibilidade
npm install
```

#### **❌ Tailwind CSS 4.x + Design System**

```bash
# ❌ PROBLEMA: Quebra sistema de design tokens
# ✅ SOLUÇÃO: Manter em 3.4.17 (NÃO ATUALIZAR)
```

### ✅ **Versões Testadas e Estáveis**

| Dependência      | Versão Estável | Status       | Notas                     |
| ---------------- | -------------- | ------------ | ------------------------- |
| **Next.js**      | 15.4.6         | ✅ Estável   | App Router funcionando    |
| **Prisma**       | **Estável**    | ✅ Funcional | ✅ Versão atual           |
| **React**        | 19.1.1         | ✅ Estável   | Sem problemas conhecidos  |
| **TypeScript**   | 5.9.2          | ✅ Estável   | Strict mode habilitado    |
| **Tailwind CSS** | **3.4.17**     | ✅ Estável   | ⚠️ NÃO atualizar para 4.x |

### 🔄 **Processo de Atualização Segura**

```bash
# 1. ✅ SEMPRE testar build após atualizações
pnpm update [packages]
pnpm run build  # <- CRÍTICO: Este passo detecta problemas

# 2. ✅ Atualizar por categorias
# UI Components (Radix UI) - Geralmente seguro
pnpm update @radix-ui/react-*

# Database/ORM - CUIDADO! Testar sempre
pnpm update @prisma/client prisma
pnpm run build  # <- Verificar se funciona

# Framework/Core - MUITO CUIDADO!
# Ler changelog antes de atualizar Next.js, React, etc.

# 3. ✅ Comandos seguros disponíveis
pnpm type-check             # Verificar tipos TypeScript
pnpm check:outdated-safe     # Ver atualizações seguras
pnpm update:safe             # Atualizar apenas dependências seguras
pnpm verify:after-update     # Verificar após atualizações
```

---

## 🔧 Solução de Problemas

### 🚨 **Problemas Comuns**

#### **1. Erro de Prisma "did not initialize yet"**

```bash
# Solução:
npm install
rm -rf node_modules/.prisma
pnpm db:generate
pnpm run build
```

#### **2. Erro de PNPM vs NPM**

```bash
# Problema: Mismatch entre package managers
# Solução: Usar APENAS PNPM
rm -rf node_modules package-lock.json yarn.lock
pnpm install
```

#### **3. Erro de Permissão no Windows**

```bash
# Problema: EPERM durante prisma generate
# Solução:
taskkill /f /im node.exe 2>$null
Remove-Item -Recurse -Force node_modules\.prisma
pnpm db:generate
```

#### **4. Variáveis de Ambiente não Carregadas**

```bash
# Verificar se .env.local existe e está correto
ls -la .env*

# Reiniciar servidor de desenvolvimento
pnpm dev
```

### 📊 **Verificação Pós-Instalação**

```bash
# Checklist completo
pnpm type-check              # ✅ TypeScript
pnpm lint                    # ✅ ESLint
pnpm test                    # ✅ Testes
pnpm build                   # ✅ Build de produção
pnpm db:studio               # ✅ Verificar banco
```

### 🆘 **Precisa de Ajuda?**

- **[troubleshooting.md](./troubleshooting.md)** - Problemas gerais
- **[../guides/prisma.md](../guides/prisma.md)** - Problemas específicos do
  Prisma
- **[development.md](./development.md)** - Configuração de desenvolvimento

---

## 🐳 **Instalação com Docker** (Opcional)

### **Docker Compose (Recomendado)**

```bash
# 1. Clone o repositório
git clone https://github.com/GBLocacoes/GB-Locacoes.git
cd GB-Locacoes

# 2. Configure variáveis (opcional - já tem defaults)
cp .env.example .env.local

# 3. Suba todos os serviços
docker-compose up --build

# 4. Acesse http://localhost:3000
```

### **Docker Manual**

```bash
# Build da imagem
docker build -t gb-locacoes .

# Executar container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  gb-locacoes
```

---

_Última atualização: dezembro 2024_

---

## 🔗 Próximos Passos

Após a instalação bem-sucedida:

1. 📖 **[development.md](./development.md)** - Guia de desenvolvimento
2. 🚀 **[deployment.md](./deployment.md)** - Deploy em produção
3. 🏗️ **[../architecture/overview.md](../architecture/overview.md)** - Entender
   a arquitetura

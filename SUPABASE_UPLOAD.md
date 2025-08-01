# Configuração do Upload de Imagens com Supabase

Este projeto usa **Supabase Storage** para gerenciar uploads de imagens, substituindo a dependência da Vercel Blob.

## 🚀 Setup Rápido

### 1. Configurar Variáveis de Ambiente

Adicione as seguintes variáveis ao seu arquivo `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://seu-projeto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anonima-aqui"
```

### 2. Criar Bucket no Supabase (Automático)

Execute uma das opções abaixo:

#### Opção A: Via API (Recomendado)

```bash
# Primeiro, inicie o servidor
pnpm dev

# Em outro terminal, configure o bucket
curl -X POST http://localhost:3000/api/supabase-setup \
  -H "Content-Type: application/json" \
  -d '{"action": "setup"}'
```

#### Opção B: Manual no Dashboard do Supabase

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá para **Storage** → **Buckets**
3. Clique em **Create bucket**
4. Nome: `gb-locacoes-images`
5. Marque como **Public bucket**
6. Configure os tipos permitidos: `image/jpeg, image/png, image/webp, image/gif`
7. Tamanho máximo: `5MB`

### 3. Testar Upload

```bash
curl -X POST http://localhost:3000/api/supabase-setup \
  -H "Content-Type: application/json" \
  -d '{"action": "test"}'
```

## 📁 Estrutura do Storage

```text
gb-locacoes-images/
└── equipments/
    ├── equipment-uuid-1.jpg
    ├── equipment-uuid-2.png
    └── equipment-uuid-3.webp
```

## 🔧 Funcionalidades

- ✅ Upload seguro com validação de tipo e tamanho
- ✅ Nomes únicos usando UUID
- ✅ URLs públicas automáticas
- ✅ Integração com formulários existentes
- ✅ Tratamento de erros robusto
- ✅ Sem dependência da Vercel Blob

## 📋 Tipos de Arquivo Suportados

- **JPEG** (.jpg, .jpeg)
- **PNG** (.png)
- **WebP** (.webp)
- **GIF** (.gif)

**Tamanho máximo:** 5MB por arquivo

## 🐛 Troubleshooting

### Erro: "Bucket not found"

```bash
# Execute o setup do bucket
curl -X POST http://localhost:3000/api/supabase-setup \
  -H "Content-Type: application/json" \
  -d '{"action": "setup"}'
```

### Erro: "Missing Supabase environment variables"

Verifique se as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão configuradas no `.env.local`.

### Problemas de Permissão

Certifique-se de que o bucket está marcado como **público** no dashboard do Supabase.

## 🚀 Deploy

As variáveis de ambiente devem ser configuradas no seu provedor de hosting
(Vercel, Netlify, etc.) para funcionamento em produção.

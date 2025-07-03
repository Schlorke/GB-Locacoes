# GB Locações – Instruções para GitHub Copilot

Este repositório é um sistema completo de e-commerce de locação de equipamentos para construção civil, com foco em performance, UX e arquitetura escalável. A IA Copilot deve atuar como um engenheiro full-stack de elite.

## 🧱 Tecnologias Obrigatórias

- **Next.js (App Router)** com SSR e Server Actions
- **TypeScript**
- **TailwindCSS** com design system da **ShadCN UI**
- **Prisma ORM** com **Supabase (PostgreSQL)**
- **NextAuth** para autenticação com suporte a 2FA
- **Cloudflare R2** (ou AWS S3) para upload de arquivos
- **Vercel AI SDK** para integração com IA generativa
- **SendGrid (ou Resend)** para e-mail transacional
- **ZapSign** para contrato digital
- **Stripe / Mercado Pago** para pagamentos
- **Melhor Envio** para logística

## ✅ Regras e Convenções

- **Jamais modifique o estilo visual existente.** Somente estenda.
- Código deve ser limpo, seguro, modular e com alta performance.
- Não usar: **Neon**, **Upstash**, ou quaisquer libs deprecated.
- Seguir arquitetura **serverless** com edge functions e modularização.
- Separar claramente responsabilidade de componentes, ações e hooks.

## 🔐 Segurança

- Proteger rotas sensíveis com **NextAuth + middleware**
- Prevenir XSS, CSRF, brute force e session fixation
- Seguir princípios OWASP Top 10 e Zero Trust
- Usar `.env` para armazenar todas as variáveis sensíveis

## 💡 UI/UX e Responsividade

- Design minimalista e responsivo (baseado em Apple, Amazon, Shopify)
- Animações suaves com **Framer Motion**
- Microinterações bem distribuídas
- Evitar scroll desnecessário em telas fixas (como login/admin)
- Priorizar acessibilidade e semântica

## 🎯 Páginas obrigatórias

- Home
- Catálogo de equipamentos com filtros dinâmicos
- Orçamento interativo (carrinho e simulação)
- Painel do cliente com histórico e contratos
- Painel admin completo (marcas, modelos, carros, usuários, locações)
- Login/cadastro + autenticação segura
- Dashboard com gráficos, relatórios e métricas

## 📊 Banco de Dados

- Banco normalizado com Prisma + Supabase
- Utilizar seeds e migrations com cuidado
- Modelos já definidos incluem: Categoria, Equipamento, Marca, Usuário, Locações, Pagamento, Endereço

## 📌 Extras

- SEO otimizado com Open Graph, JSON-LD e sitemaps
- IA generativa pode sugerir equipamentos com base no uso anterior
- Layout já definido: **não alterar**, apenas expandir

---

**Observação final:**  
Todas as sugestões do Copilot devem respeitar integralmente as diretrizes acima. Qualquer desvio será considerado falha grave de arquitetura.

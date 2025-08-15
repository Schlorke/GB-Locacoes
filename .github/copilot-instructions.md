# GB Locações – Instruções para GitHub Copilot

## 📚 **DOCUMENTAÇÃO COMO FONTE DE VERDADE**

> ⚠️ **CRÍTICO**: SEMPRE consulte a documentação em `docs/` antes de implementar
> qualquer funcionalidade

### **📁 Estrutura da Documentação Oficial**

```
📁 docs/                          # CONSULTAR SEMPRE PRIMEIRO
├── 📁 getting-started/           # Setup, desenvolvimento, deploy
│   ├── 📄 installation.md       # Setup inicial + compatibilidade
│   ├── 📄 development.md        # Padrões de desenvolvimento
│   ├── 📄 deployment.md         # Deploy e produção
│   └── 📄 troubleshooting.md    # Soluções de problemas
├── 📁 architecture/              # Arquitetura técnica
│   ├── 📄 overview.md           # Stack + arquitetura completa
│   ├── 📄 api.md                # Documentação das APIs
│   └── 📄 security.md           # Aspectos de segurança
├── 📁 features/                  # Funcionalidades específicas
│   ├── 📄 admin-system.md       # Sistema admin COMPLETO
│   └── 📄 design-system.md      # Identidade visual + componentes
├── 📁 guides/                    # Guias específicos
│   ├── 📄 storybook.md          # Documentação Storybook
│   ├── 📄 accessibility.md      # Melhorias de acessibilidade
│   └── 📄 scroll-reveal.md      # Sistema scroll reveal
├── 📁 references/                # Referências técnicas
│   └── 📄 dependencies.md       # Compatibilidade dependências
└── 📁 internal/                  # Documentação interna
    ├── 📄 cursor-setup.md       # Setup específico Cursor
    ├── 📄 project-decisions.md  # Decisões arquiteturais
    └── 📄 tools.md              # Ferramentas internas
```

### **🧠 Anti-Alucinação Protocol**

1. **📖 LEIA PRIMEIRO**: Antes de qualquer implementação:
   - `docs/architecture/overview.md` - Entender a arquitetura
   - `docs/features/design-system.md` - Componentes e estilos
   - `docs/features/admin-system.md` - Funcionalidades admin
   - `docs/getting-started/development.md` - Padrões de código

2. **🎨 DESIGN SYSTEM**: Use APENAS componentes documentados
3. **⚠️ COMPATIBILIDADE**: Verifique `docs/references/dependencies.md`
4. **🚨 NÃO ALUCINE**: Se não souber, consulte docs/ primeiro
5. **📝 DOCUMENTE SEMPRE**: Atualize `CHANGELOG.md` após alterações

### **🚨 PROBLEMAS CRÍTICOS RESOLVIDOS (DEZ 2024) - NÃO REINTRODUZIR**

> ⚠️ **ATENÇÃO**: Este projeto passou por correções massivas. NÃO reintroduza
> problemas resolvidos!

#### **🏗️ Build Infrastructure - ESTÁVEL**

- **❌ NÃO DELETE**: `scripts/post-prisma-generate.js` - crítico para build
- **❌ NÃO MODIFIQUE**: Scripts em `package.json` sem entender dependências
- **✅ FUNCIONANDO**: Build automation para `lib/validations/index.ts`

#### **🔒 TypeScript - 100% TYPE SAFE**

- **❌ NÃO USE**: Tipos `any` - sempre crie interfaces específicas
- **✅ USE**: Safe navigation (`?.`) em objetos potencialmente undefined
- **✅ USE**: Type guards e casts seguros (`as NextResponse`, `as const`)

#### **📦 Dependencies - MATRIX ESTÁVEL**

- **❌ NÃO ATUALIZE**: Prisma para 6.14.0+ (quebra build)
- **❌ NÃO USE**: swagger-ui-react (incompatível React 19)
- **✅ CUSTOM IMPLEMENTATION**: `app/api-docs/page.tsx` para API docs

#### **🎯 ESLint - ZERO PROBLEMS**

- **❌ NÃO INCLUA**: Arquivos auto-gerados no linting
- **✅ MANTENHA**: Exclusões em `tsconfig.json` para
  `lib/validations/schemas/**`

#### **📚 DOCUMENTAÇÃO CRÍTICA**

- **📖 LEIA**: `docs/internal/critical-issues-resolved.md` antes de mudanças
  grandes
- **📝 CONSULTE**: `docs/getting-started/troubleshooting.md` para problemas
  conhecidos

Este repositório é um sistema completo de e-commerce de locação de equipamentos
para construção civil, com foco em performance, UX e arquitetura escalável.

---

## 🧱 Tecnologias Obrigatórias

- **Next.js (App Router)** com SSR, ISR e Server Actions
- **TypeScript**
- **TailwindCSS** com design system da **ShadCN UI**
- **Prisma ORM** com **Supabase (PostgreSQL)**
- **NextAuth** com suporte a autenticação 2FA
- **Cloudflare R2** (ou AWS S3) para upload de arquivos
- **SendGrid** (ou Resend) para e-mail transacional
- **ZapSign** para contrato digital
- **Stripe / Mercado Pago** para pagamentos
- **Melhor Envio** para logística
- **Vercel AI SDK** para integração com IA generativa

---

## 📁 Estrutura esperada

- **`app/`**: páginas e rotas (App Router)
- **`components/`**: componentes reutilizáveis
- **`lib/`**: integrações externas e utilidades (mocks inclusos)
- **`types/`**: tipagens globais
- **`schemas/`**: validações com Zod
- **`middlewares/`**: controle de acesso, autenticação, logs
- **`prisma/`**: banco de dados e seed
- **`public/`**: arquivos estáticos

---

## ✅ Regras e Convenções

- **Jamais modifique o estilo visual, animações ou layout existentes.** → Apenas
  estenda ou componha.
- Código deve ser limpo, seguro, modular, performático e com tipagem estrita.
- Não usar: **Upstash** ou quaisquer libs deprecated.
- Separar componentes, actions e hooks por responsabilidade.
- Evitar lógica duplicada em múltiplas rotas.
- Usar `zod` para validação de dados e formular entradas confiáveis.
- Utilizar middlewares para controle de permissão (admin/cliente).
- **📝 OBRIGATÓRIO**: Atualizar `CHANGELOG.md` após toda implementação.

---

## 🔥 Foco acessível (padrão azul)

Todo elemento interativo **DEVE** mostrar feedback de foco em azul:

- **Borda**: Utilize **`focus:border-blue-500`** **e/ou**
  `focus:outline-blue-500 focus:outline-2`.
- **Padrão**: Nunca deixe o navegador aplicar apenas o cinza padrão.
- **Ring**: `focus:ring` deve ficar **desativado** (`focus:ring-0`) salvo
  exceções de design.

Exemplo canônico:

```tsx
<input className="border-gray-200 focus:border-blue-500 focus:outline-blue-500 focus:outline-2 focus:ring-0" />
```

### Regra global (Tailwind Layer Base)

```css
@layer base {
  input:not([type="checkbox"]):not([type="radio"]),
  select,
  textarea {
    @apply border-gray-200 focus:border-blue-500 focus:outline-blue-500 focus:outline-2 focus:ring-0;
  }
}
```

---

## 🔐 Segurança

- **NextAuth**: Utilizar `NextAuth` com `getServerSession()` em rotas protegidas
- **2FA**: Autenticação com 2FA e validação de token
- **Ataques**: Prevenir XSS, CSRF, brute force e session fixation
- **OWASP**: Seguir OWASP Top 10 e princípios Zero Trust
- **Variáveis**: Armazenar variáveis sensíveis apenas no `.env`

---

## 🧪 Testes, CI/CD e qualidade

- **Vitest**: Testes com **Vitest**
- **Cobertura**: Cobertura com `--coverage`
- **CI/CD**: CI via GitHub Actions (`.github/workflows/test.yml`)
- **Lint**: Lint + Prettier obrigatórios antes de cada commit/PR
- **Commits**: Commit semântico: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`

---

## 🐳 Docker

```bash
docker-compose up --build
```

- Imagens configuradas com multi-stage para build otimizado
- `.env.docker` define ambiente de execução para container

---

## 💡 UI/UX e Responsividade

- **Design**: Baseado em benchmarks: **Apple**, **Amazon**, **Shopify**
- **Animações**: Suaves com **Framer Motion**
- **Microinterações**: Distribuídas com propósito
- **UX**: Telas com UX fluido (sem scroll vertical desnecessário)
- **Acessibilidade**: Alta acessibilidade: uso de elementos semânticos e
  navegação por teclado

---

## 📄 Documentação e Inteligência Artificial

- **AGENTS.md**: Leia `AGENTS.md` para instruções detalhadas de atuação da IA
- **Foco da IA**: A IA Copilot deve focar em:
  - **Criação**: De novos arquivos/componentes
  - **Mocks**: Geração de mocks (ZapSign, Stripe, etc.)
  - **Refatoração**: De lógica
  - **Testes**: E cobertura
- **Restrição**: **Não** deve interferir no design, layout ou animações
  existentes

---

## 📊 Banco de Dados

- **ORM**: Estruturado com Prisma e Supabase
- **Tabelas**: Principais: Categoria, Equipamento, Marca, Modelo, Usuário,
  Locação, Endereço, Pagamento, Contrato
- **Seeds**: Uso de seeds em `prisma/seed.ts`

---

## 🎯 Funcionalidades principais

- **Catálogo**: Com filtros dinâmicos
- **Orçamento**: Interativo com carrinho
- **Painel Cliente**: Com histórico e contratos
- **Painel Admin**: CRUD completo
- **Autenticação**: Login/cadastro com autenticação segura
- **Dashboard**: Administrativo com métricas

---

**❗ Observação final:** Todas as sugestões do Copilot devem seguir
rigorosamente estas diretrizes. O feedback de foco **deve** ser azul; qualquer
sugestão que descumpra as regras acima deve ser considerada inválida.

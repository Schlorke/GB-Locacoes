# 🔧 Ferramentas para Documentação de API e Orientação da IA

> **Baseado em pesquisa realizada em dezembro 2024**

## 📄 **Documentação Automática de APIs (OpenAPI/Swagger)**

### **Problema Identificado**

Uma documentação de API bem estruturada é fundamental tanto para desenvolvedores
humanos quanto para evitar que IAs "alucinem" funcionalidades inexistentes.

### **Solução: OpenAPI/Swagger**

A adoção do OpenAPI (Swagger) permite descrever todas as rotas, parâmetros,
esquemas de dados e respostas de forma padronizada e legível.

### **Ferramentas Recomendadas para GB-Locações**

#### **1. next-openapi-gen**

- **Propósito**: Geração automática para Next.js App Router
- **Vantagens**:
  - Escaneia rotas dinâmicas (`route.ts`)
  - Interpreta schemas Zod e tipos TypeScript
  - Interface visual incluída (Swagger UI, Redoc, Stoplight)
- **Implementação**: Comentários JSDoc + comando de geração
- **Resultado**: Arquivo JSON/YAML OpenAPI servido em `/api-docs`

#### **2. ts-rest (TypeScript REST)**

- **Propósito**: Contratos de API centralizados
- **Vantagem**: Definição única gera rotas + documentação
- **Ideal para**: Projetos que preferem contract-first approach

### **Benefícios para GB-Locações**

- ✅ Padrão conhecido por IAs
- ✅ Integração com Zod (validação + documentação)
- ✅ Interface interativa para testes
- ✅ Sincronização automática código-documentação

---

## 🤖 **Orientação da IA com Contexto Estruturado**

### **Estratégia Anti-Alucinação**

Fornecer máximo de contexto estruturado através de:

#### **1. Exposição da Especificação OpenAPI**

- IAs treinadas reconhecem formato OpenAPI
- ChatGPT plugins utilizam OpenAPI para entender APIs
- Arquivo `openapi.json` no repositório = "context injection"

#### **2. Integração com Ferramentas Existentes**

- **AGENTS.md** já existe na raiz
- **GitHub Copilot** considera arquivos do repositório
- **Cursor/VSCode** podem usar contexto de documentação

#### **3. Configuração de Prompts Inteligentes**

- Carregar partes da documentação OpenAPI antes da geração
- Uso de LangChain com agente específico para APIs OpenAPI
- Referencias no AGENTS.md apontando para documentação

### **Implementação no GB-Locações**

```markdown
// Adicionar no AGENTS.md

### 📊 API Documentation

- OpenAPI Spec: [`/api/openapi.json`](/api/openapi.json)
- Interactive Docs: [`/api-docs`](/api-docs)
- SEMPRE consulte a spec antes de implementar endpoints
```

---

## 🔄 **Sincronização de Schemas (Zod, Prisma e OpenAPI)**

### **Single Source of Truth**

```
Prisma Schema → Zod Schemas → OpenAPI Spec → TypeScript Types
```

### **Ferramentas de Sincronização**

#### **1. prisma-zod-generator**

- **Função**: Gera schemas Zod a partir do Prisma
- **Comando**: `npx prisma generate`
- **Resultado**: Objetos Zod automáticos para todos os models

#### **2. zod-openapi**

- **Função**: Converte schemas Zod em JSON Schema (OpenAPI)
- **Vantagem**: Validações min/max automaticamente documentadas
- **Uso**: `z.string().email().openapi({ description: "Email do usuário" })`

#### **3. openapi-typescript**

- **Função**: Gera tipos TypeScript a partir de OpenAPI
- **Uso**: Cliente tipado para front-end

### **Fluxo Proposto para GB-Locações**

```typescript
// 1. Prisma Schema (fonte de verdade)
model Equipment {
  id          Int     @id @default(autoincrement())
  name        String
  description String?
  price       Decimal
}

// 2. Zod Schema (gerado automaticamente)
export const EquipmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number()
})

// 3. OpenAPI (gerado do Zod)
// 4. TypeScript Types (inferidos do Zod)
type Equipment = z.infer<typeof EquipmentSchema>
```

---

## 🧪 **Integração de Testes Automatizados da API**

### **Contract Testing**

Testes baseados na especificação OpenAPI garantem conformidade.

#### **Ferramentas Recomendadas**

**1. Schemathesis**

- **Função**: Property-based testing sobre OpenAPI
- **Vantagem**: Gera milhares de casos de teste automaticamente
- **Uso**: `schemathesis run --stateful=links openapi.json`

**2. Dredd**

- **Função**: Valida implementação vs especificação
- **Uso**: `dredd openapi.yml http://localhost:3000`

**3. Jest + OpenAPI**

- **Função**: Testes de integração baseados na spec
- **Implementação**: Iterar sobre paths e testar cada endpoint

### **Integração CI/CD**

```yaml
# .github/workflows/api-tests.yml
- name: Generate OpenAPI
  run: pnpm openapi:generate

- name: Test API Contract
  run: pnpm test:contract

- name: Validate OpenAPI
  run: pnpm openapi:lint
```

---

## ⚡ **Performance e Experiência de Desenvolvimento**

### **Principios de Performance**

- ✅ Geração em **build time**, não runtime
- ✅ Documentação servida como **asset estático**
- ✅ **Zero configuração** complexa
- ✅ **Hot reload** em desenvolvimento

### **Configuração Recomendada**

```json
// package.json
{
  "scripts": {
    "openapi:generate": "next-openapi-gen",
    "openapi:dev": "next-openapi-gen --watch",
    "docs:serve": "next dev"
  }
}
```

### **DX (Developer Experience)**

- Auto-detecção de rotas e schemas
- Integração com TypeScript para validação
- Hot-reload da documentação em desenvolvimento
- Lint de qualidade OpenAPI no CI

---

## 🔐 **Documentação de Autenticação e Autorização**

### **OpenAPI Security Schemes**

```yaml
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: "JWT token obtido via NextAuth"

paths:
  /api/admin/equipments:
    get:
      security:
        - BearerAuth: []
      summary: "Lista equipamentos (ADMIN only)"
      description: "Requer token de admin válido"
```

### **Documentação de Roles**

```typescript
/**
 * @openapi
 * /api/admin/categories:
 *   post:
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     description: |
 *       **Requer Role: ADMIN**
 *
 *       Cria nova categoria de equipamento.
 *       Middleware: requireAdmin
 */
```

### **Exemplos de Autenticação**

- Endpoint de login documentado
- Exemplos de headers de autenticação
- Códigos de erro 401/403 especificados
- Fluxo completo de obtenção de token

---

## 📊 **Monitoramento e Analytics de Uso da API**

### **Estratégia de Observabilidade**

#### **1. OpenTelemetry + Prometheus + Grafana**

```typescript
// middleware/telemetry.ts
import { trace, metrics } from "@opentelemetry/api"

export function apiTelemetry(req: NextRequest) {
  const span = trace.getActiveSpan()
  span?.setAttributes({
    "api.endpoint": req.url,
    "api.method": req.method,
    "user.role": getUserRole(req)
  })
}
```

#### **2. Métricas Customizadas**

- Chamadas por endpoint
- Tempos de resposta
- Taxa de erro por role
- Uso de features (quotes, uploads, etc.)

#### **3. Dashboard Admin**

```typescript
// Métricas expostas para IAs
interface APIMetrics {
  "/api/quotes": {
    dailyAverage: 100
    errorRate: 0.1
    avgResponseTime: "150ms"
  }
}
```

### **Benefícios para Orientação de IA**

- Contexto de uso real da API
- Identificação de endpoints problemáticos
- Priorização baseada em dados
- Feedback loop para melhorias

---

## 🎯 **Plano de Implementação para GB-Locações**

### **Fase 1: Setup Básico (Semana 1)**

1. **Instalar next-openapi-gen**
2. **Configurar geração automática**
3. **Adicionar JSDoc básico nas rotas principais**
4. **Setup Swagger UI em `/api-docs`**

### **Fase 2: Sincronização (Semana 2)**

1. **Instalar prisma-zod-generator**
2. **Migrar validações para Zod gerado**
3. **Integrar zod-openapi nas rotas**
4. **Atualizar AGENTS.md com referencias**

### **Fase 3: Testes e Segurança (Semana 3)**

1. **Setup Schemathesis para contract testing**
2. **Documentar esquemas de autenticação**
3. **Adicionar examples de uso**
4. **Configurar CI/CD para validação**

### **Fase 4: Monitoramento (Semana 4)**

1. **Implementar OpenTelemetry**
2. **Setup dashboard de métricas**
3. **Configurar alertas básicos**
4. **Documentar analytics no admin**

---

## 📚 **Referências e Fontes**

1. **next-openapi-gen**: [GitHub](https://github.com/tazo90/next-openapi-gen)
2. **Zod + OpenAPI Guide**:
   [Speakeasy](https://www.speakeasy.com/openapi/frameworks/zod)
3. **prisma-zod-generator**:
   [GitHub](https://github.com/omar-dulaimi/prisma-zod-generator)
4. **Schemathesis**: [Docs](https://schemathesis.readthedocs.io/)
5. **API Analytics Guide**:
   [Moesif Blog](https://www.moesif.com/blog/api-analytics/)

---

_Última atualização: dezembro 2024_

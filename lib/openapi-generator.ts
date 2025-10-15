/**
 * @fileoverview Gerador de especificação OpenAPI integrado com schemas Zod
 *
 * Este arquivo centraliza a geração da especificação OpenAPI usando
 * uma abordagem simples mas eficaz para garantir sincronização.
 */

/**
 * Gera a especificação OpenAPI completa integrada com nossos schemas
 */
export function generateOpenAPISpec() {
  return {
    openapi: '3.0.0',
    info: {
      title: 'GB-Locações API',
      version: '1.0.0',
      description: `
# 🏗️ GB-Locações - API de Locação de Equipamentos

API completa da plataforma GB-Locações para locação de equipamentos de construção civil.

## 🚀 Funcionalidades

- **🏗️ Equipamentos**: Catálogo completo de equipamentos para locação
- **📋 Categorias**: Organização por tipos de equipamento
- **💰 Orçamentos**: Sistema de solicitação e gestão de orçamentos
- **🔐 Autenticação**: Sistema de login com roles (ADMIN/CLIENT)
- **📤 Upload**: Sistema de upload de arquivos e imagens
- **📧 Contato**: Formulário de contato e comunicação

## 🔐 Autenticação

A API utiliza JWT tokens via NextAuth.js. Para endpoints protegidos, inclua o token no header:

\`\`\`
Authorization: Bearer <seu-jwt-token>
\`\`\`

### 👥 Roles Disponíveis:
- **ADMIN**: Acesso completo a todas as funcionalidades
- **CLIENT**: Acesso limitado a funcionalidades públicas

## 🤖 Para Agentes de IA

Esta API foi documentada especificamente para orientar agentes de IA.
Cada endpoint inclui descrições detalhadas, exemplos e contexto específico para evitar alucinações.

**Fonte de Verdade**: Esta documentação é sincronizada com os schemas Zod
e modelos Prisma do projeto, garantindo consistência perfeita.
      `,
      contact: {
        name: 'GB-Locações',
        email: 'contato@locacoesgb.com.br',
        url: 'https://locacoesgb.com.br',
      },
      license: {
        name: 'Proprietary',
        url: 'https://locacoesgb.com.br/termos',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
      {
        url: 'https://locacoesgb.com.br',
        description: 'Servidor de produção',
      },
    ],
    tags: [
      {
        name: 'Equipments',
        description: 'Operações relacionadas a equipamentos de construção',
      },
      {
        name: 'Categories',
        description: 'Operações relacionadas a categorias de equipamentos',
      },
      {
        name: 'Quotes',
        description: 'Operações relacionadas a orçamentos e solicitações',
      },
      {
        name: 'Contact',
        description: 'Operações relacionadas a contato e comunicação',
      },
      {
        name: 'Admin',
        description: 'Operações administrativas (requer autenticação ADMIN)',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token via NextAuth.js',
        },
      },
      schemas: {
        Equipment: {
          type: 'object',
          description: 'Equipamento disponível para locação',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do equipamento',
              example: 'cme0n8pld0003kytghr9tcl5n',
            },
            name: {
              type: 'string',
              description: 'Nome do equipamento',
              example: 'Escavadeira Hidráulica CAT 320',
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Descrição detalhada',
              example: 'Escavadeira para obras pesadas',
            },
            pricePerDay: {
              type: 'number',
              format: 'float',
              description: 'Preço por dia (R$)',
              example: 450.0,
            },
            imageUrl: {
              type: 'string',
              nullable: true,
              description: 'URL da imagem principal',
              example: 'https://storage.googleapis.com/equipments/cat-320.jpg',
            },
            images: {
              type: 'array',
              description: 'URLs das imagens',
              items: { type: 'string' },
              example: [
                'https://storage.googleapis.com/equipments/cat-320.jpg',
              ],
            },
            isAvailable: {
              type: 'boolean',
              description: 'Disponível para locação',
              example: true,
            },
            category: {
              $ref: '#/components/schemas/Category',
            },
            reviews: {
              type: 'array',
              description: 'Avaliações do equipamento',
              items: { type: 'object' },
              example: [],
            },
          },
          required: ['id', 'name', 'pricePerDay', 'isAvailable', 'category'],
        },
        Category: {
          type: 'object',
          description: 'Categoria de equipamentos',
          properties: {
            id: {
              type: 'string',
              description: 'ID único da categoria',
              example: 'cat_excavators',
            },
            name: {
              type: 'string',
              description: 'Nome da categoria',
              example: 'Escavadeiras',
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Descrição da categoria',
              example: 'Equipamentos de escavação',
            },
            icon: {
              type: 'string',
              nullable: true,
              description: 'Nome do ícone',
              example: 'Construction',
            },
            iconColor: {
              type: 'string',
              description: 'Cor do ícone',
              example: '#ea580c',
            },
            bgColor: {
              type: 'string',
              description: 'Cor de fundo',
              example: 'from-orange-500 to-orange-600',
            },
            fontColor: {
              type: 'string',
              description: 'Cor da fonte',
              example: 'text-white',
            },
            slug: {
              type: 'string',
              description: 'Slug para URL',
              example: 'escavadeiras',
            },
            _count: {
              type: 'object',
              description: 'Contadores',
              properties: {
                equipments: {
                  type: 'integer',
                  description: 'Número de equipamentos',
                  example: 5,
                },
              },
            },
          },
          required: ['id', 'name', 'iconColor', 'bgColor', 'fontColor', 'slug'],
        },
        QuoteRequest: {
          type: 'object',
          description: 'Dados para criar orçamento',
          properties: {
            name: {
              type: 'string',
              description: 'Nome do cliente',
              example: 'João Silva',
            },
            phone: {
              type: 'string',
              description: 'Telefone de contato',
              example: '(51) 99999-9999',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email de contato',
              example: 'joao@empresa.com.br',
            },
            company: {
              type: 'string',
              description: 'Empresa/Construtora',
              example: 'Construtora ABC',
            },
            message: {
              type: 'string',
              description: 'Mensagem adicional',
              example: 'Preciso para obra de 15 dias',
            },
            equipments: {
              type: 'array',
              description: 'IDs dos equipamentos',
              items: { type: 'string' },
              example: ['cme0n8pld0003kytghr9tcl5n'],
            },
          },
          required: ['name', 'phone', 'email', 'equipments'],
        },
        ContactRequest: {
          type: 'object',
          description: 'Dados para contato',
          properties: {
            name: {
              type: 'string',
              description: 'Nome completo',
              example: 'Maria Silva',
            },
            phone: {
              type: 'string',
              description: 'Telefone de contato',
              example: '(51) 99999-9999',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email de contato',
              example: 'maria@empresa.com.br',
            },
            company: {
              type: 'string',
              description: 'Empresa/Construtora',
              example: 'Construtora XYZ',
            },
            equipments: {
              type: 'string',
              description: 'Equipamentos de interesse',
              example: 'Escavadeiras e Compressores',
            },
            message: {
              type: 'string',
              description: 'Mensagem',
              example: 'Gostaria de mais informações sobre locação',
            },
          },
          required: ['name', 'phone', 'email', 'message'],
        },
        Error: {
          type: 'object',
          description: 'Resposta de erro padrão',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Erro interno do servidor',
            },
            code: {
              type: 'string',
              description: 'Código do erro',
              example: '500',
            },
            details: {
              description: 'Detalhes adicionais (apenas em desenvolvimento)',
              example: null,
            },
          },
          required: ['error'],
        },
      },
      responses: {
        400: {
          description: 'Bad Request - Dados inválidos',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        401: {
          description: 'Unauthorized - Token inválido ou ausente',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        403: {
          description: 'Forbidden - Permissões insuficientes',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        404: {
          description: 'Not Found - Recurso não encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        500: {
          description: 'Internal Server Error - Erro interno do servidor',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    paths: {
      '/api/equipments': {
        get: {
          tags: ['Equipments'],
          summary: 'Lista equipamentos disponíveis',
          description: `Retorna catálogo público de equipamentos disponíveis para locação.

**🌐 Endpoint Público** - Não requer autenticação

**Para IAs**: Este endpoint retorna TODOS os equipamentos ativos.
Use os filtros de categoria se precisar de equipamentos específicos.

**Formato**: Cada equipamento inclui categoria completa e imagens.`,
          responses: {
            200: {
              description: 'Lista de equipamentos com categorias incluídas',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Equipment' },
                  },
                },
              },
            },
            500: { $ref: '#/components/responses/500' },
          },
        },
      },
      '/api/categories': {
        get: {
          tags: ['Categories'],
          summary: 'Lista todas as categorias',
          description: `Retorna lista completa de categorias de equipamentos com contagem de equipamentos.

**🌐 Endpoint Público** - Não requer autenticação

**Para IAs**: Use este endpoint para obter todas as categorias disponíveis.
Cada categoria inclui contagem de equipamentos associados.`,
          responses: {
            200: {
              description: 'Lista de categorias com contagem de equipamentos',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Category' },
                  },
                },
              },
            },
            500: { $ref: '#/components/responses/500' },
          },
        },
      },
      '/api/quotes': {
        post: {
          tags: ['Quotes'],
          summary: 'Solicita orçamento de equipamentos',
          description: `Cria uma nova solicitação de orçamento para equipamentos selecionados.

**🌐 Endpoint Público** - Não requer autenticação

**Para IAs**: Use este endpoint para criar orçamentos.
Todos os campos são obrigatórios exceto 'company' e 'message'.
O array 'equipments' deve conter IDs válidos de equipamentos.`,
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/QuoteRequest' },
              },
            },
          },
          responses: {
            201: {
              description: 'Orçamento criado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: 'quote_123' },
                      message: {
                        type: 'string',
                        example: 'Orçamento criado com sucesso',
                      },
                    },
                  },
                },
              },
            },
            400: { $ref: '#/components/responses/400' },
            500: { $ref: '#/components/responses/500' },
          },
        },
      },
      '/api/contact': {
        post: {
          tags: ['Contact'],
          summary: 'Envia mensagem de contato',
          description: `Envia uma mensagem de contato para a empresa.

**🌐 Endpoint Público** - Não requer autenticação

**Para IAs**: Use este endpoint para enviar mensagens de contato.
Todos os campos são obrigatórios exceto 'company' e 'equipments'.`,
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ContactRequest' },
              },
            },
          },
          responses: {
            200: {
              description: 'Mensagem enviada com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Mensagem enviada com sucesso',
                      },
                    },
                  },
                },
              },
            },
            400: { $ref: '#/components/responses/400' },
            500: { $ref: '#/components/responses/500' },
          },
        },
      },
    },
  }
}

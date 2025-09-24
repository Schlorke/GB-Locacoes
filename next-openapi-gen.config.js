/** @type {import('next-openapi-gen').NextOpenApiGenConfig} */
module.exports = {
  // Pastas onde estão as rotas da API
  schemaFolders: ['app/api'],

  // Onde salvar o arquivo OpenAPI gerado
  outputDir: './public',
  outputFile: 'openapi.json',

  // Configurações do servidor
  includeServer: true,
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development',
    },
    {
      url: 'https://locacoesgb.com.br',
      description: 'Production',
    },
  ],

  // Informações da API
  openapi: '3.0.0',
  info: {
    title: 'GB-Locações API',
    version: '1.0.0',
    description: `
      API completa da plataforma GB-Locações para locação de equipamentos de construção civil.
      
      ## Funcionalidades
      
      - 🏗️ **Equipamentos**: Catálogo completo de equipamentos para locação
      - 📋 **Categorias**: Organização por tipos de equipamento
      - 💰 **Orçamentos**: Sistema de solicitação e gestão de orçamentos
      - 🔐 **Autenticação**: Sistema de login com roles (ADMIN/CLIENT)
      - 📤 **Upload**: Sistema de upload de arquivos e imagens
      - 📧 **Contato**: Formulário de contato e comunicação
      
      ## Autenticação
      
      A API utiliza JWT tokens via NextAuth.js. Para endpoints protegidos, 
      inclua o token no header: \`Authorization: Bearer <token>\`
      
      ### Roles Disponíveis:
      - **ADMIN**: Acesso completo a todas as funcionalidades
      - **CLIENT**: Acesso limitado a funcionalidades públicas
    `,
    contact: {
      name: 'GB-Locações',
      url: 'https://locacoesgb.com.br',
      email: 'contato@gb-locacoes.com',
    },
  },

  // Tags para organização
  tags: [
    {
      name: 'Auth',
      description: 'Endpoints de autenticação e autorização',
    },
    {
      name: 'Equipments',
      description: 'Operações relacionadas a equipamentos',
    },
    {
      name: 'Categories',
      description: 'Operações relacionadas a categorias',
    },
    {
      name: 'Quotes',
      description: 'Sistema de orçamentos e solicitações',
    },
    {
      name: 'Upload',
      description: 'Upload de arquivos e imagens',
    },
    {
      name: 'Contact',
      description: 'Formulário de contato',
    },
    {
      name: 'Admin',
      description: 'Endpoints administrativos (requer ADMIN role)',
    },
  ],

  // Configurações de segurança
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: `
          Token JWT obtido via NextAuth.js
          
          **Para obter o token:**
          1. Faça login via \`/api/auth/signin\`
          2. Use o token retornado no header: \`Authorization: Bearer <token>\`
          
          **Roles disponíveis:** ADMIN, CLIENT
        `,
      },
    },
  },
}

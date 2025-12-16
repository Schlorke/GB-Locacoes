# 🔄 Script de Migração de Storage Supabase

> **Script utilitário para migrar arquivos entre projetos Supabase**

## 📋 Visão Geral

O script `scripts/migrate-storage.js` é uma ferramenta de migração que copia
**todos os arquivos** de um bucket Supabase antigo para um novo, preservando:

- ✅ Estrutura completa de diretórios
- ✅ Nomes de arquivos originais
- ✅ Caminhos relativos (paths)
- ✅ Conteúdo binário dos arquivos

## 🎯 Casos de Uso

### 1. Migração entre Projetos Supabase

**Cenário**: Você precisa migrar de um projeto Supabase de teste para produção.

```bash
# Configure as variáveis de ambiente
SUPABASE_URL_OLD=https://projeto-teste.supabase.co
SUPABASE_SERVICE_ROLE_KEY_OLD=eyJhbGc...
SUPABASE_URL_NEW=https://projeto-producao.supabase.co
SUPABASE_SERVICE_ROLE_KEY_NEW=eyJhbGc...

# Execute a migração
node scripts/migrate-storage.js
```

### 2. Backup Completo do Storage

**Cenário**: Fazer backup completo antes de mudanças críticas.

```bash
# Configure projeto atual como "OLD" e backup como "NEW"
# Execute o script para criar cópia completa
```

### 3. Replicação entre Contas

**Cenário**: Replicar bucket entre contas Supabase diferentes.

```bash
# Configure origem e destino
# Execute para replicar estrutura completa
```

## ⚙️ Configuração

### Variáveis de Ambiente Obrigatórias

Adicione ao seu `.env`:

```env
# Projeto Supabase ANTIGO (origem)
SUPABASE_URL_OLD=https://seu-projeto-antigo.supabase.co
SUPABASE_SERVICE_ROLE_KEY_OLD=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Projeto Supabase NOVO (destino)
SUPABASE_URL_NEW=https://seu-projeto-novo.supabase.co
SUPABASE_SERVICE_ROLE_KEY_NEW=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Onde Encontrar as Credenciais

1. **SUPABASE_URL**: Dashboard do Supabase → Settings → API → Project URL
2. **SERVICE_ROLE_KEY**: Dashboard do Supabase → Settings → API → Service Role
   Key

⚠️ **ATENÇÃO**: Service Role Key tem **permissões totais** - nunca exponha em
código público!

## 🚀 Execução

### Comando Básico

```bash
node scripts/migrate-storage.js
```

### Saída Esperada

```
Migrado: equipamentos/betoneira-01.jpg
Migrado: equipamentos/compressor-02.jpg
Migrado: categorias/ferramentas/icon.png
...
✅ Migração COMPLETA finalizada
```

## 🔍 Como Funciona

### Fluxo de Execução

```
1. Inicia na raiz do bucket (path = '')
   ↓
2. Lista todos os itens na pasta atual
   ↓
3. Para cada item:
   ├─ Se é ARQUIVO → Download do antigo + Upload no novo
   └─ Se é PASTA → Chama migrateFolder() recursivamente
   ↓
4. Repete até processar TODAS as pastas e arquivos
   ↓
5. Exibe mensagem de conclusão
```

### Detalhes Técnicos

- **Recursão**: O script entra em todas as subpastas automaticamente
- **Limite de listagem**: 1000 itens por página (padrão Supabase)
- **Upsert**: Arquivos existentes são **sobrescritos** (`upsert: true`)
- **Tratamento de erros**: Erros individuais não interrompem a migração completa
- **Logs**: Cada arquivo migrado é logado para acompanhamento

## ⚠️ Avisos Importantes

### 1. Bucket Deve Existir em Ambos Projetos

O bucket `gb-locacoes-images` **deve existir** em:

- ✅ Projeto Supabase ANTIGO (origem)
- ✅ Projeto Supabase NOVO (destino)

**Como criar o bucket**:

1. Dashboard Supabase → Storage
2. Clique em "New bucket"
3. Nome: `gb-locacoes-images`
4. Público: Sim (se necessário)

### 2. Service Role Keys Têm Permissões Totais

⚠️ **NUNCA** commite Service Role Keys no Git!

- Use `.env` (já está no `.gitignore`)
- Rotacione as keys regularmente
- Revogue keys antigas após migração

### 3. Arquivos Existentes São Sobrescritos

O script usa `upsert: true`, então:

- ✅ Arquivos novos são criados
- ⚠️ Arquivos existentes são **sobrescritos** (sem aviso)

### 4. Migração Pode Demorar

Dependendo do tamanho do bucket:

- 📁 Poucos arquivos: segundos
- 📁 Muitos arquivos: minutos ou horas
- 📁 Arquivos grandes: pode demorar bastante

**Dica**: Monitore os logs para acompanhar o progresso.

## 🐛 Troubleshooting

### Erro: "Bucket not found"

**Causa**: Bucket não existe em um dos projetos.

**Solução**:

1. Verifique se o bucket `gb-locacoes-images` existe em ambos projetos
2. Verifique se o nome está correto (case-sensitive)
3. Crie o bucket se não existir

### Erro: "Invalid API key"

**Causa**: Service Role Key inválida ou expirada.

**Solução**:

1. Verifique se copiou a key completa (sem espaços)
2. Gere uma nova Service Role Key no dashboard
3. Atualize o `.env` com a nova key

### Erro: "Permission denied"

**Causa**: Service Role Key não tem permissões suficientes.

**Solução**:

1. Use **Service Role Key** (não anon key)
2. Verifique se a key está ativa no dashboard
3. Regenerar a key se necessário

### Erro: "Network error" ou timeout

**Causa**: Problemas de conexão ou arquivos muito grandes.

**Solução**:

1. Verifique sua conexão com internet
2. Tente executar novamente (script continua de onde parou)
3. Para arquivos muito grandes, considere migração manual

### Migração Parcial (alguns arquivos falharam)

**Causa**: Erros individuais não interrompem o processo.

**Solução**:

1. Verifique os logs para identificar arquivos com erro
2. Execute o script novamente (upsert sobrescreve)
3. Para arquivos específicos, migre manualmente

## 📊 Monitoramento

### Logs de Sucesso

```
Migrado: equipamentos/betoneira-01.jpg
Migrado: equipamentos/compressor-02.jpg
✅ Migração COMPLETA finalizada
```

### Logs de Erro

```
Erro ao baixar equipamentos/arquivo-corrompido.jpg Error: ...
Erro ao subir categorias/pasta/arquivo.jpg Error: ...
```

**Nota**: Erros individuais não interrompem a migração - o script continua com
os próximos arquivos.

## 🔒 Segurança

### Boas Práticas

1. ✅ **Nunca commite** Service Role Keys no Git
2. ✅ Use `.env` (já está no `.gitignore`)
3. ✅ Rotacione keys após migração
4. ✅ Revogue keys antigas no dashboard
5. ✅ Execute apenas em ambiente confiável

### Checklist de Segurança

- [ ] Service Role Keys estão no `.env` (não no código)
- [ ] `.env` está no `.gitignore`
- [ ] Keys foram rotacionadas após uso
- [ ] Keys antigas foram revogadas
- [ ] Script executado em ambiente seguro

## 📚 Referências

### Documentação Relacionada

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Service Role Keys](https://supabase.com/docs/guides/api/api-keys)
- [Storage Migration Guide](https://supabase.com/docs/guides/storage/migrating)

### Arquivos Relacionados

- `scripts/migrate-storage.js` - Script principal
- `.env` - Variáveis de ambiente (não commitado)
- `docs/internal/` - Documentação interna

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs de erro
2. Consulte a seção [Troubleshooting](#-troubleshooting)
3. Verifique a documentação do Supabase
4. Abra uma issue no repositório

---

**Última atualização**: Janeiro 2025 **Mantido por**: Equipe de Desenvolvimento
GB Locações **Versão**: 1.0.0

# 🗑️ Limpeza Automática de Imagens no Supabase Storage

## 📋 Visão Geral

Este sistema garante que quando imagens são removidas de equipamentos (ou quando
um equipamento é deletado), os arquivos físicos também são removidos do Supabase
Storage, evitando acúmulo de arquivos órfãos que ocupam espaço de armazenamento.

## 🔧 Como Funciona

### 1. Remoção Durante Edição (PUT)

Quando um equipamento é editado e imagens são removidas:

```typescript
// Antes da atualização no banco:
const oldImages = existingEquipment.images || []
const newImages = images.filter(...)

// Identifica imagens removidas
const deletedImages = oldImages.filter((oldImg) => !newImages.includes(oldImg))

// Remove arquivos do Storage antes de atualizar o banco
await deleteFilesFromStorage(deletedImages)
```

### 2. Remoção Durante Exclusão (DELETE)

Quando um equipamento é completamente deletado:

```typescript
// Busca o equipamento para obter as imagens
const equipment = await prisma.equipment.findUnique({
  where: { id },
  select: { images: true }
})

// Remove todas as imagens do Storage
await deleteFilesFromStorage(equipment.images)

// Depois deleta o equipamento do banco
await prisma.equipment.delete({ where: { id } })
```

## 📁 Arquivos Relacionados

### `lib/storage-utils.ts`

Funções utilitárias para gerenciar arquivos no Supabase Storage:

- **`extractFilePathFromSupabaseUrl(url: string)`**: Extrai o caminho do arquivo
  de uma URL completa do Supabase
- **`deleteFileFromStorage(fileUrl: string)`**: Remove um único arquivo do
  Storage
- **`deleteFilesFromStorage(fileUrls: string[])`**: Remove múltiplos arquivos do
  Storage

### `app/api/admin/equipments/[id]/route.ts`

Rotas de API que implementam a remoção automática:

- **PUT**: Atualiza equipamento e remove imagens deletadas
- **DELETE**: Deleta equipamento e remove todas as suas imagens

### `scripts/cleanup-orphaned-images.ts`

Script utilitário para limpar imagens órfãs que podem ter sido deixadas antes da
implementação:

```bash
# Executar script de limpeza
npx tsx scripts/cleanup-orphaned-images.ts
```

## 🔍 Detalhes Técnicos

### Extração de Caminho da URL

O sistema suporta URLs do Supabase no formato:

```
https://[project].supabase.co/storage/v1/object/public/gb-locacoes-images/equipments/equipment-[uuid].jpg
```

E extrai o caminho relativo:

```
equipments/equipment-[uuid].jpg
```

### Tratamento de Erros

- Se um arquivo não existe no Storage (já foi removido), não é considerado um
  erro crítico
- Erros durante a remoção são logados mas não bloqueiam a atualização/deleção do
  equipamento
- Isso garante que operações no banco de dados não sejam comprometidas por
  problemas no Storage

### Performance

- Remoções são feitas em paralelo usando `Promise.allSettled`
- O script de limpeza processa arquivos em lotes de 50 para evitar sobrecarga

## ⚠️ Armadilhas a Evitar

### ❌ Não Fazer

1. **Não remover arquivos antes de confirmar a operação no banco**: Sempre
   buscar o equipamento primeiro
2. **Não bloquear operações no banco por erros no Storage**: Logar erros mas
   continuar
3. **Não assumir formato de URL**: Sempre validar e extrair o caminho
   corretamente

### ✅ Sempre Fazer

1. **Sempre buscar equipamento existente**: Para comparar imagens antigas vs
   novas
2. **Sempre validar URLs**: Usar `extractFilePathFromSupabaseUrl` antes de
   remover
3. **Sempre logar operações**: Para facilitar debugging e auditoria
4. **Sempre processar erros**: Não deixar falhas silenciosas

## 🧪 Testando

### Teste Manual

1. **Criar equipamento com imagens**:
   - Criar novo equipamento via admin
   - Adicionar 2-3 imagens
   - Verificar que aparecem no Supabase Storage

2. **Remover uma imagem**:
   - Editar o equipamento
   - Remover uma imagem
   - Salvar
   - Verificar no Supabase Storage que a imagem foi removida

3. **Deletar equipamento**:
   - Deletar o equipamento completamente
   - Verificar no Supabase Storage que todas as imagens foram removidas

### Script de Limpeza

Para limpar imagens órfãs existentes:

```bash
npx tsx scripts/cleanup-orphaned-images.ts
```

O script irá:

1. Listar todos os arquivos no Storage
2. Buscar todas as imagens referenciadas no banco
3. Identificar arquivos órfãos
4. Remover arquivos órfãos em lotes

## 📊 Monitoramento

### Logs

O sistema gera logs para todas as operações:

- `✅ X imagem(ns) removida(s) do Storage` - Sucesso
- `❌ Erro ao remover imagens do Storage` - Falhas (não críticas)

### Métricas

Verificar periodicamente:

- Tamanho do bucket `gb-locacoes-images` no Supabase
- Número de arquivos no Storage vs número de imagens no banco
- Executar script de limpeza mensalmente (se necessário)

## 🔄 Melhorias Futuras

1. **Job agendado**: Executar limpeza automática periodicamente
2. **Relatório de uso**: Dashboard mostrando uso de Storage
3. **Alertas**: Notificações quando uso de Storage está alto
4. **Backup**: Opção de fazer backup antes de remover arquivos

## 📚 Referências

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Storage API Reference](https://supabase.com/docs/reference/javascript/storage-from-remove)

---

**Última atualização**: 2025-12-16 **Versão**: 1.0.0 **Status**: ✅ Implementado
e Funcional

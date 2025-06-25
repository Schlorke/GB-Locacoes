// ... (importações)
// PUT /api/admin/categories/[id] - Update category
// ... (código anterior para PUT)
// Adicionar os novos campos para atualização.
// Exemplo:
// const { name, description, icon, iconColor, bgColor, fontColor } = body;
// data: {
//   ...(name && { name }),
//   ...(description && { description }),
//   ...(icon && { icon }), // ou icon: icon || null para permitir remover
//   ...(iconColor && { iconColor }),
//   ...(bgColor && { bgColor }),
//   ...(fontColor && { fontColor }),
// },
// ... (restante do código PUT)

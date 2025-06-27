// ... (importações)
// PUT /api/admin/equipments/[id] - Update equipment
// ... (código anterior para PUT)
// No corpo do PUT, similarmente, `images` deve ser tratado como array.
// Exemplo:
// data: {
//   ...(name && { name }),
//   ...(description && { description }),
//   ...(specifications && { specifications }), // Se for JSONB
//   ...(pricePerDay && { pricePerDay: parseFloat(pricePerDay) }),
//   ...(categoryId && { categoryId }),
//   ...(images && images.length > 0 && { images: { set: images } }), // Atualiza se houver imagens
//   ...(available !== undefined && { available }),
// },
// ... (restante do código PUT)

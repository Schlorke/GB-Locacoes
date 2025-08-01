// Teste rápido da API de equipamentos
fetch('http://localhost:3000/api/equipments')
  .then((res) => res.json())
  .then((data) => {
    console.log('📊 Resposta da API:');
    console.log('Total de equipamentos:', data.length);

    if (data.length > 0) {
      console.log('✅ Equipamentos encontrados:');
      data.forEach((eq, index) => {
        console.log(`${index + 1}. ${eq.name} - R$ ${eq.pricePerDay}/dia - ${eq.category.name}`);
      });
    } else {
      console.log('❌ Nenhum equipamento encontrado');
    }
  })
  .catch((err) => {
    console.error('❌ Erro ao testar API:', err);
  });

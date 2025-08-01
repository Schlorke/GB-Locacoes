import { prisma } from './lib/prisma.ts';

async function testDatabaseConnection() {
  try {
    console.log('🔗 Testando conexão com o banco de dados...');

    // Teste de conexão
    await prisma.$connect();
    console.log('✅ Conexão estabelecida!');

    // Verificar se há categorias
    const categoriesCount = await prisma.category.count();
    console.log(`📂 Categorias no banco: ${categoriesCount}`);

    if (categoriesCount > 0) {
      const categories = await prisma.category.findMany();
      console.log('📋 Categorias encontradas:');
      categories.forEach((cat) => {
        console.log(`  - ${cat.name} (ID: ${cat.id})`);
      });
    }

    // Verificar se há equipamentos
    const equipmentsCount = await prisma.equipment.count();
    console.log(`🏗️ Equipamentos no banco: ${equipmentsCount}`);

    if (equipmentsCount > 0) {
      const equipments = await prisma.equipment.findMany({
        include: {
          category: true,
        },
      });
      console.log('🛠️ Equipamentos encontrados:');
      equipments.forEach((eq) => {
        console.log(
          `  - ${eq.name} - R$ ${eq.pricePerDay}/dia - Categoria: ${eq.category.name} - Disponível: ${eq.available}`,
        );
      });
    } else {
      console.log('❌ NENHUM EQUIPAMENTO ENCONTRADO NO BANCO!');
      console.log('💡 Execute o seed para criar dados de teste:');
      console.log('   pnpm db:seed');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDuplicateCategories() {
  try {
    console.log('Verificando categorias duplicadas...');
    
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    console.log(`Total de categorias: ${categories.length}`);
    
    // Verificar duplicatas por nome
    const nameCounts = {};
    categories.forEach(cat => {
      nameCounts[cat.name] = (nameCounts[cat.name] || 0) + 1;
    });

    const duplicates = Object.entries(nameCounts).filter(([name, count]) => count > 1);
    
    if (duplicates.length > 0) {
      console.log('Categorias duplicadas encontradas:');
      duplicates.forEach(([name, count]) => {
        console.log(`- "${name}": ${count} ocorrências`);
      });
    } else {
      console.log('Nenhuma categoria duplicada encontrada.');
    }

    // Verificar duplicatas por slug
    const slugCounts = {};
    categories.forEach(cat => {
      slugCounts[cat.slug] = (slugCounts[cat.slug] || 0) + 1;
    });

    const duplicateSlugs = Object.entries(slugCounts).filter(([slug, count]) => count > 1);
    
    if (duplicateSlugs.length > 0) {
      console.log('Slugs duplicados encontrados:');
      duplicateSlugs.forEach(([slug, count]) => {
        console.log(`- "${slug}": ${count} ocorrências`);
      });
    } else {
      console.log('Nenhum slug duplicado encontrado.');
    }

    // Listar todas as categorias
    console.log('\nTodas as categorias:');
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ID: ${cat.id}, Nome: "${cat.name}", Slug: "${cat.slug}"`);
    });

  } catch (error) {
    console.error('Erro ao verificar categorias:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDuplicateCategories(); 
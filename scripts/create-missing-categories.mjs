/* eslint-disable no-console */
import { prisma } from './prisma-client.js'
import crypto from 'node:crypto'

function slugify(text) {
  return text
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Categorias dos prints organizadas por tab
const categoriesFromPrints = {
  // Tab "Categorias" - todas as categorias (sem placement específico)
  all: [
    {
      name: 'Acesso e elevação',
      icon: 'CadeiraEletrica',
      description: 'Equipamentos para acesso e elevação em obras',
    },
    {
      name: 'Andaimes',
      icon: 'AndaimeTubular',
      description: 'Andaimes para trabalhos em altura',
    },
    {
      name: 'Compactação',
      icon: 'Compressor',
      description: 'Equipamentos para compactação de solo',
    },
    {
      name: 'Concretagem',
      icon: 'Betoneira',
      description: 'Equipamentos para concretagem e argamassa',
    },
    {
      name: 'Ferramentas elétricas',
      icon: 'Rompedor',
      description: 'Ferramentas elétricas para obras',
    },
    {
      name: 'Furação e demolição',
      icon: 'Rompedor',
      description: 'Equipamentos para furação e demolição',
    },
    {
      name: 'Jardinagem',
      icon: 'Lavagem',
      description: 'Equipamentos para jardinagem e paisagismo',
    },
    {
      name: 'Limpeza',
      icon: 'Lavagem',
      description: 'Equipamentos para limpeza',
    },
    { name: 'Motores', icon: 'Compressor', description: 'Motores e geradores' },
    { name: 'Outros', icon: 'Transporte', description: 'Outros equipamentos' },
  ],
  // Tab "Fases da Obra" - placement: 'phases'
  phases: [
    {
      name: 'Canteiro de obras',
      icon: 'AndaimeSuspenso',
      description: 'Equipamentos para canteiro de obras',
    },
    {
      name: 'Cobertura',
      icon: 'AndaimeTubular',
      description: 'Equipamentos para cobertura',
    },
    {
      name: 'Fundação',
      icon: 'Terraplenagem',
      description: 'Equipamentos para fundação',
    },
    {
      name: 'Estrutura',
      icon: 'AndaimeSuspenso',
      description: 'Equipamentos para estrutura',
    },
    {
      name: 'Instalações',
      icon: 'Compressor',
      description: 'Equipamentos para instalações',
    },
    {
      name: 'Acabamento',
      icon: 'Rompedor',
      description: 'Equipamentos para acabamento',
    },
    {
      name: 'Pintura',
      icon: 'Lavagem',
      description: 'Equipamentos para pintura',
    },
    {
      name: 'Limpeza final',
      icon: 'Lavagem',
      description: 'Equipamentos para limpeza final',
    },
    {
      name: 'Paisagismo',
      icon: 'Lavagem',
      description: 'Equipamentos para paisagismo',
    },
    { name: 'Outros', icon: 'Transporte', description: 'Outros equipamentos' },
  ],
  // Tab "Tipo de Trabalho" - placement: 'types'
  types: [
    {
      name: 'Limpar',
      icon: 'Lavagem',
      description: 'Equipamentos para limpeza',
    },
    {
      name: 'Trabalho em altura',
      icon: 'TrabalhoEmAltura',
      description: 'Equipamentos para trabalho em altura',
    },
    {
      name: 'Trabalho em jardins',
      icon: 'Lavagem',
      description: 'Equipamentos para trabalho em jardins',
    },
    {
      name: 'Cortar, furar ou demolir',
      icon: 'Rompedor',
      description: 'Equipamentos para cortar, furar ou demolir',
    },
    {
      name: 'Concretar, argamassa',
      icon: 'Betoneira',
      description: 'Equipamentos para concretagem e argamassa',
    },
    {
      name: 'Gerar energia elétrica',
      icon: 'Compressor',
      description: 'Equipamentos para geração de energia elétrica',
    },
    {
      name: 'Escorar lajes ou vigas',
      icon: 'AndaimeSuspenso',
      description: 'Equipamentos para escoramento',
    },
    {
      name: 'Bombear água ou lama',
      icon: 'Lavagem',
      description: 'Equipamentos para bombeamento',
    },
    {
      name: 'Aplainar ou lixar',
      icon: 'Rompedor',
      description: 'Equipamentos para aplainar ou lixar',
    },
    {
      name: 'Compactar o solo',
      icon: 'Compressor',
      description: 'Equipamentos para compactação de solo',
    },
  ],
}

async function main() {
  try {
    console.log('🔍 Verificando categorias existentes...\n')

    // Buscar todas as categorias existentes
    const existingCategories = await prisma.category.findMany({
      select: { name: true, slug: true },
    })

    const existingNames = new Set(
      existingCategories.map((c) => c.name.toLowerCase())
    )
    const existingSlugs = new Set(existingCategories.map((c) => c.slug))

    console.log(`📊 Categorias existentes: ${existingCategories.length}\n`)

    // Preparar todas as categorias para criar
    const allCategoriesToCreate = []

    // Adicionar categorias da tab "Categorias" (sem placement)
    for (const cat of categoriesFromPrints.all) {
      const slug = slugify(cat.name)
      if (
        !existingNames.has(cat.name.toLowerCase()) &&
        !existingSlugs.has(slug)
      ) {
        allCategoriesToCreate.push({
          ...cat,
          slug,
          placement: null,
        })
      }
    }

    // Adicionar categorias da tab "Fases da Obra" (placement: 'phases')
    for (const cat of categoriesFromPrints.phases) {
      const slug = slugify(cat.name)
      if (
        !existingNames.has(cat.name.toLowerCase()) &&
        !existingSlugs.has(slug)
      ) {
        allCategoriesToCreate.push({
          ...cat,
          slug,
          placement: 'phases',
        })
      }
    }

    // Adicionar categorias da tab "Tipo de Trabalho" (placement: 'types')
    for (const cat of categoriesFromPrints.types) {
      const slug = slugify(cat.name)
      if (
        !existingNames.has(cat.name.toLowerCase()) &&
        !existingSlugs.has(slug)
      ) {
        allCategoriesToCreate.push({
          ...cat,
          slug,
          placement: 'types',
        })
      }
    }

    if (allCategoriesToCreate.length === 0) {
      console.log(
        '✅ Todas as categorias dos prints já existem no banco de dados!'
      )
      return
    }

    console.log(`📝 Categorias a criar: ${allCategoriesToCreate.length}\n`)

    // Criar categorias
    let created = 0
    let skipped = 0

    for (const cat of allCategoriesToCreate) {
      try {
        const category = await prisma.category.create({
          data: {
            id: crypto.randomUUID(),
            name: cat.name,
            description: cat.description || null,
            icon: cat.icon || null,
            iconColor: '#ea580c',
            bgColor: '#EFF6FF',
            fontColor: '#1E40AF',
            slug: cat.slug,
            placement: cat.placement,
          },
        })

        console.log(
          `✅ Criada: ${category.name} (${cat.placement || 'sem placement'})`
        )
        created++
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`⏭️  Já existe: ${cat.name} (slug: ${cat.slug})`)
          skipped++
        } else {
          console.error(`❌ Erro ao criar ${cat.name}:`, error.message)
        }
      }
    }

    console.log(`\n✨ Processo concluído!`)
    console.log(`   ✅ Criadas: ${created}`)
    console.log(`   ⏭️  Ignoradas: ${skipped}`)
  } catch (error) {
    console.error('❌ Erro:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

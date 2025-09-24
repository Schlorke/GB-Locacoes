import { MetadataRoute } from 'next'

// Runtime-only Prisma import for server components
async function getPrisma() {
  const { prisma } = await import('@/lib/prisma')
  return prisma
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://locacoesgb.com.br'

  // URLs estáticas principais
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/equipamentos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/orcamento`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/area-cliente`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  try {
    const prisma = await getPrisma()

    // Buscar todos os equipamentos para URLs dinâmicas
    const equipments = await prisma.equipment.findMany({
      select: {
        id: true,
        updatedAt: true,
        available: true,
      },
      where: {
        available: true, // Apenas equipamentos disponíveis
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    // Buscar todas as categorias para URLs dinâmicas
    const categories = await prisma.category.findMany({
      select: {
        slug: true,
        updatedAt: true,
        equipments: {
          where: {
            available: true,
          },
          take: 1, // Apenas para verificar se tem equipamentos disponíveis
        },
      },
    })

    // URLs dos equipamentos individuais
    const equipmentRoutes: MetadataRoute.Sitemap = equipments.map(
      (equipment) => ({
        url: `${baseUrl}/equipamentos/${equipment.id}`,
        lastModified: equipment.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })
    )

    // URLs das categorias (apenas aquelas que têm equipamentos disponíveis)
    const categoryRoutes: MetadataRoute.Sitemap = categories
      .filter((category) => category.equipments.length > 0)
      .map((category) => ({
        url: `${baseUrl}/equipamentos?categoria=${category.slug}`,
        lastModified: category.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))

    return [...staticRoutes, ...equipmentRoutes, ...categoryRoutes]
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error)

    // Retorna apenas as rotas estáticas em caso de erro
    return staticRoutes
  }
}

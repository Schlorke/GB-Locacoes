import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    console.log("=== BUSCANDO EQUIPAMENTOS COM IMAGENS ===")

    await prisma.$connect()
    console.log("Conexão com banco estabelecida")

    const equipments = await prisma.equipment.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    console.log(`Encontrados ${equipments.length} equipamentos no banco`)

    if (equipments.length === 0) {
      console.log("Nenhum equipamento encontrado, retornando dados mock")
      const mockEquipments = [
        {
          id: "mock-1",
          name: "Betoneira",
          description: "Betoneira para construção civil",
          pricePerDay: 60,
          imageUrl: "/placeholder.svg?height=200&width=300&text=Betoneira",
          images: ["/placeholder.svg?height=200&width=300&text=Betoneira"],
          available: true,
          category: {
            id: "mock-cat-1",
            name: "Equipamentos",
          },
          // TODO: implementar reviews
      },
      ]
      return NextResponse.json(mockEquipments)
    }

    // Formatar os dados do banco garantindo que as imagens sejam incluídas
    const formattedEquipments = equipments.map((equipment) => {
      console.log(`Processando equipamento: ${equipment.name}`)
      console.log(`Imagens do banco:`, equipment.images)
      console.log(`ImageUrl do banco:`, equipment.imageUrl)

      // Priorizar imageUrl se existir, senão usar primeira imagem do array
      let primaryImage = null
      if (equipment.imageUrl && equipment.imageUrl.trim() !== "") {
        primaryImage = equipment.imageUrl
      } else if (equipment.images && equipment.images.length > 0) {
        primaryImage = equipment.images[0]
      }

      const formattedEquipment = {
        id: equipment.id,
        name: equipment.name,
        description: equipment.description,
        pricePerDay: equipment.pricePerDay,
        imageUrl: primaryImage, // Campo principal para imagem
        images: equipment.images && equipment.images.length > 0 ? equipment.images : primaryImage ? [primaryImage] : [],
        available: equipment.available,
        category: {
          id: equipment.category.id,
          name: equipment.category.name,
        },
        // TODO: implementar reviews
      }

      console.log(`Equipamento formatado:`, {
        id: formattedEquipment.id,
        name: formattedEquipment.name,
        imageUrl: formattedEquipment.imageUrl,
        images: formattedEquipment.images,
      })

      return formattedEquipment
    })

    return NextResponse.json(formattedEquipments)
  } catch (error) {
    console.error("Erro ao buscar equipamentos:", error)

    const mockEquipments = [
      {
        id: "fallback-1",
        name: "Betoneira (Dados de Teste)",
        description: "Betoneira para construção civil - dados de teste",
        pricePerDay: 60,
        imageUrl: "/placeholder.svg?height=200&width=300&text=Betoneira",
        images: ["/placeholder.svg?height=200&width=300&text=Betoneira"],
        available: true,
        category: {
          id: "fallback-cat-1",
          name: "Equipamentos",
        },
        // TODO: implementar reviews
      },
    ]

    return NextResponse.json(mockEquipments)
  }
}

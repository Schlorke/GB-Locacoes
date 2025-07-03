import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Clock, MapPin } from 'lucide-react';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const equipment = await prisma.equipment.findUnique({
    where: { id: params.id },
    include: { category: true },
  });

  if (!equipment) {
    return { title: 'Equipamento não encontrado' };
  }

  return {
    title: `${equipment.name} | GB Locações`,
    description: equipment.description,
  };
}

export default async function EquipmentDetailPage({ params }: Props) {
  const equipment = await prisma.equipment.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      reviews: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });

  if (!equipment) {
    notFound();
  }

  const averageRating =
    equipment.reviews.length > 0
      ? equipment.reviews.reduce((acc, review) => acc + review.rating, 0) / equipment.reviews.length
      : 0;

  return (
    <main className="pt-32 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/equipamentos"
            className="inline-flex items-center text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Equipamentos
          </Link>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Imagens */}
          <div>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <Image
                src={equipment.images?.[0] || '/placeholder.svg?height=400&width=600'}
                alt={equipment.name}
                fill
                className="object-cover"
                priority
              />
              {!equipment.isAvailable && (
                <div className="absolute top-4 right-4">
                  <Badge variant="destructive">Indisponível</Badge>
                </div>
              )}
            </div>

            {/* Galeria de imagens */}
            {equipment.images && equipment.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {equipment.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="relative h-20 bg-gray-200 rounded overflow-hidden">
                    <Image
                      src={image || '/placeholder.svg'}
                      alt={`${equipment.name} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informações */}
          <div>
            <Badge variant="outline" className="mb-4">
              {equipment.category.name}
            </Badge>

            <h1 className="font-bold text-h1 text-gray-900 mb-4">{equipment.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-h2 font-bold text-orange-600">
                R$ {equipment.pricePerDay.toFixed(2)}
                <span className="text-base font-normal text-gray-500">/dia</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Diária</span>
              </div>
            </div>

            {/* Avaliações */}
            {equipment.reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-gray-500">
                  ({equipment.reviews.length}{' '}
                  {equipment.reviews.length === 1 ? 'avaliação' : 'avaliações'})
                </span>
              </div>
            )}

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{equipment.description}</p>
              </CardContent>
            </Card>

            {/* Especificações */}
            {equipment.specifications && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Especificações Técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(equipment.specifications as Record<string, any>).map(
                      ([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="font-medium">{key}:</span>
                          <span>{String(value)}</span>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ações */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full"
                disabled={!equipment.isAvailable}
                asChild={equipment.isAvailable}
              >
                {equipment.isAvailable ? (
                  <Link href={`/orcamento?equipmentId=${equipment.id}`}>Solicitar Orçamento</Link>
                ) : (
                  <span>Equipamento Indisponível</span>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>Entrega em toda região metropolitana de Porto Alegre</span>
              </div>
            </div>
          </div>
        </div>

        {/* Avaliações */}
        {equipment.reviews.length > 0 && (
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Avaliações dos Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipment.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {review.comment && <p className="text-gray-700">{review.comment}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

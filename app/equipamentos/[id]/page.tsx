import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
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

export default async function EquipmentDetailPage(props: Props) {
  const params = await props.params;
  const equipment = await prisma.equipment.findUnique({
    where: { id: params.id },
    include: {
      category: true,
    },
  });

  if (!equipment) {
    notFound();
  }

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
              {!equipment.available && (
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

            {/* Avaliações - Feature not implemented yet */}
            {/* 
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
            */}

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{equipment.description}</p>
              </CardContent>
            </Card>

            {/* Especificações - Feature not implemented yet */}
            {/* 
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Especificações Técnicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  ...specifications content...
                </div>
              </CardContent>
            </Card>
            */}

            {/* Ações */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full"
                disabled={!equipment.available}
                asChild={equipment.available}
              >
                {equipment.available ? (
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

        {/* Reviews section - Feature not implemented yet */}
        {/* 
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Avaliações dos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              ...review content...
            </div>
          </CardContent>
        </Card>
        */}
      </div>
    </main>
  );
}

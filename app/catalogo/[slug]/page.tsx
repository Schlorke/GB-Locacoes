import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Simulação de busca de dados do catálogo
async function getCatalogoItem(slug: string) {
  // Em um cenário real, você buscaria dados de um CMS ou banco de dados
  // Exemplo: const item = await db.catalogo.findUnique({ where: { slug } });
  // if (!item) notFound();
  // return item;

  // Dados de exemplo:
  const items: { [key: string]: { title: string; description: string; content: string } } = {
    'andaimes-suspensos': {
      title: 'Andaime Suspenso',
      description: 'Detalhes sobre andaimes suspensos.',
      content: 'Conteúdo completo sobre Andaimes Suspensos...',
    },
    'cadeiras-eletricas': {
      title: 'Cadeira Elétrica',
      description: 'Detalhes sobre cadeiras elétricas.',
      content: 'Conteúdo completo sobre Cadeiras Elétricas...',
    },
    // Adicione outros slugs conforme necessário
  };

  if (items[slug]) {
    return items[slug];
  }
  notFound(); // Se o slug não for encontrado, retorna 404
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const item = await getCatalogoItem(params.slug);
    return {
      title: `${item.title} | Catálogo GB Locações`,
      description: item.description,
    };
  } catch {
    // Se notFound() foi chamado em getCatalogoItem, não chegará aqui.
    // Mas é bom ter um fallback.
    return {
      title: 'Item não encontrado | Catálogo GB Locações',
      description: 'O item que você está procurando não foi encontrado.',
    };
  }
}

export default async function CatalogoItemPage({ params }: Props) {
  const item = await getCatalogoItem(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <p className="text-lg text-muted-foreground mb-6">{item.description}</p>
      <article className="prose dark:prose-invert lg:prose-xl">
        {/* Aqui você renderizaria o conteúdo do item, talvez de um campo MDX ou HTML */}
        <p>{item.content}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </article>
    </div>
  );
}

// Opcional: Se você tiver um número limitado de itens de catálogo e quiser gerar estaticamente
// export async function generateStaticParams() {
//   // Exemplo: const slugs = await db.catalogo.findMany({ select: { slug: true } });
//   // return slugs.map((s) => ({ slug: s.slug }));
//   return [
//     { slug: 'andaimes-suspensos' },
//     { slug: 'cadeiras-eletricas' },
//   ];
// }

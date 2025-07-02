import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo | GB Locações",
  description: "Catálogo completo de equipamentos para construção civil",
};

export default function CatalogoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-bold text-h1 mb-6">Catálogo de Equipamentos</h1>
      <p className="text-base text-muted-foreground mb-8">
        Explore nosso catálogo completo de equipamentos para construção civil.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 border rounded-lg">
          <h3 className="text-h3 font-semibold mb-2">Andaimes</h3>
          <p className="text-muted-foreground">
            Andaimes suspensos e convencionais para trabalhos em altura.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-h3 font-semibold mb-2">Betoneiras</h3>
          <p className="text-muted-foreground">
            Betoneiras de diversos tamanhos para preparo de concreto.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-h3 font-semibold mb-2">Ferramentas</h3>
          <p className="text-muted-foreground">
            Ferramentas elétricas e manuais para construção.
          </p>
        </div>
      </div>
    </div>
  );
}

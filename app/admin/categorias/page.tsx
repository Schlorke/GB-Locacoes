import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CategoriesPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorias</h1>
      </div>
      <div className="mt-4">
        <p>
          Gerencie as categorias de seus produtos aqui. Crie, edite e exclua categorias para organizar seus produtos de
          forma eficiente.
        </p>
      </div>
      <div className="mt-6">
        <Button className="max-w-full mx-auto h-10 px-4">
          <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Criar Primeira Categoria</span>
        </Button>
      </div>
    </div>
  )
}

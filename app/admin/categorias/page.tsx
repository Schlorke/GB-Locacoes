'use client'

export default function AdminCategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-xl rounded-3xl bg-white shadow-2xl px-8 py-12 text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Gerenciar Categorias
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          O fluxo de criação e edição está sendo configurado no laboratório de
          dialogs (<code>/playground</code>). Assim que aprovarmos o layout
          definitivo, ele será reintegrado aqui.
        </p>
        <p className="text-sm text-slate-500">
          Enquanto isso, utilize os demais módulos administrativos normalmente.
          Avisaremos quando esta seção estiver disponível novamente.
        </p>
      </div>
    </div>
  )
}

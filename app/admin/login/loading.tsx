export default function LoginLoading() {
  return (
    <div className="h-dvh w-dvw flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 overflow-hidden">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-slate-700 to-slate-800 text-white shadow-lg mb-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        </div>
        <p className="text-slate-600 font-medium">Carregando página de login...</p>
      </div>
    </div>
  );
}

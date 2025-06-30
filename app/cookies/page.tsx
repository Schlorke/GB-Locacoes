import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Cookies | GB Locações",
  description: "Política de cookies da GB Locações",
}

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="font-bold text-h1 mb-6">Política de Cookies</h1>

      <div className="prose dark:prose-invert lg:prose-xl">
        <h2>O que são cookies?</h2>
        <p>
          Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você visita um site. Eles
          são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente.
        </p>

        <h2>Como usamos cookies</h2>
        <p>Utilizamos cookies para:</p>
        <ul>
          <li>Manter você logado no sistema administrativo</li>
          <li>Lembrar suas preferências</li>
          <li>Melhorar a experiência de navegação</li>
          <li>Analisar como nosso site é usado</li>
        </ul>

        <h2>Tipos de cookies que usamos</h2>
        <h3>Cookies essenciais</h3>
        <p>Estes cookies são necessários para o funcionamento básico do site.</p>

        <h3>Cookies de preferências</h3>
        <p>Estes cookies permitem que o site lembre de escolhas que você fez.</p>

        <h2>Controle de cookies</h2>
        <p>
          Você pode controlar e/ou excluir cookies conforme desejar. Você pode excluir todos os cookies que já estão no
          seu computador e pode configurar a maioria dos navegadores para impedir que sejam colocados.
        </p>
      </div>
    </div>
  )
}

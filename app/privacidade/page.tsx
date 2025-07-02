import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | GB Locações",
  description:
    "Conheça nossa política de privacidade e como lidamos com seus dados.",
};

export default function PrivacidadePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="font-bold tracking-tight text-h1 text-gray-900 dark:text-white">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
          Última atualização: 23 de Junho de 2025
        </p>
      </header>

      <article className="prose dark:prose-invert lg:prose-xl mx-auto">
        <p>
          A sua privacidade é importante para nós. É política da GB Locações
          respeitar a sua privacidade em relação a qualquer informação sua que
          possamos coletar no site GB Locações, e outros sites que possuímos e
          operamos.
        </p>

        <h2>1. Informações que Coletamos</h2>
        <p>
          Solicitamos informações pessoais apenas quando realmente precisamos
          delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
          legais, com o seu conhecimento e consentimento. Também informamos por
          que estamos coletando e como será usado.
        </p>
        <p>
          Apenas retemos as informações coletadas pelo tempo necessário para
          fornecer o serviço solicitado. Quando armazenamos dados, protegemos
          dentro de meios comercialmente aceitáveis para evitar perdas e roubos,
          bem como acesso, divulgação, cópia, uso ou modificação não
          autorizados.
        </p>

        <h2>2. Como Usamos Suas Informações</h2>
        <p>
          Podemos usar as informações que coletamos de várias maneiras,
          incluindo para:
        </p>
        <ul>
          <li>Fornecer, operar e manter nosso site</li>
          <li>Melhorar, personalizar e expandir nosso site</li>
          <li>Entender e analisar como você usa nosso site</li>
          <li>
            Desenvolver novos produtos, serviços, recursos e funcionalidades
          </li>
          <li>
            Comunicar com você, diretamente ou através de um de nossos
            parceiros, incluindo para atendimento ao cliente, para fornecer
            atualizações e outras informações relacionadas ao site e para fins
            de marketing e promocionais
          </li>
          <li>Enviar emails</li>
          <li>Encontrar e prevenir fraudes</li>
        </ul>

        <h2>3. Cookies</h2>
        <p>
          Utilizamos cookies para melhorar sua experiência. Ao acessar o site GB
          Locações, você concorda com o uso de cookies de acordo com a Política
          de Cookies da GB Locações.
        </p>
        <p>
          A maioria dos sites interativos de hoje em dia usa cookies que nos
          permitem recuperar os detalhes do usuário para cada visita. Eles são
          usados em algumas áreas do nosso site para habilitar a funcionalidade
          dessa área e facilitar o uso посетители. Alguns de nossos parceiros
          afiliados/publicitários também podem usar cookies.
        </p>

        <h2>4. Links para Sites de Terceiros</h2>
        <p>
          O nosso site pode ter links para sites externos que não são operados
          por nós. Esteja ciente de que não temos controle sobre o conteúdo e
          práticas desses sites e não podemos aceitar responsabilidade por suas
          respectivas políticas de privacidade.
        </p>

        <h2>5. Consentimento</h2>
        <p>
          Ao utilizar nosso site, você concorda com a nossa política de
          privacidade e concorda com seus termos.
        </p>

        <h2>6. Alterações nesta Política de Privacidade</h2>
        <p>
          Podemos atualizar nossa Política de Privacidade de tempos em tempos.
          Avisaremos sobre quaisquer alterações, publicando a nova Política de
          Privacidade nesta página.
        </p>
        <p>
          Aconselhamos que você revise esta Política de Privacidade
          periodicamente para quaisquer alterações. As alterações a esta
          Política de Privacidade entram em vigor quando são publicadas nesta
          página.
        </p>

        <h2>7. Contato</h2>
        <p>
          Se você tiver alguma dúvida sobre esta Política de Privacidade, entre
          em contato conosco.
        </p>
      </article>
    </div>
  );
}

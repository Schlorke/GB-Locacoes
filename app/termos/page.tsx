import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | GB Locações",
  description: "Termos de uso e condições da GB Locações",
};

export default function TermosPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>

      <div className="prose dark:prose-invert lg:prose-xl">
        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e usar este site, você aceita e concorda em ficar vinculado
          aos termos e condições de uso aqui estabelecidos.
        </p>

        <h2>2. Uso do Site</h2>
        <p>
          Este site é fornecido para fins informativos sobre nossos serviços de
          locação de equipamentos para construção civil.
        </p>

        <h2>3. Serviços de Locação</h2>
        <p>Nossos serviços incluem:</p>
        <ul>
          <li>Locação de equipamentos para construção civil</li>
          <li>Entrega e retirada de equipamentos</li>
          <li>Suporte técnico durante o período de locação</li>
          <li>Manutenção preventiva dos equipamentos</li>
        </ul>

        <h2>4. Responsabilidades do Cliente</h2>
        <p>O cliente é responsável por:</p>
        <ul>
          <li>Usar os equipamentos de acordo com as instruções</li>
          <li>Manter os equipamentos em boas condições</li>
          <li>Devolver os equipamentos no prazo acordado</li>
          <li>Comunicar imediatamente qualquer problema ou dano</li>
        </ul>

        <h2>5. Preços e Pagamento</h2>
        <p>
          Os preços estão sujeitos a alterações sem aviso prévio. O pagamento
          deve ser efetuado conforme as condições acordadas no contrato de
          locação.
        </p>

        <h2>6. Limitação de Responsabilidade</h2>
        <p>
          A GB Locações não se responsabiliza por danos indiretos, incidentais
          ou consequenciais decorrentes do uso dos equipamentos locados.
        </p>

        <h2>7. Contato</h2>
        <p>
          Para dúvidas sobre estes termos, entre em contato conosco através dos
          canais disponíveis em nosso site.
        </p>
      </div>
    </div>
  );
}

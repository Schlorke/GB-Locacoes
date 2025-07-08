# AGENTS.md
Este documento orienta colaboradores humanos e agentes automatizados sobre como trabalhar neste repositório.

## Estrutura e estilo do código
- Projeto em **Next.js 15** e **TypeScript**.
- Nomes de arquivos e pastas devem estar em inglês e minúsculo.
- Execute eslint e prettier antes de enviar pull requests.

## Configurações e scripts
- Variáveis de ambiente estão em `.env.example`.
- Para rodar localmente:
  ```bash
  pnpm install
  pnpm dev
  ```
- Testes e lint:
  ```bash
  pnpm lint
  pnpm test
  ```

## Política de branches e commits
- Use branches descritivas, ex.: `feature/nova-funcionalidade`.
- Commits devem ser concisos e no imperativo.

## Revisão e Pull Requests
- PRs precisam de descrição clara do que foi feito e como testar.
- Revisões são obrigatórias antes do merge na branch principal.

## Orientações para agentes de IA
- Respeite estas instruções ao gerar patches ou respostas.
- Em caso de dúvida, priorize a segurança e a clareza.

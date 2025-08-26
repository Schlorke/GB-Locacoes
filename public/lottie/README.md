# GB-Locações Lottie Animations

## gb-construction.json

### Descrição

Animação Lottie para efeito parallax no Hero da GB-Locações, com tema de
construção civil.

### Especificações Técnicas

- **Duração**: 300 frames (10 segundos a 30fps)
- **Dimensões**: 1920x1080px
- **Formato**: Lottie JSON (SVG renderer)
- **Peso**: ~8KB (otimizado)

### Camadas de Parallax (por profundidade)

#### Layer 1: Skyline Background

- **Depth**: Mais distante
- **Movimento**: Mínimo (2% vs scroll base)
- **Opacity**: 30%
- **Cor**: #ea580c (laranja principal)
- **Descrição**: Silhueta de cidade ao fundo

#### Layer 2: Buildings Mid

- **Depth**: Médio-distante
- **Movimento**: +2% vs scroll base
- **Opacity**: 50%
- **Cor**: #ea580c (laranja principal)
- **Descrição**: Prédios residenciais/comerciais

#### Layer 3: Crane

- **Depth**: Médio-próximo
- **Movimento**: +4% vs scroll base + rotação sutil
- **Opacity**: 60%
- **Cor**: #fbbf24 (amarelo/dourado)
- **Descrição**: Guindaste de construção com movimento de balanço

#### Layer 4: Scaffolding

- **Depth**: Próximo
- **Movimento**: +4% vs scroll base
- **Opacity**: 70%
- **Cor**: #111111 (preto/grafite)
- **Descrição**: Andaimes e estruturas metálicas

#### Layer 5: Dust Particles

- **Depth**: Mais próximo
- **Movimento**: +6% vs scroll base
- **Opacity**: 20%
- **Cor**: #fbbf24 (amarelo/dourado)
- **Descrição**: Partículas de poeira sutis

### Paleta de Cores

- **Laranja Principal**: #ea580c (elementos estruturais)
- **Amarelo/Dourado**: #fbbf24 (detalhes e partículas)
- **Preto/Grafite**: #111111 (estruturas metálicas)
- **Transparências**: 20% a 70% (diferentes profundidades)

### Performance

- **Renderer**: SVG (melhor qualidade + performance)
- **Preload**: Progressive loading habilitado
- **Otimizações**: hideOnTransparent, preserveAspectRatio
- **Hardware Acceleration**: transform3d, willChange

### Controle de Animação

- **Trigger**: Scroll sync (sem autoplay)
- **Range**: 0-100% da visibilidade da seção Hero
- **Smooth**: requestAnimationFrame para fluidez
- **Throttle**: Otimizado para 60fps

### Acessibilidade

- **Reduced Motion**: Fallback estático automático
- **ARIA**: aria-hidden="true" no container
- **Semântica**: role="presentation"
- **SEO**: Não interfere com conteúdo textual

### Fallback

- **Arquivo**: gb-construction-fallback.svg
- **Uso**: Quando Lottie falha ou motion reduzida
- **Estilo**: SVG estático com mesma paleta
- **Peso**: ~3KB

### Uso no Código

```tsx
import ParallaxLottie from "@/components/hero/ParallaxLottie"
;<ParallaxLottie
  src="/lottie/gb-construction.json"
  fallbackSrc="/lottie/gb-construction-fallback.svg"
  className="absolute inset-0 z-0 opacity-80"
  speed={1}
/>
```

### Customização de Velocidade

Para ajustar velocidades individuais por layer, seria necessário:

1. Separar em múltiplas composições Lottie
2. Renderizar múltiplas instâncias com speeds diferentes
3. Ou usar uma biblioteca como GSAP para controle granular

### Troubleshooting

**Animação não carrega:**

- Verifique se o arquivo JSON é válido
- Confirme que lottie-web está instalado
- Veja o console para erros de rede

**Performance ruim:**

- Reduza opacity das layers
- Use speed < 1 para movimento mais lento
- Considere reduzir número de frames

**Motion sickness:**

- Usuários com prefers-reduced-motion veem fallback estático
- Ajuste speed para valores menores (0.5-0.8)
- Reduza range de movimento das layers

### Melhorias Futuras

- [ ] Adicionar layer de veículos de construção
- [ ] Implementar movement em eixo Y para mais realismo
- [ ] Otimizar JSON com compressão de keyframes
- [ ] Suporte a diferentes aspectos ratio
- [ ] Sistema de presets de velocidade (slow, normal, fast)

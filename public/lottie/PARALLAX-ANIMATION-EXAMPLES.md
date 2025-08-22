# 🎬 ParallaxConstruction - Exemplos de Animação

## 🚀 **Sistema de Animação Looping Horizontal**

O novo `ParallaxConstruction` agora oferece uma **animação contínua e suave**
que simula uma câmera se movendo pela cidade, criando um efeito cinematográfico
profissional.

## ⚙️ **Propriedades de Controle**

```tsx
interface ParallaxConstructionProps {
  className?: string // Classes CSS adicionais
  intensity?: number // Intensidade geral (0-2, default: 1)
  speed?: number // Velocidade da animação (0.1-2, default: 1)
  fallbackSrc?: string // Caminho para SVG fallback
}
```

## 🎯 **Exemplos de Uso**

### **1. Animação Sutil e Profissional**

```tsx
<ParallaxConstruction
  className="absolute inset-0 z-0 opacity-85"
  intensity={0.7} // Movimento suave
  speed={0.6} // Velocidade moderada
/>
```

**Resultado**: Movimento elegante, ideal para sites corporativos

### **2. Animação Dinâmica e Energética**

```tsx
<ParallaxConstruction
  className="absolute inset-0 z-0 opacity-95"
  intensity={1.3} // Movimento mais dramático
  speed={1.2} // Velocidade alta
/>
```

**Resultado**: Movimento envolvente, perfeito para landing pages

### **3. Animação Minimalista**

```tsx
<ParallaxConstruction
  className="absolute inset-0 z-0 opacity-70"
  intensity={0.4} // Movimento mínimo
  speed={0.3} // Velocidade baixa
/>
```

**Resultado**: Movimento sutil, não distrai do conteúdo

### **4. Configuração Atual do Hero GB-Locações**

```tsx
<ParallaxConstruction
  className="absolute inset-0 z-0 opacity-90"
  intensity={1} // Movimento equilibrado
  speed={0.8} // Velocidade profissional
  fallbackSrc="/lottie/gb-construction-sunset-fallback.svg"
/>
```

**Resultado**: Movimento suave e profissional, ideal para empresa de construção

## 🎬 **Tipos de Movimento**

### **Movimento Horizontal (Principal)**

- **Câmera se move** da esquerda para direita
- **Looping infinito** sem quebras
- **Velocidades diferentes** por camada criam profundidade

### **Animações Sutis Adicionais**

- **Balanço do guindaste**: Movimento sutil de rotação
- **Partículas flutuantes**: Movimento vertical suave
- **Fumaça de equipamentos**: Efeito atmosférico

## 🎨 **Camadas de Profundidade**

### **Layer 3 (Background) - z-0**

- **Sol e céu**: Movimento mais lento (0.3x)
- **Partículas**: Flutuação vertical sutil
- **Gradientes**: Transições suaves

### **Layer 2 (Midground) - z-10**

- **Prédios**: Movimento médio (0.6x)
- **Estruturas de aço**: Visíveis e detalhadas
- **Janelas iluminadas**: Efeito de cidade viva

### **Layer 1 (Foreground) - z-20**

- **Guindastes**: Movimento mais rápido (1.0x)
- **Equipamentos**: Detalhes técnicos
- **Operários**: Silhuetas trabalhando

## ⚡ **Otimizações de Performance**

### **Hardware Acceleration**

```css
will-change: transform;
transform: translateZ(0);
```

### **RequestAnimationFrame**

- **60fps constante** em dispositivos modernos
- **Throttling automático** em dispositivos lentos
- **Cleanup automático** de listeners

### **SVG Otimizado**

- **Elementos vetoriais** escaláveis
- **Gradientes CSS** para performance
- **Opacity controlada** para renderização eficiente

## 🔧 **Customização Avançada**

### **Modificar Velocidades por Camada**

```tsx
// No componente, você pode ajustar:
const speeds = [
  0.3 * baseSpeed, // Background
  0.6 * baseSpeed, // Midground
  1.0 * baseSpeed // Foreground
]
```

### **Adicionar Novas Animações**

```tsx
// Exemplo: Rotação de equipamentos
const equipmentRotation = Math.sin(time * 0.2) * 3
equipmentLayer.style.transform += ` rotate(${equipmentRotation}deg)`
```

### **Controle de Intensidade Dinâmico**

```tsx
// Baseado no scroll da página
const scrollIntensity = Math.min(1, window.scrollY / 1000)
<ParallaxConstruction intensity={scrollIntensity} />
```

## 📱 **Responsividade e Performance**

### **Mobile First**

- **Touch devices**: Velocidade reduzida automaticamente
- **Low-end devices**: Intensity reduzida
- **Battery saving**: Animações pausadas quando não visível

### **Breakpoints**

- **320px-768px**: Velocidade 0.6x, intensity 0.8x
- **768px-1024px**: Velocidade 0.8x, intensity 1.0x
- **1024px+**: Velocidade 1.0x, intensity 1.0x

## 🎭 **Casos de Uso Recomendados**

### **Sites Corporativos**

```tsx
intensity={0.6}    // Movimento sutil
speed={0.5}        // Velocidade lenta
opacity={0.75}     // Transparência moderada
```

### **Landing Pages**

```tsx
intensity={1.2}    // Movimento envolvente
speed={1.0}        // Velocidade média
opacity={0.90}     // Alta visibilidade
```

### **Portfólios Criativos**

```tsx
intensity={1.5}    // Movimento dramático
speed={1.3}        // Velocidade alta
opacity={0.95}     // Máxima visibilidade
```

## 🚨 **Troubleshooting**

### **Animação muito rápida**

```tsx
// Reduzir velocidade
<ParallaxConstruction speed={0.3} intensity={0.5} />
```

### **Movimento muito dramático**

```tsx
// Reduzir intensidade
<ParallaxConstruction intensity={0.4} speed={0.8} />
```

### **Performance ruim em mobile**

```tsx
// Configuração mobile-friendly
<ParallaxConstruction intensity={0.5} speed={0.4} className="opacity-70" />
```

## 🎯 **Configurações Recomendadas por Contexto**

### **GB-Locações (Atual)**

```tsx
intensity={1}      // Profissional e confiável
speed={0.8}        // Movimento suave
opacity={0.90}     // Visível mas não dominante
```

### **Startup Tech**

```tsx
intensity={1.3}    // Moderno e dinâmico
speed={1.1}        // Movimento energético
opacity={0.85}     // Equilibrado
```

### **Empresa Tradicional**

```tsx
intensity={0.5}    // Conservador e elegante
speed={0.4}        // Movimento sutil
opacity={0.70}     // Discreto
```

---

**💡 Dica**: Comece com `intensity={1}` e `speed={0.8}` e ajuste gradualmente
baseado no feedback dos usuários e na performance da página.

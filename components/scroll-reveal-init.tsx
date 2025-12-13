/**
 * 🎬 SISTEMA DE SCROLL REVEAL - GB LOCAÇÕES
 *
 * Sistema inteligente de animações que detecta o tipo de navegação:
 * - Primeira visita: Executa animações suaves
 * - Navegação interna: Mostra elementos imediatamente
 *
 * Compatível com:
 * ✅ Elementos estáticos (Categories, Hero)
 * ✅ Elementos dinâmicos (FeaturedMaterials com ssr: false)
 * ✅ Componentes com carregamento assíncrono
 * ✅ Navegação entre páginas
 * ✅ Dispositivos móveis
 *
 * @author GB Locações Development Team
 * @version 2.1 - Atualizado para suportar .hero-image-inner
 * @see docs/scroll-reveal-system.md
 */

'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ScrollRevealInit() {
  const [isHydrated, setIsHydrated] = useState(false)
  const pathname = usePathname()

  // Aguardar hidratação completa
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    let cleanup: () => void = () => {}

    const run = () => {
      // Disparar evento para avisar que scroll-reveal está pronto
      window.dispatchEvent(new Event('scrollRevealReady'))

      const resetInlineCleanupFlags = () => {
        const flagged = document.querySelectorAll(
          '[data-inline-transition-cleared],[data-inline-motion-cleared]'
        )
        flagged.forEach((el) => {
          el.removeAttribute('data-inline-transition-cleared')
          el.removeAttribute('data-inline-motion-cleared')
        })
      }

      const clearInlineTransition = (element: HTMLElement, delay = 0) => {
        if (element.dataset.inlineTransitionCleared === 'true') return
        window.setTimeout(() => {
          if (element.style.transition === 'none') {
            element.style.removeProperty('transition')
          }
          element.dataset.inlineTransitionCleared = 'true'
        }, delay)
      }

      const clearInlineMotion = (element: HTMLElement, delay = 0) => {
        if (element.dataset.inlineMotionCleared === 'true') return
        window.setTimeout(() => {
          element.style.removeProperty('animation')
          // ATUALIZADO: Para hero-image-inner, badges e border
          // IMPORTANTE: DEFINIR opacity: 1 em vez de REMOVER
          // porque remover faz o elemento voltar ao valor do JSX (opacity: 0)
          // o que causa o periodicCheck reaplicar transition: none
          if (
            element.classList.contains('hero-image') ||
            element.classList.contains('hero-image-inner') ||
            element.classList.contains('hero-badge-left') ||
            element.classList.contains('hero-badge-right') ||
            element.classList.contains('hero-border')
          ) {
            // CORREÇÃO: Manter opacity: 1 para evitar ciclo de reaplicação
            element.style.opacity = '1'
            // Remover transform para permitir hover effects funcionarem
            element.style.removeProperty('transform')
            // CRÍTICO: Também remover transition para não bloquear hover scale
            element.style.removeProperty('transition')
          }
          element.dataset.inlineMotionCleared = 'true'
        }, delay)
      }

      const resetHeroInlineStyles = () => {
        // ATUALIZADO: Limpar .hero-image, .hero-image-inner, badges e border
        document
          .querySelectorAll<HTMLElement>(
            '.hero-image, .hero-image-inner, .hero-badge-left, .hero-badge-right, .hero-border'
          )
          .forEach((el) => {
            el.style.removeProperty('animation')
            el.style.removeProperty('opacity')
            el.style.removeProperty('transform')
            el.style.removeProperty('transition')
            delete el.dataset.inlineMotionCleared
            delete el.dataset.inlineTransitionCleared
          })
      }
      const getNavigationType = () => {
        // Verificar se existe performance.navigation (método mais antigo)
        if (performance.navigation) {
          return performance.navigation.type
        }

        // Método mais moderno
        const navEntries = performance.getEntriesByType(
          'navigation'
        ) as PerformanceNavigationTiming[]
        if (navEntries.length > 0 && navEntries[0]) {
          return navEntries[0].type
        }

        return 'navigate' // fallback
      }

      /**
       * 🧠 DETECÇÃO DE TIPO DE NAVEGAÇÃO
       *
       * Determina se deve executar animações baseado no tipo de acesso:
       * - Primeira visita: URL digitada, refresh, nova aba
       * - Navegação interna: Clique em links internos, histórico
       */
      const isInternalNavigation = () => {
        const navigationType = getNavigationType()
        const wasInternalClick =
          sessionStorage.getItem('internalNavigation') === 'true'

        // Limpar flag de navegação interna
        sessionStorage.removeItem('internalNavigation')

        // Se foi um clique interno OU se o tipo é 'navigate' e temos histórico de estar no site
        return (
          wasInternalClick ||
          (navigationType === 'navigate' &&
            sessionStorage.getItem('hasVisitedSite') === 'true')
        )
      }

      // Detectar se é dispositivo móvel
      const isMobile = () => {
        return (
          window.innerWidth <= 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        )
      }

      // Página "Sobre" sempre executa animações, independente da navegação
      const isAboutPage = pathname === '/sobre'
      const shouldExecuteAnimations = isAboutPage || !isInternalNavigation()
      const isOnMobile = isMobile()

      /**
       * 🎯 SELETORES DE ELEMENTOS ANIMADOS
       *
       * Todos os elementos que participam do sistema de scroll reveal.
       * Para adicionar novos elementos, inclua suas classes aqui.
       *
       * IMPORTANTE:
       * - .hero-image: Container externo (não animado diretamente)
       * - .hero-image-inner: Wrapper interno com backdrop-filter (ANIMADO)
       * - .hero-badge-left, .hero-badge-right: Badges (+200 e 10+)
       * - .hero-border: Border animado ao redor do carrossel
       */
      const selectors =
        '.hero-title, .hero-subtitle, .hero-search, .hero-buttons, .hero-contact, .hero-image-inner, .hero-badge-left, .hero-badge-right, .hero-badge-bottom, .hero-badge-top-left, .hero-border, .hero-wave, ' +
        '.section-title, .section-subtitle, .category-card, .material-card, .benefit-card, ' +
        '.contact-form, .contact-info, .cta-section, .animate-on-scroll, .animate-on-scroll-delayed, .category-card-animate, ' +
        '[data-scroll-reveal], [data-fade-only]'

      const initializeElement = (element: HTMLElement) => {
        // CORREÇÃO: Garantir que elementos sejam inicializados como invisíveis
        // desde o primeiro momento para evitar flash inicial

        if (
          element.classList.contains('animate-on-scroll') ||
          element.classList.contains('animate-on-scroll-delayed') ||
          element.classList.contains('category-card-animate')
        ) {
          element.classList.remove('animate-in')
          // Garantir que elementos CSS-only também sejam invisíveis inicialmente
          element.style.opacity = '0'
          element.style.transform = 'translateY(60px)'
          element.style.transition = 'none'
        } else if (element.classList.contains('hero-wave')) {
          // Inicializar ondinha como invisível para animação de slide up
          element.style.opacity = '0'
          element.style.transform = 'translateY(20px)'
          element.style.transition = 'none'
        } else if (
          element.classList.contains('section-title') ||
          element.classList.contains('section-subtitle')
        ) {
          // Inicializar títulos e subtítulos de seção para animação
          element.style.opacity = '0'
          element.style.transform = 'translateY(60px)'
          element.style.transition = 'none'
        } else if (element.hasAttribute('data-scroll-reveal')) {
          // Inicializar elementos com data-scroll-reveal
          element.style.opacity = '0'
          element.style.transform = 'translate3d(0, 40px, 0)'
          element.style.transition = 'none'
          element.style.willChange = 'opacity, transform'
          element.style.backfaceVisibility = 'hidden'
        } else if (element.hasAttribute('data-fade-only')) {
          // Inicializar elementos que devem apenas fazer fade-in (sem slide)
          element.style.opacity = '0'
          element.style.transform = 'none'
          element.style.transition = 'opacity 0.8s ease-out'
          element.style.willChange = 'opacity'
        } else {
          // CORREÇÃO: Garantir que TODOS os elementos sejam invisíveis inicialmente
          element.style.opacity = '0'
          element.style.transform = 'translateY(60px)'
          element.style.transition = 'none'
        }
      }

      // Marcar que o usuário já visitou o site
      sessionStorage.setItem('hasVisitedSite', 'true')

      // Função para mostrar todos os elementos imediatamente (sem animação)
      const showAllElementsImmediately = () => {
        const animatedElements = document.querySelectorAll(selectors)

        animatedElements.forEach((element) => {
          const htmlElement = element as HTMLElement

          // CORREÇÃO: Identificar elementos hero que precisam manter hover effects
          const isHeroElement =
            htmlElement.classList.contains('hero-image') ||
            htmlElement.classList.contains('hero-image-inner') ||
            htmlElement.classList.contains('hero-badge-left') ||
            htmlElement.classList.contains('hero-badge-right') ||
            htmlElement.classList.contains('hero-border')

          // For new CSS-only classes, just add the animate-in class
          if (
            htmlElement.classList.contains('animate-on-scroll') ||
            htmlElement.classList.contains('animate-on-scroll-delayed') ||
            htmlElement.classList.contains('category-card-animate')
          ) {
            htmlElement.classList.add('animate-in')
          } else if (htmlElement.classList.contains('hero-wave')) {
            // Ondinha - mostrar imediatamente na navegação interna
            htmlElement.style.opacity = '1'
            htmlElement.style.transform = 'translateY(0)'
            htmlElement.style.animation = 'none'
            htmlElement.style.transition = 'none'
          } else if (isHeroElement) {
            // CORREÇÃO: Elementos hero - mostrar imediatamente MAS preservar transições
            // para que hover effects (como scale) continuem funcionando
            htmlElement.style.opacity = '1'
            htmlElement.style.animation = 'none'
            // NÃO aplicar transition: none aqui! Isso bloqueia hover scale
            // Também não modificar transform para preservar hover effects
          } else if (htmlElement.hasAttribute('data-scroll-reveal')) {
            // Elementos com data-scroll-reveal - mostrar imediatamente
            htmlElement.style.opacity = '1'
            htmlElement.style.transform = 'translate3d(0, 0, 0)'
            htmlElement.style.animation = 'none'
            htmlElement.style.transition = 'none'
            htmlElement.style.willChange = 'auto'
          } else if (htmlElement.hasAttribute('data-fade-only')) {
            // Elementos com fade-only - mostrar imediatamente
            htmlElement.style.opacity = '1'
            htmlElement.style.transform = 'none'
            htmlElement.style.animation = 'none'
            htmlElement.style.transition = 'none'
            htmlElement.style.willChange = 'auto'
          } else {
            // Legacy inline style approach
            htmlElement.style.opacity = '1'
            htmlElement.style.transform = 'translateY(0)'
            htmlElement.style.animation = 'none'
            htmlElement.style.transition = 'none'
          }

          // CORREÇÃO: Não chamar clearInlineTransition para elementos hero
          // pois isso pode interferir com hover effects
          if (!isHeroElement) {
            clearInlineTransition(htmlElement, 150)
          }

          // Chamar clearInlineMotion para elementos hero (agora corrigido para não remover opacity)
          if (isHeroElement) {
            clearInlineMotion(htmlElement, 150)
          }
        })

        // Também mostrar os contact-cards imediatamente
        const contactCards = document.querySelectorAll('.contact-card')
        contactCards.forEach((card) => {
          const htmlCard = card as HTMLElement
          htmlCard.style.opacity = '1'
          htmlCard.style.transform = 'translateX(0)'
          htmlCard.style.animation = 'none'
          clearInlineTransition(htmlCard, 150)
        })
      }

      // Função para inicializar elementos como invisíveis (para animação)
      const initializeElementsForAnimation = () => {
        const animatedElements = document.querySelectorAll(selectors)

        animatedElements.forEach((element) => {
          initializeElement(element as HTMLElement)
        })
      }

      // Função para configurar o observer (para animações)
      const setupObserver = () => {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement

              // Use CSS classes instead of inline styles to prevent hydration mismatches
              if (
                element.classList.contains('animate-on-scroll') ||
                element.classList.contains('animate-on-scroll-delayed') ||
                element.classList.contains('category-card-animate')
              ) {
                element.classList.add('animate-in')
                // Remover will-change após animação para performance
                setTimeout(() => {
                  element.style.willChange = 'auto'
                }, 800)
              }

              // Legacy support for existing classes with inline style animations
              else if (element.classList.contains('hero-title')) {
                element.style.animation =
                  'slideInLeft 1.2s ease-out 0.2s forwards'
              } else if (element.classList.contains('hero-subtitle')) {
                element.style.animation =
                  'slideInLeft 1s ease-out 0.4s forwards'
              } else if (element.classList.contains('hero-search')) {
                element.style.animation =
                  'slideInLeft 0.8s ease-out 0.6s forwards'
              } else if (element.classList.contains('hero-buttons')) {
                element.style.animation =
                  'slideInLeft 0.8s ease-out 0.8s forwards'
              } else if (element.classList.contains('hero-contact')) {
                element.style.animation =
                  'slideInLeft 0.6s ease-out 1s forwards'
              } else if (element.classList.contains('hero-image-inner')) {
                // ATUALIZADO: Aplicar animação no .hero-image-inner (não no .hero-image)
                element.style.animation =
                  'slideInRight 1.2s ease-out 0.3s forwards'
                clearInlineMotion(element, 1600)
              } else if (element.classList.contains('hero-badge-left')) {
                // Badge +200 - aparece da esquerda com delay
                element.style.animation =
                  'slideInLeft 0.6s ease-out 1s forwards'
                clearInlineMotion(element, 1700)
              } else if (element.classList.contains('hero-badge-right')) {
                // Badge 10+ - aparece da direita com delay
                element.style.animation =
                  'slideInRight 0.6s ease-out 1.2s forwards'
                clearInlineMotion(element, 1900)
              } else if (element.classList.contains('hero-border')) {
                // Border animado - vem junto com o bloco 3D, da direita para esquerda
                element.style.animation =
                  'slideInRight 1.2s ease-out 0.3s forwards'
                clearInlineMotion(element, 1600)
              } else if (element.classList.contains('hero-wave')) {
                element.style.animation = 'slideInUp 1.2s ease-out 0s forwards'
              }

              // Elementos com data-scroll-reveal
              else if (element.hasAttribute('data-scroll-reveal')) {
                element.style.animation =
                  'fadeInUpSmooth 0.6s ease-out 0.1s forwards'
                // Limpar will-change após animação para performance
                setTimeout(() => {
                  element.style.willChange = 'auto'
                }, 700)
              } else if (element.hasAttribute('data-fade-only')) {
                // Apenas opacidade, sem movimento
                requestAnimationFrame(() => {
                  element.style.transition = 'opacity 0.8s ease-out'
                  requestAnimationFrame(() => {
                    element.style.opacity = '1'
                  })
                })
                setTimeout(() => {
                  element.style.willChange = 'auto'
                }, 800)
              }

              // Títulos de seção - legacy
              else if (element.classList.contains('section-title')) {
                element.style.animation =
                  'slideInUp 0.8s ease-out 0.2s forwards'
              } else if (element.classList.contains('section-subtitle')) {
                element.style.animation =
                  'slideInUp 0.6s ease-out 0.4s forwards'
              }

              // Cards de benefícios - EFEITO ESCADA SEQUENCIAL
              else if (element.classList.contains('benefit-card')) {
                const parent = element.parentElement
                if (parent) {
                  const allCards = Array.from(
                    parent.querySelectorAll('.benefit-card')
                  )
                  const index = allCards.indexOf(element)
                  const delay = 0.2 + index * 0.15
                  element.style.animation = `slideInUp 0.7s ease-out ${delay}s forwards`
                }
              }

              // Cards de categoria - MESMO EFEITO DOS BENEFIT-CARDS
              else if (element.classList.contains('category-card')) {
                const parent = element.parentElement
                if (parent) {
                  const allCards = Array.from(
                    parent.querySelectorAll('.category-card')
                  )
                  const index = allCards.indexOf(element)
                  const delay = 0.2 + index * 0.15 // Mesmo delay dos benefit-cards para consistência
                  element.style.animation = `slideInUp 0.8s ease-out ${delay}s forwards`
                }
              }

              // Cards de materiais - EFEITO ESCADA SEQUENCIAL
              else if (element.classList.contains('material-card')) {
                const parent = element.parentElement
                if (parent) {
                  const allCards = Array.from(
                    parent.querySelectorAll('.material-card')
                  )
                  const index = allCards.indexOf(element)
                  const delay = 0.3 + index * 0.15
                  element.style.animation = `slideInUp 0.8s ease-out ${delay}s forwards`
                }
              }

              // Seção de contato
              else if (element.classList.contains('contact-form')) {
                element.style.animation =
                  'slideInLeft 1s ease-out 0.2s forwards'
              } else if (element.classList.contains('contact-info')) {
                const cards = element.querySelectorAll('.contact-card')
                cards.forEach((card, index) => {
                  const htmlCard = card as HTMLElement
                  htmlCard.style.opacity = '0'
                  htmlCard.style.transform = 'translateX(80px)'
                  htmlCard.style.animation = `slideInRight 0.8s ease-out ${0.4 + index * 0.1}s forwards`
                })
                element.style.animation =
                  'slideInRight 1s ease-out 0.2s forwards'
              }

              // CTA Section
              else if (element.classList.contains('cta-section')) {
                element.style.animation =
                  'fadeInUpSmooth 1.2s linear 0.3s forwards'
              }

              clearInlineTransition(element, 1800)
              observer.unobserve(element)
            }
          })
        }, observerOptions)

        return observer
      }

      // Lógica principal
      let observer: IntersectionObserver | null = null
      let mutation: MutationObserver | null = null
      let internalMutation: MutationObserver | null = null
      let periodicCheck: NodeJS.Timeout | null = null

      if (shouldExecuteAnimations) {
        /**
         * 🎬 MODO PRIMEIRA VISITA
         *
         * Executa animações completas para impressionar o usuário.
         * Configuração:
         * - Elementos inicializados como invisíveis IMEDIATAMENTE
         * - IntersectionObserver detecta viewport
         * - MutationObserver detecta novos elementos
         */

        // CORREÇÃO CRÍTICA: Inicializar elementos como invisíveis IMEDIATAMENTE
        // para evitar flash inicial
        resetInlineCleanupFlags()
        resetHeroInlineStyles()
        initializeElementsForAnimation()

        // Aguardar a hidratação antes de configurar observers
        setTimeout(() => {
          requestAnimationFrame(() => {
            observer = setupObserver()
            mutation = new MutationObserver((records) => {
              records.forEach((record) => {
                record.addedNodes.forEach((node) => {
                  if (node.nodeType === 1) {
                    const el = node as HTMLElement
                    if (el.matches(selectors)) {
                      initializeElement(el)
                      observer?.observe(el)
                    }
                    el.querySelectorAll(selectors).forEach((child) => {
                      initializeElement(child as HTMLElement)
                      observer?.observe(child as HTMLElement)
                    })
                  }
                })
              })
            })
            mutation.observe(document.body, { childList: true, subtree: true })

            // Delay menor para mobile para animações mais rápidas
            const observerDelay = isOnMobile ? 50 : 100

            setTimeout(() => {
              const elementsToObserve = document.querySelectorAll(selectors)

              elementsToObserve.forEach((element) => {
                observer?.observe(element)
              })
            }, observerDelay)
          })
        }, 50) // Delay reduzido para melhor performance
      } else {
        /**
         * ⚡ MODO NAVEGAÇÃO INTERNA
         *
         * Mostra elementos imediatamente para fluidez.
         * Sistemas de backup:
         * - Delay maior para elementos dinâmicos (200ms)
         * - MutationObserver para novos elementos
         * - Verificação periódica para elementos perdidos
         */
        // Delay maior para aguardar elementos carregados dinamicamente
        setTimeout(() => {
          resetInlineCleanupFlags()
          resetHeroInlineStyles()
          showAllElementsImmediately()
        }, 200)

        // Observer adicional para detectar novos elementos na navegação interna
        internalMutation = new MutationObserver((records) => {
          records.forEach((record) => {
            record.addedNodes.forEach((node) => {
              if (node.nodeType === 1) {
                const el = node as HTMLElement

                // Helper para verificar se é elemento hero
                const isHeroEl = (element: HTMLElement) =>
                  element.classList.contains('hero-image') ||
                  element.classList.contains('hero-image-inner') ||
                  element.classList.contains('hero-badge-left') ||
                  element.classList.contains('hero-badge-right') ||
                  element.classList.contains('hero-border')

                if (el.matches(selectors)) {
                  // Mostrar elemento imediatamente
                  if (el.classList.contains('hero-wave')) {
                    // Ondinha - garantir que apareça imediatamente
                    el.style.opacity = '1'
                    el.style.transform = 'translateY(0)'
                    el.style.animation = 'none'
                    el.style.transition = 'none'
                    clearInlineTransition(el, 150)
                  } else if (isHeroEl(el)) {
                    // CORREÇÃO: Elementos hero - mostrar mas preservar transições
                    el.style.opacity = '1'
                    el.style.animation = 'none'
                    // NÃO aplicar transition: none nem modificar transform!
                    clearInlineMotion(el, 150)
                  } else {
                    el.style.opacity = '1'
                    el.style.transform = 'translateY(0)'
                    el.style.animation = 'none'
                    el.style.transition = 'none'
                    clearInlineTransition(el, 150)
                    clearInlineMotion(el, 150)
                  }
                }
                el.querySelectorAll(selectors).forEach((child) => {
                  const htmlChild = child as HTMLElement
                  if (isHeroEl(htmlChild)) {
                    // CORREÇÃO: Elementos hero - mostrar mas preservar transições
                    htmlChild.style.opacity = '1'
                    htmlChild.style.animation = 'none'
                    clearInlineMotion(htmlChild, 150)
                  } else {
                    htmlChild.style.opacity = '1'
                    htmlChild.style.transform = 'translateY(0)'
                    htmlChild.style.animation = 'none'
                    htmlChild.style.transition = 'none'
                    clearInlineTransition(htmlChild, 150)
                    clearInlineMotion(htmlChild, 150)
                  }
                })
              }
            })
          })
        })

        internalMutation.observe(document.body, {
          childList: true,
          subtree: true,
        })

        // Verificação periódica para elementos carregados dinamicamente
        periodicCheck = setInterval(() => {
          const hiddenElements = document.querySelectorAll(
            `${selectors}[style*="opacity: 0"]`
          )
          hiddenElements.forEach((element) => {
            const htmlElement = element as HTMLElement

            // CORREÇÃO: Verificar se elemento já foi processado para evitar loop
            if (htmlElement.dataset.inlineMotionCleared === 'true') {
              // Elemento já foi processado, apenas garantir opacity: 1
              htmlElement.style.opacity = '1'
              return
            }

            // CORREÇÃO: Para elementos hero, não aplicar transition: none
            // pois isso bloqueia o hover scale effect
            const isHeroElement =
              htmlElement.classList.contains('hero-image') ||
              htmlElement.classList.contains('hero-image-inner') ||
              htmlElement.classList.contains('hero-badge-left') ||
              htmlElement.classList.contains('hero-badge-right') ||
              htmlElement.classList.contains('hero-border')

            htmlElement.style.opacity = '1'
            htmlElement.style.transform = 'translateY(0)'
            htmlElement.style.animation = 'none'

            // Só aplicar transition: none em elementos que não são hero
            if (!isHeroElement) {
              htmlElement.style.transition = 'none'
              clearInlineTransition(htmlElement, 150)
            }
            clearInlineMotion(htmlElement, 150)
          })
        }, 500)
      }

      // CORREÇÃO ESPECÍFICA: Garantir que a página sobre tenha scroll funcional mesmo com animações
      if (isAboutPage) {
        document.body.style.overflow = 'auto'
        document.documentElement.style.overflow = 'auto'
        document.body.style.position = 'relative'
        document.documentElement.style.position = 'relative'
        document.body.style.pointerEvents = 'auto'
        document.documentElement.style.pointerEvents = 'auto'
        document.body.style.touchAction = 'pan-y'
        document.documentElement.style.touchAction = 'pan-y'
      }

      /**
       * 🔄 SISTEMA DE ELEMENTOS DINÂMICOS
       *
       * Processa elementos carregados assincronamente (ex: FeaturedMaterials).
       * Funciona com componentes que usam ssr: false + API calls.
       *
       * Fluxo:
       * 1. Componente carrega e dispara evento 'featuredMaterialsLoaded'
       * 2. Sistema detecta evento e processa elementos
       * 3. Aplica comportamento baseado no tipo de navegação
       */
      const handleFeaturedMaterialsLoaded = () => {
        const featuredElements = document.querySelectorAll(
          '.section-title, .section-subtitle, .material-card'
        )

        if (shouldExecuteAnimations) {
          // Primeira visita: configurar para animação
          featuredElements.forEach((element) => {
            const htmlElement = element as HTMLElement
            if (
              htmlElement.classList.contains('section-title') ||
              htmlElement.classList.contains('section-subtitle')
            ) {
              htmlElement.style.opacity = '0'
              htmlElement.style.transform = 'translateY(60px)'
              htmlElement.style.transition = 'none'
              observer?.observe(htmlElement)
            }
          })
        } else {
          // Navegação interna: mostrar imediatamente
          featuredElements.forEach((element) => {
            const htmlElement = element as HTMLElement
            htmlElement.style.opacity = '1'
            htmlElement.style.transform = 'translateY(0)'
            htmlElement.style.animation = 'none'
            htmlElement.style.transition = 'none'
            clearInlineTransition(htmlElement, 150)
          })
        }
      }

      window.addEventListener(
        'featuredMaterialsLoaded',
        handleFeaturedMaterialsLoaded
      )

      // Cleanup function
      return () => {
        window.removeEventListener(
          'featuredMaterialsLoaded',
          handleFeaturedMaterialsLoaded
        )

        // Cleanup para primeira visita
        if (shouldExecuteAnimations) {
          observer?.disconnect()
          mutation?.disconnect()

          const allElements = document.querySelectorAll(selectors)
          allElements.forEach((element) => {
            const htmlElement = element as HTMLElement
            htmlElement.style.animation = 'none'
            htmlElement.classList.remove('animate-in')
          })
        }
        // Cleanup para navegação interna
        else {
          internalMutation?.disconnect()
          if (periodicCheck) {
            clearInterval(periodicCheck)
          }
        }
      }
    }

    const handleLoad = () => {
      const start = () => {
        requestAnimationFrame(() => {
          cleanup = run()
        })
      }
      if ('requestIdleCallback' in window) {
        ;(
          window as Window & {
            requestIdleCallback: (_callback: () => void) => void
          }
        ).requestIdleCallback(start)
      } else {
        setTimeout(start, 0)
      }
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      cleanup()
      window.removeEventListener('load', handleLoad)
    }
  }, [isHydrated, pathname])

  return null
}

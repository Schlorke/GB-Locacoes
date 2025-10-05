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
 * @version 2.0
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
       */
      const selectors =
        '.hero-title, .hero-subtitle, .hero-search, .hero-buttons, .hero-contact, .hero-image, ' +
        '.section-title, .section-subtitle, .category-card, .material-card, .benefit-card, ' +
        '.contact-form, .contact-info, .cta-section, .animate-on-scroll, .animate-on-scroll-delayed, .category-card-animate, ' +
        '[data-scroll-reveal]'

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

          // For new CSS-only classes, just add the animate-in class
          if (
            htmlElement.classList.contains('animate-on-scroll') ||
            htmlElement.classList.contains('animate-on-scroll-delayed') ||
            htmlElement.classList.contains('category-card-animate')
          ) {
            htmlElement.classList.add('animate-in')
          } else if (htmlElement.hasAttribute('data-scroll-reveal')) {
            // Elementos com data-scroll-reveal - mostrar imediatamente
            htmlElement.style.opacity = '1'
            htmlElement.style.transform = 'translate3d(0, 0, 0)'
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
        })

        // Também mostrar os contact-cards imediatamente
        const contactCards = document.querySelectorAll('.contact-card')
        contactCards.forEach((card) => {
          const htmlCard = card as HTMLElement
          htmlCard.style.opacity = '1'
          htmlCard.style.transform = 'translateX(0)'
          htmlCard.style.animation = 'none'
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
              } else if (element.classList.contains('hero-image')) {
                element.style.animation =
                  'slideInRight 1.2s ease-out 0.3s forwards'
              }

              // Elementos com data-scroll-reveal
              else if (element.hasAttribute('data-scroll-reveal')) {
                element.style.animation =
                  'fadeInUpSmooth 0.6s ease-out 0.1s forwards'
                // Limpar will-change após animação para performance
                setTimeout(() => {
                  element.style.willChange = 'auto'
                }, 700)
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
          showAllElementsImmediately()
        }, 200)

        // Observer adicional para detectar novos elementos na navegação interna
        internalMutation = new MutationObserver((records) => {
          records.forEach((record) => {
            record.addedNodes.forEach((node) => {
              if (node.nodeType === 1) {
                const el = node as HTMLElement
                if (el.matches(selectors)) {
                  // Mostrar elemento imediatamente
                  el.style.opacity = '1'
                  el.style.transform = 'translateY(0)'
                  el.style.animation = 'none'
                  el.style.transition = 'none'
                }
                el.querySelectorAll(selectors).forEach((child) => {
                  const htmlChild = child as HTMLElement
                  htmlChild.style.opacity = '1'
                  htmlChild.style.transform = 'translateY(0)'
                  htmlChild.style.animation = 'none'
                  htmlChild.style.transition = 'none'
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
            htmlElement.style.opacity = '1'
            htmlElement.style.transform = 'translateY(0)'
            htmlElement.style.animation = 'none'
            htmlElement.style.transition = 'none'
          })
        }, 500)
      }

      // CORREÇÃO ESPECÍFICA: Garantir que a página sobre tenha scroll funcional mesmo com animações
      if (isAboutPage) {
        // CORREÇÃO CRÍTICA: NÃO travar scroll no topo
        document.body.style.overflow = 'auto'
        document.documentElement.style.overflow = 'auto'

        // Garantir que não há travamento de scroll
        document.body.style.position = 'relative'
        document.documentElement.style.position = 'relative'

        // CORREÇÃO CRÍTICA: Permitir scroll imediatamente, mesmo durante animações
        document.body.style.pointerEvents = 'auto'
        document.documentElement.style.pointerEvents = 'auto'

        // Garantir que o scroll funcione mesmo com elementos animando
        document.body.style.touchAction = 'pan-y'
        document.documentElement.style.touchAction = 'pan-y'

        // CORREÇÃO FINAL: Garantir que o scroll funcione imediatamente SEM travamento
        setTimeout(() => {
          // Forçar scroll funcional após um pequeno delay
          document.body.style.overflow = 'auto'
          document.documentElement.style.overflow = 'auto'
          document.body.style.pointerEvents = 'auto'
          document.documentElement.style.pointerEvents = 'auto'

          // CORREÇÃO CRÍTICA: Garantir que não há travamento no topo
          window.scrollTo(0, 0)
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0

          // CORREÇÃO FINAL: Garantir que o scroll funcione perfeitamente
          document.body.style.overflow = 'auto'
          document.documentElement.style.overflow = 'auto'
        }, 50)

        // CORREÇÃO ADICIONAL: Garantir scroll funcional em intervalos
        setInterval(() => {
          if (document.body.style.overflow !== 'auto') {
            document.body.style.overflow = 'auto'
            document.documentElement.style.overflow = 'auto'
          }
        }, 100)

        // CORREÇÃO FINAL: Garantir que não há travamento de scroll
        window.addEventListener('scroll', () => {
          // Garantir que o scroll funcione perfeitamente
          document.body.style.overflow = 'auto'
          document.documentElement.style.overflow = 'auto'
        })
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

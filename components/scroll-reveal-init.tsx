"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Detectar o tipo de navegação
    const getNavigationType = () => {
      // Verificar se existe performance.navigation (método mais antigo)
      if (performance.navigation) {
        return performance.navigation.type;
      }

      // Método mais moderno
      const navEntries = performance.getEntriesByType(
        "navigation",
      ) as PerformanceNavigationTiming[];
      if (navEntries.length > 0) {
        return navEntries[0].type;
      }

      return "navigate"; // fallback
    };

    // Verificar se é navegação interna (clique em link do próprio site)
    const isInternalNavigation = () => {
      const navigationType = getNavigationType();
      const wasInternalClick =
        sessionStorage.getItem("internalNavigation") === "true";

      // Limpar flag de navegação interna
      sessionStorage.removeItem("internalNavigation");

      // Se foi um clique interno OU se o tipo é 'navigate' e temos histórico de estar no site
      return (
        wasInternalClick ||
        (navigationType === "navigate" &&
          sessionStorage.getItem("hasVisitedSite") === "true")
      );
    };

    // Detectar se é dispositivo móvel
    const isMobile = () => {
      return (
        window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      );
    };

    const shouldExecuteAnimations = !isInternalNavigation();
    const isOnMobile = isMobile();

    // Marcar que o usuário já visitou o site
    sessionStorage.setItem("hasVisitedSite", "true");

    // Função para mostrar todos os elementos imediatamente (sem animação)
    const showAllElementsImmediately = () => {
      const animatedElements = document.querySelectorAll(
        ".hero-title, .hero-subtitle, .hero-search, .hero-buttons, .hero-contact, .hero-image, " +
          ".section-title, .section-subtitle, .category-card, .material-card, .benefit-card, " +
          ".contact-form, .contact-info, .cta-section",
      );

      animatedElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.opacity = "1";
        htmlElement.style.transform = "translateY(0)";
        htmlElement.style.animation = "none";
        htmlElement.style.transition = "none";
      });

      // Também mostrar os contact-cards imediatamente
      const contactCards = document.querySelectorAll(".contact-card");
      contactCards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.opacity = "1";
        htmlCard.style.transform = "translateX(0)";
        htmlCard.style.animation = "none";
      });
    };

    // Função para inicializar elementos como invisíveis (para animação)
    const initializeElementsForAnimation = () => {
      const animatedElements = document.querySelectorAll(
        ".hero-title, .hero-subtitle, .hero-search, .hero-buttons, .hero-contact, .hero-image, " +
          ".section-title, .section-subtitle, .category-card, .material-card, .benefit-card, " +
          ".contact-form, .contact-info, .cta-section",
      );

      animatedElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.opacity = "0";
        htmlElement.style.transform = "translateY(60px)";
        htmlElement.style.transition = "none";
      });
    };

    // Função para configurar o observer (para animações)
    const setupObserver = () => {
      const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;

            // Restaurar transições antes de animar
            element.style.transition = "";

            // Animações do Hero - ajustadas para mobile
            if (element.classList.contains("hero-title")) {
              element.style.animation =
                "slideInLeft 1.2s ease-out 0.2s forwards";
            } else if (element.classList.contains("hero-subtitle")) {
              element.style.animation = "slideInLeft 1s ease-out 0.4s forwards";
            } else if (element.classList.contains("hero-search")) {
              element.style.animation =
                "slideInLeft 0.8s ease-out 0.6s forwards";
            } else if (element.classList.contains("hero-buttons")) {
              element.style.animation =
                "slideInLeft 0.8s ease-out 0.8s forwards";
            } else if (element.classList.contains("hero-contact")) {
              element.style.animation = "slideInLeft 0.6s ease-out 1s forwards";
            } else if (element.classList.contains("hero-image")) {
              element.style.animation =
                "slideInRight 1.2s ease-out 0.3s forwards";
            }

            // Títulos de seção
            else if (element.classList.contains("section-title")) {
              element.style.animation = "slideInUp 0.8s ease-out 0.2s forwards";
            } else if (element.classList.contains("section-subtitle")) {
              element.style.animation = "slideInUp 0.6s ease-out 0.4s forwards";
            }

            // Cards de categoria - EFEITO ESCADA SEQUENCIAL
            else if (element.classList.contains("category-card")) {
              const parent = element.parentElement;
              if (parent) {
                const allCards = Array.from(
                  parent.querySelectorAll(".category-card"),
                );
                const index = allCards.indexOf(element);
                const delay = 0.2 + index * 0.2;
                element.style.animation = `slideInUp 0.8s ease-out ${delay}s forwards`;
              }
            }

            // Cards de materiais - EFEITO ESCADA SEQUENCIAL
            else if (element.classList.contains("material-card")) {
              const parent = element.parentElement;
              if (parent) {
                const allCards = Array.from(
                  parent.querySelectorAll(".material-card"),
                );
                const index = allCards.indexOf(element);
                const delay = 0.3 + index * 0.15;
                element.style.animation = `slideInUp 0.8s ease-out ${delay}s forwards`;
              }
            }

            // Cards de benefícios - EFEITO ESCADA SEQUENCIAL
            else if (element.classList.contains("benefit-card")) {
              const parent = element.parentElement;
              if (parent) {
                const allCards = Array.from(
                  parent.querySelectorAll(".benefit-card"),
                );
                const index = allCards.indexOf(element);
                const delay = 0.2 + index * 0.15;
                element.style.animation = `slideInUp 0.7s ease-out ${delay}s forwards`;
              }
            }

            // Seção de contato
            else if (element.classList.contains("contact-form")) {
              element.style.animation = "slideInLeft 1s ease-out 0.2s forwards";
            } else if (element.classList.contains("contact-info")) {
              const cards = element.querySelectorAll(".contact-card");
              cards.forEach((card, index) => {
                const htmlCard = card as HTMLElement;
                htmlCard.style.opacity = "0";
                htmlCard.style.transform = "translateX(80px)";
                htmlCard.style.animation = `slideInRight 0.8s ease-out ${0.4 + index * 0.1}s forwards`;
              });
              element.style.animation =
                "slideInRight 1s ease-out 0.2s forwards";
            }

            // CTA Section
            else if (element.classList.contains("cta-section")) {
              element.style.animation =
                "fadeInUpSmooth 1.2s linear 0.3s forwards";
            }

            observer.unobserve(element);
          }
        });
      }, observerOptions);

      return observer;
    };

    // Lógica principal
    if (shouldExecuteAnimations) {
      // EXECUTAR ANIMAÇÕES: Refresh, URL digitada, nova aba, etc.
      console.log(
        "🎬 Executando animações - Refresh/URL/Nova aba",
        isOnMobile ? "(Mobile)" : "(Desktop)",
      );

      // Aguardar a hidratação antes de manipular o DOM
      setTimeout(() => {
        initializeElementsForAnimation();

        requestAnimationFrame(() => {
          const observer = setupObserver();

          // Delay menor para mobile para animações mais rápidas
          const observerDelay = isOnMobile ? 50 : 100;

          setTimeout(() => {
            const elementsToObserve = document.querySelectorAll(
              ".hero-title, .hero-subtitle, .hero-search, .hero-buttons, .hero-contact, .hero-image, " +
                ".section-title, .section-subtitle, .category-card, .material-card, .benefit-card, " +
                ".contact-form, .contact-info, .cta-section",
            );

            elementsToObserve.forEach((element) => {
              observer.observe(element);
            });
          }, observerDelay);
        });
      }, 50);
    } else {
      // NAVEGAÇÃO INTERNA: Mostrar tudo imediatamente
      console.log("🚀 Navegação interna - mostrando conteúdo imediatamente");

      setTimeout(() => {
        showAllElementsImmediately();
      }, 50);
    }

    // Cleanup function
    return () => {
      if (shouldExecuteAnimations) {
        const allElements = document.querySelectorAll(
          ".hero-title, .hero-subtitle, .hero-search, .hero-buttons, .hero-contact, .hero-image, " +
            ".section-title, .section-subtitle, .category-card, .material-card, .benefit-card, " +
            ".contact-form, .contact-info, .cta-section",
        );

        allElements.forEach((element) => {
          const htmlElement = element as HTMLElement;
          htmlElement.style.animation = "none";
        });
      }
    };
  }, [pathname]);

  return null;
}

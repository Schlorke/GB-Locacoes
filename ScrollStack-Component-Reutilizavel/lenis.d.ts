/**
 * Type definitions for Lenis smooth scroll library
 *
 * Copie este arquivo para: src/types/lenis.d.ts
 * ou adicione ao seu vite-env.d.ts
 */

declare module 'lenis' {
  export interface LenisOptions {
    /** Duration of scroll animation in seconds */
    duration?: number;
    /** Easing function */
    easing?: (t: number) => number;
    /** Enable smooth wheel scrolling */
    smoothWheel?: boolean;
    /** Touch scroll multiplier */
    touchMultiplier?: number;
    /** Enable infinite scrolling */
    infinite?: boolean;
    /** Wrapper element for custom container scroll */
    wrapper?: HTMLElement;
    /** Content element for custom container scroll */
    content?: HTMLElement;
    /** Gesture orientation handler */
    gestureOrientation?: 'vertical' | 'horizontal' | 'both';
    /** Normalize wheel delta */
    normalizeWheel?: boolean;
    /** Wheel scroll multiplier */
    wheelMultiplier?: number;
    /** Touch inertia multiplier */
    touchInertiaMultiplier?: number;
    /** Linear interpolation factor (0-1) */
    lerp?: number;
    /** Sync touch events */
    syncTouch?: boolean;
    /** Touch lerp factor */
    syncTouchLerp?: number;
    /** Touch inertia factor */
    touchInertia?: number;
    /** Auto resize observer */
    autoResize?: boolean;
    /** Prevent touch events */
    prevent?: (node: HTMLElement) => boolean;
    /** Virtual scroll */
    virtualScroll?: boolean;
  }

  export interface LenisScrollEvent {
    /** Current scroll position */
    scroll: number;
    /** Scroll limit */
    limit: number;
    /** Scroll velocity */
    velocity: number;
    /** Scroll direction: 1 for down, -1 for up */
    direction: number;
    /** Current progress (0-1) */
    progress: number;
  }

  export default class Lenis {
    /**
     * Creates a new Lenis instance
     * @param options - Configuration options
     */
    constructor(options?: LenisOptions);

    /**
     * Register event listener
     * @param event - Event name ('scroll')
     * @param callback - Callback function
     */
    on(event: 'scroll', callback: (e: LenisScrollEvent) => void): void;

    /**
     * Unregister event listener
     * @param event - Event name
     * @param callback - Callback function
     */
    off(event: string, callback: Function): void;

    /**
     * Request animation frame update
     * @param time - Current time
     */
    raf(time: number): void;

    /**
     * Scroll to a target position
     * @param target - Target position or element
     * @param options - Scroll options
     */
    scrollTo(
      target: number | string | HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        easing?: (t: number) => number;
        immediate?: boolean;
        lock?: boolean;
        force?: boolean;
        onComplete?: () => void;
      }
    ): void;

    /**
     * Start Lenis
     */
    start(): void;

    /**
     * Stop Lenis
     */
    stop(): void;

    /**
     * Destroy Lenis instance
     */
    destroy(): void;

    /**
     * Current scroll position
     */
    scroll: number;

    /**
     * Scroll limit
     */
    limit: number;

    /**
     * Target scroll position
     */
    targetScroll: number;

    /**
     * Scroll velocity
     */
    velocity: number;

    /**
     * Animation frame ID
     */
    animatedScroll: number;

    /**
     * Whether Lenis is stopped
     */
    isStopped: boolean;

    /**
     * Whether Lenis is scrolling
     */
    isScrolling: boolean;

    /**
     * Whether Lenis is smooth
     */
    isSmooth: boolean;

    /**
     * Scroll direction: 1 for down, -1 for up
     */
    direction: number;

    /**
     * Resize observer
     */
    resize(): void;

    /**
     * Emit event
     */
    emit(): void;

    /**
     * Set scroll position
     * @param scroll - Scroll position
     * @param options - Options
     */
    setScroll(scroll: number, options?: { immediate?: boolean }): void;
  }
}


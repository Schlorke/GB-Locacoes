/**
 * Type definitions for Lenis v1.3+
 * https://lenis.studiofreight.com/
 */

declare module 'lenis' {
  export interface LenisOptions {
    /**
     * Initial wrapper element
     */
    wrapper?: Window | HTMLElement

    /**
     * Element that contains the content
     */
    content?: HTMLElement

    /**
     * Element that will be used to listen to wheel events
     */
    wheelEventsTarget?: Window | HTMLElement

    /**
     * Element that will be used to listen to drag events
     */
    eventsTarget?: Window | HTMLElement

    /**
     * Smooth scroll duration
     * @default 1.2
     */
    duration?: number

    /**
     * Easing function used for smooth scroll
     * @default (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
     */
    easing?: (t: number) => number

    /**
     * Direction of scroll
     * @default 'vertical'
     */
    orientation?: 'vertical' | 'horizontal'

    /**
     * Direction of gesture
     * @default 'vertical'
     */
    gestureOrientation?: 'vertical' | 'horizontal' | 'both'

    /**
     * Enable smooth scrolling for mouse wheel events
     * @default true
     */
    smoothWheel?: boolean

    /**
     * Multiplier applied to mouse wheel events
     * @default 1
     */
    wheelMultiplier?: number

    /**
     * Enable smooth scrolling for touch events
     * @default false
     */
    smoothTouch?: boolean

    /**
     * Multiplier applied to touch events
     * @default 2
     */
    touchMultiplier?: number

    /**
     * Enable infinite scrolling
     * @default false
     */
    infinite?: boolean

    /**
     * Automatically resize on content change
     * @default true
     */
    autoResize?: boolean

    /**
     * Lerp intensity for smooth scrolling
     * @default 0.1
     */
    lerp?: number

    /**
     * Normalize wheel values
     * @default true
     */
    normalizeWheel?: boolean

    /**
     * Sync smooth scroll with native scroll
     * @default true
     */
    syncTouch?: boolean

    /**
     * Lerp intensity for touch scroll
     * @default 0.075
     */
    syncTouchLerp?: number
  }

  export default class Lenis {
    /**
     * Current scroll position
     */
    scroll: number

    /**
     * Scroll limit
     */
    limit: number

    /**
     * Current velocity
     */
    velocity: number

    /**
     * Direction of scroll (-1, 0, 1)
     */
    direction: number

    /**
     * Animation frame ID
     */
    animatedScroll: number

    /**
     * Target scroll position
     */
    targetScroll: number

    /**
     * Options used
     */
    options: LenisOptions

    /**
     * Create a new Lenis instance
     */
    constructor(options?: LenisOptions)

    /**
     * Destroy the Lenis instance
     */
    destroy(): void

    /**
     * Start the Lenis instance
     */
    start(): void

    /**
     * Stop the Lenis instance
     */
    stop(): void

    /**
     * Update the Lenis instance on each animation frame
     * @param time Current time in milliseconds
     */
    raf(time: number): void

    /**
     * Scroll to a specific position
     * @param target Target position or element
     * @param options Scroll options
     */
    scrollTo(
      target: number | string | HTMLElement,
      options?: {
        offset?: number
        lerp?: number
        duration?: number
        easing?: (t: number) => number
        immediate?: boolean
        lock?: boolean
        force?: boolean
        onComplete?: () => void
      }
    ): void

    /**
     * Listen to events
     * @param event Event name
     * @param callback Callback function
     */
    on(event: 'scroll', callback: (e: Lenis) => void): void

    /**
     * Remove event listener
     * @param event Event name
     * @param callback Callback function
     */
    off(event: 'scroll', callback: (e: Lenis) => void): void

    /**
     * Emit an event
     * @param event Event name
     */
    emit(event: string): void

    /**
     * Resize the Lenis instance
     */
    resize(): void
  }
}


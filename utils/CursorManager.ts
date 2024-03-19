import Viewport from './Viewport'

export type TCursor = {
  x: number
  y: number
}

type TCursorEvents =
  | 'mousedown'
  | 'mousemove'
  | 'mouseup'
  | 'mouseenter'
  | 'mouseleave'
  | 'touchstart'
  | 'touchmove'
  | 'touchend'

export default class CursorManager {
  // Public
  public el: HTMLElement | Window
  public enabled: boolean
  public viewport: Viewport
  public position: TCursor
  public normalized: TCursor
  public centered: TCursor

  // Private
  private _handleMouseDown: any
  private _handleMouseMove: any
  private _handleMouseUp: any
  private _handleMouseEnter: any
  private _handleMouseLeave: any
  private _handleTouchStart: any
  private _handleTouchMove: any
  private _handleTouchUp: any

  // Nuxt
  private $bus: any

  /**
   * Constructor
   */
  constructor(_options?: { el?: HTMLElement | Window }) {
    // Public
    this.el = _options?.el || window
    this.enabled = true
    this.viewport = new Viewport()

    this.position = { x: 0, y: 0 }
    this.normalized = { x: 0, y: 0 }
    this.centered = { x: 0, y: 0 }

    // Nuxt
    this.$bus = useNuxtApp().$bus

    // Init
    this._initBinds()
    this._initEvents()
  }

  /**
   * Get mobile events
   * @param e Touch event
   * @returns ClientX and ClientY
   */
  private _getMobileEvent(e: TouchEvent): TCursor {
    return {
      x:
        (e.touches && e.touches.length && e.touches[0].clientX) ||
        (e.changedTouches &&
          e.changedTouches.length &&
          e.changedTouches[0].clientX),
      y:
        (e.touches && e.touches.length && e.touches[0].clientY) ||
        (e.changedTouches &&
          e.changedTouches.length &&
          e.changedTouches[0].clientY),
    }
  }

  /**
   * Setup binds for the cursor
   */
  private _initBinds(): void {
    const getVec2Values = (e: MouseEvent): TCursor => ({
      x: e.clientX,
      y: e.clientY,
    })

    // Desktop
    this._handleMouseDown = (e: MouseEvent) =>
      this._onStart.bind(this)(getVec2Values(e))
    this._handleMouseMove = (e: MouseEvent) =>
      this._onMove.bind(this)(getVec2Values(e))
    this._handleMouseUp = (e: MouseEvent) =>
      this._onEnd.bind(this)(getVec2Values(e))
    this._handleMouseEnter = (e: MouseEvent) =>
      this._onMouseEnter.bind(this)(getVec2Values(e))
    this._handleMouseLeave = (e: MouseEvent) =>
      this._onMouseLeave.bind(this)(getVec2Values(e))

    // Mobile
    this._handleTouchStart = (e: TouchEvent) =>
      this._onStart.bind(this)(this._getMobileEvent(e))
    this._handleTouchMove = (e: TouchEvent) =>
      this._onMove.bind(this)(this._getMobileEvent(e))
    this._handleTouchUp = (e: TouchEvent) =>
      this._onEnd.bind(this)(this._getMobileEvent(e))
  }

  /**
   * Setup events for the cursor
   */
  private _initEvents(): void {
    // Desktop
    this.el.addEventListener('mousedown', this._handleMouseDown)
    this.el.addEventListener('mousemove', this._handleMouseMove)
    this.el.addEventListener('mouseup', this._handleMouseUp)
    this.el.addEventListener('mouseenter', this._handleMouseEnter)
    this.el.addEventListener('mouseleave', this._handleMouseLeave)

    // Mobile
    this.el.addEventListener('touchstart', this._handleTouchStart, {
      passive: true,
    })
    this.el.addEventListener('touchmove', this._handleTouchMove, {
      passive: true,
    })
    this.el.addEventListener('touchend', this._handleTouchUp, {
      passive: true,
    })
  }

  /**
   * On start
   * @param position Mouse position (x, y)
   */
  private _onStart(position: TCursor): void {
    this.position = position

    this._handleEvent('mousedown', { position })
    this._handleEvent('touchstart', { position })
  }

  /**
   * On move
   * @param position Mouse position (x, y)
   */
  private _onMove(position: TCursor): void {
    const delta = {
      x: this.position.x - position.x,
      y: this.position.y - position.y,
    }
    this.position = position

    this._handleEvent('mousemove', { position, delta })
    this._handleEvent('touchmove', { position, delta })
  }

  /**
   * On up
   * @param position Mouse position (x, y)
   */
  private _onEnd(position: TCursor): void {
    this._handleEvent('mouseup', { position })
    this._handleEvent('touchend', { position })
  }

  /**
   * On position enter
   * @param e Mouse event
   */
  private _onMouseEnter(position: TCursor): void {
    this._handleEvent('mouseenter', { position })
  }

  /**
   * On position leave
   * @param e  Mouse event
   */
  private _onMouseLeave(position: TCursor): void {
    this._handleEvent('mouseleave', { position })
  }

  /**
   * Handle the event
   * @param x X position
   * @param y Y position
   * @param event Event type
   */
  private _handleEvent(
    event: TCursorEvents,
    params: {
      position: TCursor
      delta?: TCursor
    }
  ): void {
    if (!this.enabled) return

    // Set the position position
    this.position = params.position

    // Normalized
    this.normalized.x = this.position.x / this.viewport.width
    this.normalized.y = 1.0 - this.position.y / this.viewport.height

    // Centered
    this.centered.x = (this.position.x / this.viewport.width) * 2 - 1
    this.centered.y = -(this.position.y / this.viewport.height) * 2 + 1

    // Emit event and pass the position, normalized and centered values
    this.$bus.emit(event, {
      normalized: this.normalized,
      centered: this.centered,
      ...params,
    })
  }

  /**
   * Destroy the cursor and remove all events
   */
  public destroy(): void {
    // Desktop
    this.el.removeEventListener('mousedown', this._handleMouseDown)
    this.el.removeEventListener('mousemove', this._handleMouseMove)
    this.el.removeEventListener('mouseup', this._handleMouseUp)
    this.el.removeEventListener('mouseenter', this._handleMouseEnter)
    this.el.removeEventListener('mouseleave', this._handleMouseLeave)

    // Mobile
    this.el.removeEventListener('touchstart', this._handleTouchStart)
    this.el.removeEventListener('touchmove', this._handleTouchMove)
    this.el.removeEventListener('touchend', this._handleTouchUp)
  }

  // Getters and setters

  /**
   * Check if the cursor is enabled
   */
  get isEnabled(): boolean {
    return this.enabled
  }

  /**
   * Disable the cursor
   */
  set setEnabled(state: boolean) {
    this.enabled = state
  }
}

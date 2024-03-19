import Viewport from './Viewport'

export type TVec2 = {
  x: number
  y: number
}

type TEvents =
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
  public enable: boolean
  public viewport: Viewport
  public mouse: TVec2
  public normalized: TVec2
  public centered: TVec2

  // Private
  private _handleMouseDown: any
  private _handleMouseMove: any
  private _handleMouseUp: any
  private _handleMouseEnter: any
  private _handleMouseLeave: any
  private _handleTouchStart: any
  private _handleTouchMove: any
  private _handleTouchUp: any

  // Plugins
  private $bus: any

  /**
   * Constructor
   */
  constructor() {
    // Public
    this.el = window
    this.enable = true
    this.viewport = new Viewport()
    this.mouse = { x: 0, y: 0 }
    this.normalized = { x: 0, y: 0 }
    this.centered = { x: 0, y: 0 }

    // Plugins
    this.$bus = useNuxtApp().$bus
  }

  /**
   * Get mobile events
   * @param e Touch event
   * @returns ClientX and ClientY
   */
  private _getMobileEvent(e: TouchEvent): TVec2 {
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
    // Desktop
    this._handleMouseDown = this._onMouseDown.bind(this)
    this._handleMouseMove = this._onMouseMove.bind(this)
    this._handleMouseUp = this._onMouseUp.bind(this)
    this._handleMouseEnter = this._onMouseEnter.bind(this)
    this._handleMouseLeave = this._onMouseLeave.bind(this)

    // Mobile
    this._handleTouchStart = this._onTouchStart.bind(this)
    this._handleTouchMove = this._onTouchMove.bind(this)
    this._handleTouchUp = this._onTouchUp.bind(this)
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
    this.el.addEventListener('touchend', this._handleTouchUp)
  }

  /**
   * On mouse down
   * @param e Mouse event
   */
  private _onMouseDown(e: MouseEvent): void {
    this._handleEvent(e.clientX, e.clientY, 'mousedown')
  }

  /**
   * On mouse move
   * @param e Mouse event
   */
  private _onMouseMove(e: MouseEvent): void {
    this._handleEvent(e.clientX, e.clientY, 'mousemove')
  }

  /**
   * On mouse up
   * @param e Mouse event
   */
  private _onMouseUp(e: MouseEvent): void {
    this._handleEvent(e.clientX, e.clientY, 'mouseup')
  }

  /**
   * On mouse enter
   * @param e Mouse event
   */
  private _onMouseEnter(e: MouseEvent): void {
    this._handleEvent(e.clientX, e.clientY, 'mouseenter')
  }

  /**
   * On mouse leave
   * @param e  Mouse event
   */
  private _onMouseLeave(e: MouseEvent): void {
    this._handleEvent(e.clientX, e.clientY, 'mouseleave')
  }

  /**
   * On touch start
   * @param e Touch event
   */
  private _onTouchStart(e: TouchEvent): void {
    const { x, y } = this._getMobileEvent(e)
    this._handleEvent(x, y, 'touchstart')
  }

  /**
   * On touch move
   * @param e Touch event
   */
  private _onTouchMove(e: TouchEvent): void {
    const { x, y } = this._getMobileEvent(e)
    this._handleEvent(x, y, 'touchmove')
  }

  /**
   * On touch up
   * @param e Touch event
   */
  private _onTouchUp(e: TouchEvent): void {
    const { x, y } = this._getMobileEvent(e)
    this._handleEvent(x, y, 'mouseup')
  }

  /**
   * Handle the event
   * @param x X position
   * @param y Y position
   * @param event Event type
   */
  private _handleEvent(x: number, y: number, event: TEvents): void {
    if (!this.enable) return

    // Set the mouse position
    this.mouse.x = x
    this.mouse.y = y

    // Normalized
    this.normalized.x = this.mouse.x / this.viewport.width
    this.normalized.y = 1.0 - this.mouse.y / this.viewport.height

    // Centered
    this.centered.x = (this.mouse.x / this.viewport.width) * 2 - 1
    this.centered.y = -(this.mouse.y / this.viewport.height) * 2 + 1

    // Emit event and pass the mouse, normalized and centered values
    this.$bus.emit(event, {
      mouse: this.mouse,
      normalized: this.normalized,
      centered: this.centered,
    })
  }

  /**
   * Setup cursor
   * @param el Element to attach the cursor events to
   */
  public init(el?: HTMLElement | Window): void {
    if (el) {
      this.el = el
    }
    this._initBinds()
    this._initEvents()
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
}

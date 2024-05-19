import type { TCursor } from './CursorManager'
import Viewport from './Viewport'

type TDragEvents = 'dragstart' | 'drag' | 'dragend' | 'tap'

export type TDragEvent = {
  position: TCursor
  delta: TCursor
  normalized: TCursor
  centered: TCursor
}

const TAP_TRESHOLD: number = 2

export default class DragManager extends EventEmitter {
  // Public
  public el: HTMLElement | Window
  public enabled: boolean
  public drag: boolean
  public viewport: Viewport
  public position: TCursor
  public normalized: TCursor
  public centered: TCursor
  public start: TCursor
  public delta: TCursor

  // Private
  private _handleMouseDown: any
  private _handleMouseMove: any
  private _handleMouseUp: any
  private _handleTouchStart: any
  private _handleTouchMove: any
  private _handleTouchUp: any

  /**
   * Constructor
   */
  constructor(_options?: { el?: HTMLElement | Window }) {
    super()

    // Public
    this.el = _options?.el || window
    this.enabled = true
    this.drag = false
    this.viewport = new Viewport()
    this.position = { x: 0, y: 0 }
    this.normalized = { x: 0, y: 0 }
    this.centered = { x: 0, y: 0 }
    this.start = { x: 0, y: 0 }
    this.delta = { x: 0, y: 0 }

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
    window.addEventListener('mousemove', this._handleMouseMove)
    window.addEventListener('mouseup', this._handleMouseUp)

    // Mobile
    this.el.addEventListener('touchstart', this._handleTouchStart, {
      passive: true,
    })
    window.addEventListener('touchmove', this._handleTouchMove, {
      passive: true,
    })
    window.addEventListener('touchend', this._handleTouchUp, {
      passive: true,
    })
  }

  /**
   * On start
   * @param position Mouse position (x, y)
   */
  private _onStart(position: TCursor): void {
    this.drag = true

    this.start = position
    this._handleEvent('dragstart', {
      position,
      delta: {
        x: 0,
        y: 0,
      },
    })
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
    this.delta = delta

    this.drag && this._handleEvent('drag', { position, delta })
  }

  /**
   * On up
   * @param position Mouse position (x, y)
   */
  private _onEnd(position: TCursor): void {
    const delta = this.delta
    const tap =
      Math.abs(position.x - this.start.x) < TAP_TRESHOLD &&
      Math.abs(position.y - this.start.y) < TAP_TRESHOLD

    if (this.drag && tap) {
      this._handleEvent('tap', { position, delta })
    } else {
      this._handleEvent('dragend', { position, delta })
    }

    this.drag = false
  }

  /**
   * Handle the event
   * @param x X position
   * @param y Y position
   * @param event Event type
   */
  private _handleEvent(
    event: TDragEvents,
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
    this.trigger(event, [
      {
        normalized: this.normalized,
        centered: this.centered,
        ...params,
      },
    ])
  }

  /**
   * Destroy the cursor and remove all events
   */
  public destroy(): void {
    // Desktop
    this.el.removeEventListener('mousedown', this._handleMouseDown)
    window.removeEventListener('mousemove', this._handleMouseMove)
    window.removeEventListener('mouseup', this._handleMouseUp)

    // Mobile
    this.el.removeEventListener('touchstart', this._handleTouchStart)
    window.removeEventListener('touchmove', this._handleTouchMove)
    window.removeEventListener('touchend', this._handleTouchUp)
  }

  // Getters and setters

  /**
   * Check if the cursor is enabled
   */
  get isEnabled(): boolean {
    return this.enabled
  }

  /**
   * Check if the cursor is dragging
   */
  get isDragging(): boolean {
    return this.drag
  }

  /**
   * Disable the cursor
   */
  set setEnabled(state: boolean) {
    this.enabled = state
  }
}

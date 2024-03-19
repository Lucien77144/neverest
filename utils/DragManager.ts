const TAP_TRESHOLD = 2

export default class DragManager {
  public el: HTMLElement
  public start: { x: number; y: number }
  public move: { x: number; y: number }
  public delta: { x: number; y: number }

  public enabled: boolean
  public drag: boolean

  private $bus: any
  public handleStart: any
  public handleMove: any
  public handleEnd: any

  constructor(options: { el: HTMLElement }) {
    // super()

    this.el = options.el
    this.start = { x: 0, y: 0 }
    this.move = { x: 0, y: 0 }
    this.delta = { x: 0, y: 0 }

    this.enabled = true
    this.drag = false
    this.$bus = useNuxtApp().$bus

    this.setup()
  }

  setup(): void {
    this.setupBinds()
    this.setupEvents()
  }

  /**
   * setupBinds is used to setup the binds
   */
  setupBinds(): void {
    this.handleStart = this.onStart.bind(this)
    this.handleMove = this.onMove.bind(this)
    this.handleEnd = this.onEnd.bind(this)
  }

  /**
   * setupEvents is used to setup the events
   */
  setupEvents(): void {
    this.el.addEventListener('touchstart', this.handleStart, {
      passive: true,
    })
    this.el.addEventListener('touchmove', this.handleMove, {
      passive: true,
    })
    this.el.addEventListener('touchend', this.handleEnd, {
      passive: true,
    })

    this.el.addEventListener('mousedown', this.handleStart)
    this.el.addEventListener('mousemove', this.handleMove)
    this.el.addEventListener('mouseup', this.handleEnd)
  }

  /**
   * onStart is called when the user starts dragging
   */
  onStart(e: MouseEvent | TouchEvent): void {
    this.drag = true

    const position = this.getPosition(e)

    const delta = { x: 0, y: 0 }

    this.move.x = position.x
    this.move.y = position.y

    this.start.x = position.x
    this.start.y = position.y

    this.trigger('touchdown', { position, delta })
    this.trigger('dragstart', { position, delta })
  }

  /**
   * onMove is called when the user is dragging
   */
  onMove(e: MouseEvent | TouchEvent) {
    if (!this.drag) return

    const position = this.getPosition(e)

    const delta = {
      x: this.move.x - position.x,
      y: this.move.y - position.y,
    }

    this.move.x = position.x
    this.move.y = position.y

    this.delta.x = delta.x
    this.delta.y = delta.y

    this.trigger('drag', { position, delta })
  }

  /**
   * onEnd is called when the user stops dragging
   */
  onEnd(): void {
    const position = this.move
    const delta = this.delta

    if (
      this.drag &&
      Math.abs(position.x - this.start.x) < TAP_TRESHOLD &&
      Math.abs(position.y - this.start.y) < TAP_TRESHOLD
    ) {
      this.trigger('tap', { position, delta })
    } else {
      this.trigger('dragend', { position, delta })
    }

    this.drag = false

    this.trigger('touchup', { position, delta })
  }

  /**
   * trigger is used to trigger an event
   * @param name
   * @param e
   */
  trigger(
    name: string,
    e: { position: { x: number; y: number }; delta: { x: number; y: number } }
  ): void {
    if (!this.isEnabled()) return

    this.$bus.emit(name, e)
  }

  /**
   * getPosition is used to get the position of the event
   * @param e
   * @returns
   */
  getPosition(e: MouseEvent | TouchEvent): { x: number; y: number } {
    const position = { x: 0, y: 0 }

    if ('touches' in e) {
      position.x = e.touches[0].clientX
      position.y = e.touches[0].clientY
    } else {
      position.x = e.clientX
      position.y = e.clientY
    }

    return position
  }

  /**
   * destroy is used to destroy the events
   */
  destroy(): void {
    this.el.removeEventListener('touchstart', this.handleStart)
    this.el.removeEventListener('touchmove', this.handleMove)
    this.el.removeEventListener('touchend', this.handleEnd)

    this.el.removeEventListener('mousedown', this.handleStart)
    this.el.removeEventListener('mousemove', this.handleMove)
    this.el.removeEventListener('mouseup', this.handleEnd)
  }

  isEnabled(): boolean {
    return this.enabled
  }

  isDragging(): boolean {
    return this.drag
  }

  disable(): void {
    this.enabled = false
  }

  enable(): void {
    this.enabled = true
  }
}

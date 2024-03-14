const TAP_TRESHOLD = 2

class DragManager {
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

  setupBinds(): void {
    this.handleStart = this.onStart.bind(this)
    this.handleMove = this.onMove.bind(this)
    this.handleEnd = this.onEnd.bind(this)
  }

  setupEvents(): void {
    this.el.addEventListener('touchstart', this.handleStart)
    window.addEventListener('touchmove', this.handleMove)
    window.addEventListener('touchend', this.handleEnd)

    this.el.addEventListener('mousedown', this.handleStart)
    window.addEventListener('mousemove', this.handleMove)
    window.addEventListener('mouseup', this.handleEnd)
  }

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

  trigger(
    name: string,
    e: { position: { x: number; y: number }; delta: { x: number; y: number } }
  ): void {
    if (!this.isEnabled()) return

    // this.dispatchEvent(name, e)
    this.$bus.emit(name, e)
  }

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

  destroy(): void{
    this.el.removeEventListener('touchstart', this.handleStart)
    window.removeEventListener('touchmove', this.handleMove)
    window.removeEventListener('touchend', this.handleEnd)

    this.el.removeEventListener('mousedown', this.handleStart)
    window.removeEventListener('mousemove', this.handleMove)
    window.removeEventListener('mouseup', this.handleEnd)
  }

  isEnabled(): boolean{
    return this.enabled
  }

  isDragging(): boolean{
    return this.drag
  }

  disable(): void{
    this.enabled = false
  }

  enable(): void{
    this.enabled = true
  }
}

export default DragManager


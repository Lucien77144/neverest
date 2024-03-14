import EventManager from '@/utils/EventManager'

const TAP_TRESHOLD = 2

class DragManager extends EventManager {
  el
  start = { x: 0, y: 0 }
  move = { x: 0, y: 0 }
  delta = { x: 0, y: 0 }

  enabled = true
  drag = false

  constructor(options) {
    super()

    this.el = options.el

    this.setup()
  }

  setup() {
    this.setupBinds()
    this.setupEvents()
  }

  setupBinds() {
    this.handleStart = this.onStart.bind(this)
    this.handleMove = this.onMove.bind(this)
    this.handleEnd = this.onEnd.bind(this)
  }

  setupEvents() {
    this.el.addEventListener('touchstart', this.handleStart)
    window.addEventListener('touchmove', this.handleMove)
    window.addEventListener('touchend', this.handleEnd)

    this.el.addEventListener('mousedown', this.handleStart)
    window.addEventListener('mousemove', this.handleMove)
    window.addEventListener('mouseup', this.handleEnd)
  }

  onStart(e) {
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

  onMove(e) {
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

  onEnd() {
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

  trigger(name, e) {
    if (!this.isEnabled()) return

    this.dispatchEvent(name, e)
  }

  getPosition(e) {
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

  destroy() {
    this.el.removeEventListener('touchstart', this.handleStart)
    window.removeEventListener('touchmove', this.handleMove)
    window.removeEventListener('touchend', this.handleEnd)

    this.el.removeEventListener('mousedown', this.handleStart)
    window.removeEventListener('mousemove', this.handleMove)
    window.removeEventListener('mouseup', this.handleEnd)
  }

  isEnabled() {
    return this.enabled
  }

  isDragging() {
    return this.drag
  }

  disable() {
    this.enabled = false
  }

  enable() {
    this.enabled = true
  }
}

export default DragManager

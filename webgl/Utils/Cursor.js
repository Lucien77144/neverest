import { Vector2 } from 'three'
import Viewport from '~/utils/Viewport'

class Cursor {
  viewport = new Viewport()

  mouse = new Vector2()
  normalized = new Vector2()
  centered = new Vector2()

  // Plugins
  $bus = useNuxtApp().$bus

  enable = true

  setup (el = window, debug) {
    this.el = el

    this.setupBinds()
    this.setupEvents()
  }

  setupBinds () {
    this.handleMouseDown = this.onMouseDown.bind(this)
    this.handleMouseMove = this.onMouseMove.bind(this)
    this.handleMouseUp = this.onMouseUp.bind(this)

    this.handleTouchStart = this.onTouchStart.bind(this)
    this.handleTouchMove = this.onTouchMove.bind(this)
    this.handleTouchUp = this.onTouchUp.bind(this)
  }

  setupEvents () {
    this.el.addEventListener('mousedown', this.handleMouseDown)
    this.el.addEventListener('mousemove', this.handleMouseMove)
    this.el.addEventListener('mouseup', this.handleMouseUp)

    this.el.addEventListener('touchstart', this.handleTouchStart)
    this.el.addEventListener('touchmove', this.handleTouchMove)
    this.el.addEventListener('touchend', this.handleTouchUp)
  }

  destroy () {
    this.el.removeEventListener('mousedown', this.handleMouseDown)
    this.el.removeEventListener('mousemove', this.handleMouseMove)
    this.el.removeEventListener('mouseup', this.handleMouseUp)

    this.el.removeEventListener('touchstart', this.handleTouchStart)
    this.el.removeEventListener('touchmove', this.handleTouchMove)
    this.el.removeEventListener('touchend', this.handleTouchUp)
  }

  onMouseDown (e) {
    this.handleEvent(e.clientX, e.clientY, 'mousedown')
  }

  onMouseMove (e) {
    this.handleEvent(e.clientX, e.clientY, 'mousemove')
  }

  onMouseUp (e) {
    this.handleEvent(e.clientX, e.clientY, 'click')
  }

  onTouchStart (e) {
    this.handleEvent(((e.touches && e.touches.length) && e.touches[0].clientX) || ((e.changedTouches && e.changedTouches.length) && e.changedTouches[0].clientX), ((e.touches && e.touches.length) && e.touches[0].clientY) || ((e.changedTouches && e.changedTouches.length) && e.changedTouches[0].clientY), 'touchstart')
  }

  onTouchMove (e) {
    this.handleEvent(((e.touches && e.touches.length) && e.touches[0].clientX) || ((e.changedTouches && e.changedTouches.length) && e.changedTouches[0].clientX), ((e.touches && e.touches.length) && e.touches[0].clientY) || ((e.changedTouches && e.changedTouches.length) && e.changedTouches[0].clientY), 'touchmove')
  }

  onTouchUp (e) {
    this.handleEvent(((e.touches && e.touches.length) && e.touches[0].clientX) || ((e.changedTouches && e.changedTouches.length) && e.changedTouches[0].clientX), ((e.touches && e.touches.length) && e.touches[0].clientY) || ((e.changedTouches && e.changedTouches.length) && e.changedTouches[0].clientY), 'click')
  }

  handleEvent (x, y, event) {
    if (!this.enable) return

    this.mouse.x = x
    this.mouse.y = y

    this.normalized.x = this.mouse.x / this.viewport.width
    this.normalized.y = 1.0 - this.mouse.y / this.viewport.height

    this.centered.x = (this.mouse.x / this.viewport.width) * 2 - 1
    this.centered.y = -(this.mouse.y / this.viewport.height) * 2 + 1

    const e = {
      mouse: this.mouse,
      normalized: this.normalized,
      centered: this.centered
    }

    this.$bus.emit(event, e)
  }
}

export default Cursor

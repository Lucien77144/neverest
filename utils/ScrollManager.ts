import { MathUtils } from 'three'
import { isDeviceMobile } from '~/utils/functions/device'
import DragManager, { type TDragEvent } from './DragManager'

export type TScrollEvent = {
  delta: number
  current: number
  target: number
}

export default class ScrollManager extends EventEmitter {
  // Public
  public disabled: boolean
  public speed: number
  public factor: number
  public delta: number
  public target: number
  public current: number

  // Private
  private _dragManager: DragManager
  private _handleScroll: any
  private _handleUpdate: any

  // Plugin
  private $bus: any

  constructor() {
    super()

    // Plugin
    this.$bus = useNuxtApp().$bus

    // Get elements from experience
    this.disabled = false
    this.speed = 0.05
    this.delta = 0
    this.target = 0
    this.factor = 0.3
    this.current = 0
    this._dragManager = new DragManager()

    // Init
    this._init()
  }

  // ---------------------
  // Public methods
  // ---------------------

  /**
   * Set the scroll speed
   * @param val Speed value
   */
  public setSpeed(val: number) {
    this.speed = val
  }

  /**
   * Set the scroll factor
   * @param val Factor value
   */
  public setFactor(val: number) {
    this.factor = val
  }

  /**
   * Disable/Enable the scroll manager
   * @param val Disable value
   */
  public setDisable(val: boolean) {
    this.disabled = val
  }

  /**
   * Go to a scroll position instantly
   * @param val Scroll position
   * @param instant If set to true, the scroll will be instant (default: true)
   */
  public to(val: number, instant: boolean = true) {
    this.target = val
    if (instant) {
      this.current = val
    }
  }

  // ---------------------
  // Private methods
  // ---------------------

  /**
   * Set scroll detection events
   */
  private _setScrollEvents() {
    let prev = -1
    const firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    const isMobile = isDeviceMobile()

    if (isMobile) {
      this._handleScroll = (e: TDragEvent) => {
        if (this.disabled) return

        this.delta = e.delta.y * 10

        this._updateTarget()
        this._emit()
      }

      this._dragManager.on('drag', this._handleScroll)
    } else if (firefox) {
      this._handleScroll = (e: WheelEvent) => {
        if (this.disabled) return

        this.delta =
          Math.sign(e.detail * 15) == Math.sign(prev) ? e.detail * 15 : 0
        prev = e.detail

        this._updateTarget()
        this._emit()
      }

      window.addEventListener('DOMMouseScroll', this._handleScroll)
    } else {
      this._handleScroll = (e: WheelEvent) => {
        if (this.disabled) return

        this.delta = e.deltaY

        this._updateTarget()
        this._emit()
      }

      window.addEventListener('wheel', this._handleScroll)
    }
  }

  /**
   * Scroll function to override
   */
  private _emit() {
    this.trigger('scroll', {
      delta: this.delta,
      current: this.current,
      target: this.target,
    })
  }

  /**
   * Set update event
   */
  private _setUpdate() {
    this._handleUpdate = this._update.bind(this)
    this.$bus.on('tick', this._handleUpdate)
  }

  /**
   * Update target value
   */
  private _updateTarget() {
    this.target += this.delta * (this.factor / 100)
    this.target = MathUtils.clamp(this.target, 0, 100)
  }

  /**
   * Init the scroll manager
   */
  private _init() {
    this._setScrollEvents()
    this._setUpdate()
  }

  /**
   * Update values
   */
  private _update() {
    if (this.disabled) return

    const prev = this.current
    const current = MathUtils.lerp(this.current, this.target, this.speed)
    this.current = Math.floor(current * 1000) / 1000

    if (this.current !== prev) this._emit()
  }

  /**
   * Destroy the scroll manager
   */
  public destroy() {
    this._dragManager.destroy()
    window.removeEventListener('DOMMouseScroll', this._handleScroll)
    window.removeEventListener('wheel', this._handleScroll)
  }
}

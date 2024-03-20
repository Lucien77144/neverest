import {
  isDeviceMobile,
  isDeviceMobileOrTablet,
} from '~/utils/functions/device'
import { breakpoint, breakpoints } from '~/utils/functions/breakpoints'
import dpr from '~/utils/functions/dpr'
import isTouch from '~/utils/functions/isTouch'

export default class Viewport {
  // Singleton
  static _instance: Viewport

  // Public
  public debug!: boolean
  public isTouch!: boolean
  public isMobile!: boolean
  public isTablet!: boolean
  public isDesktop!: boolean
  public breakpoint!: string
  public interval!: number
  public rem!: number
  public width!: number
  public height!: number
  public ratio!: number
  public dpr!: number

  // Private
  private _handleResize: any

  // Nuxt
  private $bus: any
  private $router: any

  /**
   * Constructor
   */
  constructor() {
    if (Viewport._instance) {
      return Viewport._instance
    }
    Viewport._instance = this

    // Private
    this._handleResize = this.resize.bind(this)
    window.addEventListener('resize', this._handleResize, false)

    // Nuxt
    this.$bus = useNuxtApp().$bus
    this.$router = useNuxtApp().$router

    // Init
    this.setData()
  }

  /**
   * Set data of the viewport
   */
  public setData(): void {
    this.debug = this.$router.currentRoute.value.href.includes('debug')
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight
    this.ratio = this.width / this.height
    this.dpr = dpr()
    this.isTouch = isTouch()
    this.isMobile = isDeviceMobile()
    this.isTablet = !isDeviceMobile() && isDeviceMobileOrTablet()
    this.isDesktop = !isDeviceMobile() && !isDeviceMobileOrTablet()
    this.breakpoint = breakpoint(this.width)
    this.interval = breakpoints[this.breakpoint]
    this.rem = (window.innerWidth / breakpoints[this.breakpoint]) * 10
  }

  /**
   * Resize
   */
  public resize(): void {
    this.setData()

    this.$bus.emit('resize')
  }

  /**
   * Destroy viewport
   */
  public destroy(): void {
    this.$bus.off('resize', this.resize)
    window.removeEventListener('resize', this._handleResize, false)
  }
}

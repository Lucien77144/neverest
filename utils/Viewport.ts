import { isDeviceMobile, isDeviceMobileOrTablet } from '@/utils/device'
import { breakpoint, breakpoints } from '@/utils/breakpoints'
import dpr from '@/utils/dpr'
import isTouch from '@/utils/isTouch'

export default class Viewport {
  public isTouch: boolean
  public isMobile: boolean
  public isTablet: boolean
  public isDesktop: boolean
  public breakpoint: string
  public interval: number
  public rem: number
  public width: number
  public height: number
  public ratio: number
  public dpr: number
  public handleResize: any
  public $bus: any

  constructor() {
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
    this.$bus = useNuxtApp().$bus

    this.handleResize = this.resize.bind(this)
    window.addEventListener('resize', this.handleResize)
  }

  /**
   * setData is used to set the data
   */
  public setData(): void {
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
   * getData is used to get the data
   */
  public getData(): {
    width: number
    height: number
    ratio: number
    dpr: number
    isTouch: boolean
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
    breakpoint: string
    interval: number
    rem: number
  } {
    return {
      width: this.width,
      height: this.height,
      ratio: this.ratio,
      dpr: this.dpr,
      isTouch: this.isTouch,
      isMobile: this.isMobile,
      isTablet: this.isTablet,
      isDesktop: this.isDesktop,
      breakpoint: this.breakpoint,
      interval: breakpoints[this.breakpoint],
      rem: (window.innerWidth / breakpoints[this.breakpoint]) * 10,
    }
  }

  public resize(): void {
    this.setData()

    this.$bus.emit('resize', this.getData())
  }

  public destroy(): void {
    window.removeEventListener('resize', this.handleResize)
  }
}

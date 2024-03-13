import Singleton from '@/vendor/singleton'
import EventManager from '@/utils/EventManager'
import { isDeviceMobile, isDeviceMobileOrTablet } from '@/utils/device'
import { breakpoint, breakpoints } from '@/utils/breakpoints'
import dpr from '@/utils/dpr'
import isTouch from '@/utils/isTouch'

class Viewport extends Singleton(EventManager) {
  isTouch = isTouch()
  isMobile = isDeviceMobile()
  isTablet = !isDeviceMobile() && isDeviceMobileOrTablet()
  isDesktop = !isDeviceMobile() && !isDeviceMobileOrTablet()
  breakpoint = breakpoint(window.innerWidth)
  interval = breakpoints[this.breakpoint]
  rem = window.innerWidth / breakpoints[this.breakpoint] * 10

  __constructor () {
    this.setData()

    this.handleResize = this.resize.bind(this)

    window.addEventListener('resize', this.handleResize)
  }

  setData () {
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
    this.rem = window.innerWidth / breakpoints[this.breakpoint] * 10
  }

  getData () {
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
      rem: window.innerWidth / breakpoints[this.breakpoint] * 10
    }
  }

  resize () {
    this.setData()

    this.dispatchEvent('resize', this.getData())
  }

  destroy () {
    window.removeEventListener('resize', this.handleResize)
  }
}

export default Viewport

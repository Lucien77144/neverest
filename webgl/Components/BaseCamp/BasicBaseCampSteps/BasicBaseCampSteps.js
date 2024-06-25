import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class BasicBaseCampSteps extends BasicItem {
  /**
   * Constructor
   */
  constructor({ visibility = [0, 25.87], CSSVisibility, active = true }) {
    super()
    // Get elements from Experience
    this.$bus = this.experience.$bus

    // Elements
    this.visibility = visibility
    this.CSSVisibility = CSSVisibility ?? visibility
    this.isActive = active
    this.isActiveCSS = active
    this.ready = false
  }

  /**
   * Toggle active
   */
  toggleActive() {
    this.isActive = !this.isActive
    this.setActive()
  }

  /**
   * Toggle active
   */
  toggleActiveCSS() {
    this.isActiveCSS = !this.isActiveCSS
    this.setActiveCSS()
  }

  /**
   * Set active
   */
  setActive(active = this.isActive) {
    this.isActive = active
    this.item.visible = this.isActive

    if (this.isActive) {
      this.$bus.emit('audio:1953')

      Object.values(this.components).forEach((c) => {
        if (c.name === 'Floor1953') return
        c.onMouseMove = false
      })
    } else {
      Object.values(this.components).forEach((c) => {
        if (c.name === 'Floor1953') return
        c.onMouseMove = undefined
      })
    }
  }

  /**
   * Set active CSS
   */
  setActiveCSS(active = this.isActiveCSS) {
    setTimeout(() => {
      this.isActiveCSS = active
      this.item.traverse((c) => {
        if (c.isCSS2DObject) c.visible = this.isActiveCSS
      })
    })
  }

  /**
   * After the scene has rendered
   */
  onAfterRender() {
    this.setActive()
    this.setActiveCSS()
  }
}

import { MathUtils } from 'three'
import Experience from '../Experience.js'

export default class ScrollManager {
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.debug = this.experience.debug

    // New elements
    this.debugFolder = null
    this.target = 0
    this.current = 0
    this.speed = 0.05
    this.factor = 0.005
    this.velocity = 0

    this.scrollEvent()

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Scroll',
        closed: false,
      })

      this.debugFolder.addBinding(this, 'factor', {
        label: 'Scroll Factor',
        min: 0,
        max: 0.01,
        step: 0.001,
      })
    }
  }

  scrollEvent() {
    window.addEventListener('mousewheel', (e) => {
      this.target += e.deltaY * this.factor
      console.log(this.factor)
    })
  }

  update() {
    this.velocity = this.current - this.target
    this.current = MathUtils.lerp(this.current, this.target, this.speed)
  }
}

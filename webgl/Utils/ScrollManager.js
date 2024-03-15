import { MathUtils } from 'three'
import Experience from '../Experience.js'

export default class ScrollManager {
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.debug = this.experience.debug

    // New elements
    this.debugFolder = null
    this.speed = 0.1
    this.factor = 0.005
    this.velocity = 0

    // Actions
    this.setScroll = useScrollStore().setCurrent
    this.setTarget = useScrollStore().setTarget

    // Getters
    this.currentScroll = computed(() => useScrollStore().getCurrent)
    this.targetScroll = computed(() => useScrollStore().getTarget)

    // Init
    this.init()
  }

  /**
   * Init the scroll manager
   */
  init() {
    window.addEventListener('wheel DOMMouseScroll', (e) => {
      var delta
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        if (e.originalEvent.detail > 0) {
          //scroll down
          delta = 0.2
        } else {
          //scroll up
          delta = 0
        }
      } else {
        if (e.originalEvent.wheelDelta < 0) {
          //scroll down
          delta = 0.2
        } else {
          //scroll up
          delta = 0
        }
      }
      this.setTarget(this.targetScroll.value + delta * this.factor)
    })

    // Debug
    if (this.debug) this.setDebug()
  }

  /**
   * Set debug
   */
  setDebug() {
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

    this.debugFolder.addBinding(this, 'speed', {
      label: 'Speed',
      min: 0,
      max: 0.25,
      step: 0.001,
    })
  }

  /**
   * Update values
   */
  update() {
    this.velocity = this.currentScroll.value - this.targetScroll.value

    this.setScroll(
      MathUtils.lerp(
        this.currentScroll.value,
        this.targetScroll.value,
        this.speed
      )
    )
  }
}

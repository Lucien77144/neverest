import { MathUtils } from 'three'
import { isDeviceMobile } from '~/utils/functions/device'
import Experience from '../Experience.js'

export default class ScrollManager {
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.debug = this.experience.debug
    this.$bus = this.experience.$bus

    // DragManager
    this.dragManager = new DragManager()

    // New elements
    this.debugFolder = null
    this.delta = 0

    // Actions
    this.setScroll = useScrollStore().setCurrent
    this.setTarget = useScrollStore().setTarget
    this.setSpeed = useScrollStore().setSpeed
    this.setFactor = useScrollStore().setFactor

    // Getters
    this.currentScroll = computed(() => useScrollStore().getCurrent)
    this.targetScroll = computed(() => useScrollStore().getTarget)
    this.speedScroll = computed(() => useScrollStore().getSpeed)
    this.factorScroll = computed(() => useScrollStore().getFactor)

    // Init
    this.init()
  }

  /**
   * Set debug
   */
  setDebug() {
    this.debugFolder = this.debug.addFolder({
      title: 'Scroll',
      closed: false,
    })

    this.debugFolder
      .addBinding({ factor: this.factorScroll.value }, 'factor', {
        label: 'Factor',
        min: 0,
        max: 1,
        step: 0.001,
      })
      .on('change', ({ value }) => this.setFactor(value))

    this.debugFolder
      .addBinding({ speed: this.speedScroll.value }, 'speed', {
        label: 'Speed',
        min: 0,
        max: 1,
        step: 0.001,
      })
      .on('change', ({ value }) => this.setSpeed(value))
  }

  /**
   * Init the scroll manager
   */
  init() {
    let prev = -1
    const firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    const isMobile = isDeviceMobile()

    const setScroll = (e) => {
      this.setTarget(
        this.targetScroll.value + this.delta * (this.factorScroll.value / 100)
      )
      this.$bus.emit('scroll', this.delta)
    }

    if (isMobile) {
      this.dragManager.on('drag', (e) => {
        this.delta = e.delta.y * 10
        setScroll()
      })
    } else if (firefox) {
      window.addEventListener('DOMMouseScroll', (e) => {
        this.delta =
          Math.sign(e.detail * 15) == Math.sign(prev) ? e.detail * 15 : 0
        prev = e.detail
        setScroll()
      })
    } else {
      window.addEventListener('wheel', (e) => {
        this.delta = e.deltaY
        setScroll()
      })
    }

    // Debug
    if (this.debug) this.setDebug()
  }

  /**
   * Update values
   */
  update() {
    this.setScroll(
      MathUtils.lerp(
        this.currentScroll.value,
        this.targetScroll.value,
        this.speedScroll.value
      )
    )
  }
}

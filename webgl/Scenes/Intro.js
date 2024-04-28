import BasicScene from '../Modules/Basics/BasicScene'
import IntroGroup from '../Components/Intro/IntroGroup/IntroGroup'
import CSS2DRenderer from '../Utils/CSS2DManager'

export default class Intro extends BasicScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      introGroup: new IntroGroup(),
    }

    this.audios = {
      // onichan: { group: 'Cringe', loop: true, volume: 0.5 },
      // yameteAh: { group: 'Cringe', loop: true, volume: 0.25 },
      babyshark: { group: 'Enfants', loop: true, volume: 0.3, persist: true },
      tedTalk: { group: 'Enfants', loop: true, volume: 0.3, persist: true },
    }

    // Init the scene
    this.init()
  }

  /**
   * On scroll
   * @param {*} delta
   */
  onScroll(delta) {
    this.camera.instance.position.z += delta / 100
  }

  /**
   * Init
   */
  init() {
    super.init()
    this.cssRenderer = new CSS2DRenderer(this.scene, this.camera)
  }

  /**
   * After init and entrance transition end
   */
  afterTransitionInit() {
    super.afterTransitionInit()
    this.components.introGroup.setLabelRenderer()
  }

  /**
   * Dispose
   */
  onDisposeStart() {
    this.cssRenderer?.dispose?.()
  }
}

import BasicScene from '../Modules/Basics/BasicScene'
import IntroGroup from '../Components/Intro/IntroGroup/IntroGroup'
import CSSRenderer from '../Utils/CSSRenderer'

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
    this.cssRenderer = new CSSRenderer(this.scene, this.camera)
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

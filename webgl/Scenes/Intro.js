import BasicScene from '../Modules/Basics/BasicScene'
import IntroGroup from '../Components/Intro/IntroGroup/IntroGroup'

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
   * On transition start, before the dispose
   */
  onDisposeStart() {
    this.components.introGroup?.labelRenderer?.dispose?.()
  }

  /**
   * After init and entrance transition end
   */
  afterTransitionInit() {
    this.components.introGroup.setLabelRenderer()
  }
}

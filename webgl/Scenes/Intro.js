import BasicScene from '../Modules/Basics/BasicScene'
import IntroGroup from '../Components/Intro/IntroGroup/IntroGroup'

export default class Intro extends BasicScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // Components
    this.components = {
      introGroup: new IntroGroup(),
    }

    // Audios
    this.audios = {
      babyshark: { group: 'Enfants', loop: true, volume: 0.3, persist: true },
      tedTalk: { group: 'Enfants', loop: true, volume: 0.3, persist: true },
    }

    // Init the scene
    this.init()
  }

  // --------------------------------
  // Workflow
  // --------------------------------

  /**
   * On scroll
   * @param {*} delta
   */
  onScroll(delta) {
    this.camera.instance.position.z += delta / 100
  }

  // --------------------------------
  // Lifecycle
  // --------------------------------

  /**
   * On switch between scene complete and this scene is the new one
   */
  onInitComplete() {
    super.onInitComplete()
    this.$bus.emit('title:disable', false)
  }

  /**
   * On transition start, before the dispose
   */
  onDisposeStart() {
    this.$bus.emit('title:disable', true)
  }
}

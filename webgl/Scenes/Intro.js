import BasicScene from '../Modules/Basics/BasicScene'
import IntroGroup from '../Components/Intro/IntroGroup/IntroGroup'

export default class Intro extends BasicScene {
  /**
   * Constructor
   */
  constructor({ infos }) {
    super(infos)

    // Components
    this.components = {
      introGroup: new IntroGroup(),
    }

    // Init the scene
    this.init()
    this.setCam()
  }

  /**
   * Set camera
   */
  setCam() {
    this.camera.instance.position.set(0, 0, 13)
    this.camera.instance.lookAt(0, 0, 0)
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

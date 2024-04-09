import Mountain from '../Components/Intro/Mountain/Mountain'
import BasicScene from '../Modules/Basics/BasicScene'

export default class Intro extends BasicScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      mountain: new Mountain(),
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
}

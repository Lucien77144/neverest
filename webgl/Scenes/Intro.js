import Mountain from '../Components/Mountain/Mountain'
import BaseScene from '../Modules/Basics/BasicScene'

export default class Intro extends BaseScene {
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
}

import Mountain from '../Components/Mountain/Mountain'
import BaseScene from '../Modules/Bases/BaseScene'

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

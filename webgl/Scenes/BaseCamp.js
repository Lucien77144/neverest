import Cube from '../Components/Cube/Cube'
import Floor from '../Components/Floor/Floor'
import BaseScene from '../Modules/Bases/BaseScene'

export default class BaseCamp extends BaseScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      floor: new Floor(),
      cube: new Cube(),
    }

    // Init the scene
    this.init()
  }
}

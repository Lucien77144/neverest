import Cube from '../Components/Shared/Cube/Cube'
import Floor from '../Components/Shared/Floor/Floor'
import BasicScene from '../Modules/Basics/BasicScene'

export default class BaseCamp extends BasicScene {
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

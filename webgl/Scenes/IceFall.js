import RockyCube from '../Components/Icefall/Cube/RockyCube'
import Floor from '../Components/Shared/Floor/Floor'
import BasicScene from '../Modules/Basics/BasicScene'

export default class IceFall extends BasicScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      floor: new Floor(),
      cube: new RockyCube(),
    }

    // Init the scene
    this.init()
  }
}

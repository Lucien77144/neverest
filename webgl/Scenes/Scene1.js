import Cube from '../Components/Cube/Cube'
import Floor from '../Components/Floor/Floor'
import BaseScene from '../Modules/Bases/BaseScene'

export default class Scene1 extends BaseScene {
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

    this._init()
  }
}

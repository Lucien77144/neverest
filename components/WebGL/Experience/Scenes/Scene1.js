import Cube from '../Components/Cube/Cube'
import Floor from '../Components/Floor/Floor'
import Scene from '../Utils/Scene'

export default class Scene1 extends Scene {
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

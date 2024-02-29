import Floor2 from '../Components/Floor2/Floor2'
import Scene from '../Utils/Scene'

export default class Scene2 extends Scene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      floor: new Floor2(),
    }

    this._init()
  }
}

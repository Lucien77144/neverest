import Floor2 from '../Components/Floor2/Floor2'
import BaseScene from '../Modules/Bases/BaseScene'

export default class Scene2 extends BaseScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      floor: new Floor2(),
    }

    this.init()
  }
}

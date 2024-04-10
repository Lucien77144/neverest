import Cube2 from '../Components/Shared/Cube2/Cube2'
import Floor2 from '../Components/Shared/Floor2/Floor2'
import BasicScene from '../Modules/Basics/BasicScene'

export default class Scene2 extends BasicScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      floor: new Floor2(),
      cube: new Cube2(),
    }

    // Init the scene
    this.init()
  }
}

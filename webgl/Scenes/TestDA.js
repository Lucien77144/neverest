import ModelsContainerTestDA from '../Components/TestDA/ModelsContainerTestDA/ModelsContainerTestDA'
import ModelTestDA from '../Components/TestDA/ModelsContainerTestDA/ModelsContainerTestDA'
import PlaneTestDA from '../Components/TestDA/PlaneTestDA/PlaneTestDA'
import BasicScene from '../Modules/Basics/BasicScene'

export default class TestDA extends BasicScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      planeDA: new PlaneTestDA(),
      //modelDA: new ModelsContainerTestDA()
    }

    // Init the scene
    this.init()
  }

  // --------------------------------
  // Workflow
  // --------------------------------

  // --------------------------------
  // Lifecycle
  // --------------------------------

  init() {
    super.init()

    this.camera.instance.position.z = 40
  }
}

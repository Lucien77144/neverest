import CubeTestDA from "../Components/TestDA/CubeTestDA/CubeTestDA"
import PlaneTestDA from "../Components/TestDA/PlaneTestDA/PlaneTestDA"
import BasicScene from "../Modules/Basics/BasicScene"

export default class TestDA extends BasicScene {
    /**
     * Constructor
     */
    constructor() {
      super()
  
      // New elements
      this.components = {
        planeDA:new PlaneTestDA(),
      }
  
  
      // Init the scene
      this.init()
    }
    
    init() {
      super.init()

      this.camera.instance.position.z = 40
    }
  }
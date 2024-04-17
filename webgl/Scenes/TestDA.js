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
        boxDA:new CubeTestDA()
      }
  
  
      // Init the scene
      this.init()
    }

    
  }
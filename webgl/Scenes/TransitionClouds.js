import CloudsGroup from '../Components/TransitionClouds/CloudsGroup/CloudsGroup'
import BasicScene from '../Modules/Basics/BasicScene'


export default class TransitionClouds extends BasicScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // Components
    this.components = {
      clouds:new CloudsGroup()
    }



    // Init the scene
    this.init()
  }

  
}
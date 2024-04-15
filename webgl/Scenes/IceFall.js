import RockyCube from '../Components/Icefall/Cube/RockyCube'
import Floor from '../Components/Shared/Floor/Floor'
import BasicScene from '../Modules/Basics/BasicScene'
import { types, val } from '@theatre/core'

export default class IceFall extends BasicScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // Get elements from experience
    this.project = this.experience.project

    // New elements
    this.components = {
      floor: new Floor(),
      cube: new RockyCube(),
    }
    this.sheet = null
    this.icefallObj = null

    // Init the scene
    this.init()
  }

  /**
   * Setup the theater sheet
   */
  setupSheet() {
    // Setup the sheet
    this.sheet = this.project.sheet('IceFall')
    this.icefallObj = this.sheet.object('IceFall', {})
  }

  /**
   * Init
   */
  init() {
    super.init()
    this.setupSheet()
  }
}

import Iceblocks from '../Components/Icefall/Iceblocks/Iceblocks'
import Mountains from '../Components/Icefall/Mountains/Mountains'
import Lights from '../Components/Shared/Lights/Lights'
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
      lights: new Lights(),
      moutains: new Mountains(),
      iceblocks: new Iceblocks(),
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

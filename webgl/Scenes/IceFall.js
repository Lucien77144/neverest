import { MathUtils, Vector3 } from 'three'
import IFFloor from '../Components/Icefall/IFFloor/IFFloor'
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
      floor: new IFFloor(),
    }
    this.sheet = null
    this.icefallObj = null
    this.baseCamRot = null
    this.camRotTarget = null

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
   * On mouse move in the window
   * @param {*} param0
   */
  onMouseMoveEvt({ centered }) {
    super.onMouseMoveEvt({ centered })

    this.camRotTarget = {
      x: this.baseCamRot.x + centered.y * 0.01,
      y: this.baseCamRot.y - centered.x * 0.01,
    }
  }

  /**
   * Set the camera
   */
  initCamera() {
    this.camera.instance.position.set(0.31, 28, 60)
    this.camera.instance.lookAt(new Vector3((Math.PI * 75) / 180, 10, 0))
    this.baseCamRot = this.camera.instance.rotation.clone()
    this.camRotTarget = this.baseCamRot.clone()
  }

  /**
   * Update
   */
  update() {
    super.update()

    this.camera.instance.rotation.x = MathUtils.lerp(
      this.camera.instance.rotation.x,
      this.camRotTarget?.x,
      0.1
    )
    this.camera.instance.rotation.y = MathUtils.lerp(
      this.camera.instance.rotation.y,
      this.camRotTarget?.y,
      0.1
    )
  }

  /**
   * Init
   */
  init() {
    super.init()
    this.setupSheet()
    this.initCamera()
  }
}

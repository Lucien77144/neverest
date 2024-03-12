import { PerspectiveCamera } from 'three'
import Experience from '../../Experience'

export default class Camera {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.config = this.experience.config
    this.debug = this.experience.debug

    // New elements
    this.instance = null
    this.debugFolder = null

    // Init
    this.init()
  }

  /**
   * Init the camera
   */
  init() {
    this.instance = new PerspectiveCamera(
      75,
      this.config.width / this.config.height,
      0.1,
      100
    )
    this.instance.position.z = 10
  }

  /**
   * Update the camera
   */
  update() {
    if (!this.instance) return

    this.instance.updateMatrixWorld()
  }

  /**
   * Resize the camera
   */
  resize() {
    if (!this.instance) return

    this.instance.aspect = this.config.width / this.config.height
    this.instance.updateProjectionMatrix()
  }
}
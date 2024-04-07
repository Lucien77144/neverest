import { AudioListener, PerspectiveCamera } from 'three'
import Experience from '../../Experience'

export default class BasicCamera {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.viewport = this.experience.viewport
    this.debug = this.experience.debug

    // New elements
    this.instance = null
    this.listener = null
    this.debugFolder = null

    // Init
    this.init()
  }

  /**
   * Set listener
   */
  setInstance() {
    this.instance = new PerspectiveCamera(
      75,
      this.viewport.width / this.viewport.height,
      0.1,
      100
    )
    this.instance.position.z = 10
  }

  /**
   * Set listener
   */
  setListener() {
    this.listener = new AudioListener()
    this.instance.add(this.listener)
  }

  /**
   * Set debug
   */
  setDebug() {
    this.debugFolder = this.debug.addFolder({
      title: 'Camera',
    })

    const position = this.instance.position
    this.debugFolder
      .addBinding(
        {
          camera: {
            x: position.x,
            y: position.y,
            z: position.z,
          },
        },
        'camera',
        { label: 'Position' },
        {
          x: { min: -20, max: 20, step: 0.01, value: position.x },
          y: { min: -20, max: 20, step: 0.01, value: position.y },
          z: { min: -20, max: 20, step: 0.01, value: position.z },
        }
      )
      .on('change', ({ value }) => {
        this.instance.position.set(value.x, value.y, value.z)
      })
  }

  /**
   * Init the camera
   */
  init() {
    this.setInstance()
    this.setListener()
    this.debug && this.setDebug()
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

    this.instance.aspect = this.viewport.width / this.viewport.height
    this.instance.updateProjectionMatrix()
  }

  /**
   * Dispose the camera
   */
  dispose() {
    if (!this.instance) return

    this.debugFolder && this.debug.remove(this.debugFolder)
    this.instance = null
    this.listener = null
  }
}

import { AudioListener, PerspectiveCamera } from 'three'
import Experience from '../../Experience'

export default class BasicCamera {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.$bus = this.experience.$bus
    this.viewport = this.experience.viewport
    this.debug = this.experience.debug

    // New elements
    this.instance = null
    this.listener = null
    this.debugFolder = null

    // Init
    this.init()
  }

  // --------------------------------
  // Workflow
  // --------------------------------

  /**
   * Set listener
   */
  setInstance() {
    this.instance = new PerspectiveCamera(
      20,
      this.viewport.width / this.viewport.height,
      0.1,
      500
    )
    this.instance.position.z = 10
  }

  /**
   * Set listener
   */
  setListener() {
    this.listener = new AudioListener()
    this.instance.add(this.listener)

    this.$bus.on('audio:mute', () => {
      this.listener.setMasterVolume(0)
    })

    this.$bus.on('audio:unmute', () => {
      this.listener.setMasterVolume(1)
    })
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

  // --------------------------------
  // Lifecycle
  // --------------------------------

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

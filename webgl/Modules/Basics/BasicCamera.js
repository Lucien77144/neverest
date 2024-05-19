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
    this.audioManager = this.experience.audioManager

    // New elements
    this.pendingAudios = []

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
    this.$bus.on('audio:mute', () => {
      this.listener?.setMasterVolume(0)
    })

    this.$bus.on('audio:unmute', () => {
      if (!this.listener) {
        this.listener = new AudioListener()
        this.instance.add(this.listener)

        this.pendingAudios.forEach(({ audios, parent }) =>
          this.addAudios(audios, parent)
        )
        this.pendingAudios = []
      }
      this.listener.setMasterVolume(1)
    })
  }

  /**
   * Add a audio to the scene
   * @param {*} audios Object of audios
   * @param {*} parent Parent of the audio (if set)
   */
  addAudios(audios = {}, parent = null) {
    if (!this.listener) {
      this.pendingAudios = [...this.pendingAudios, { audios, parent }]
      return
    }

    Object.keys(audios)?.forEach((name) => {
      audios[name] = this.audioManager.add({
        name,
        ...audios[name],
        ...(parent && audios[name].parent !== false && { parent }),
        listener: this.listener,
      })
    })
  }

  /**
   * Remove audios from the scene
   * @param {*} audios Object of audios
   */
  removeAudios(audios = {}, force = false) {
    // Filter by persist and no parents
    const toRemove = Object.keys(audios).filter(
      (name) => !audios[name].persist || force
    )

    toRemove?.forEach((name) => this.audioManager.remove(name))
  }

  /**
   * Set debug
   */
  setDebug() {
    this.debugFolder = this.debug.panel.addFolder({
      expanded: false,
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

    // Audios
    this.pendingAudios && this.removeAudios(this.pendingAudios)

    // Debug
    this.debugFolder && this.debug.panel.remove(this.debugFolder)

    // Instance & listener
    this.instance = null
    this.listener = null
  }
}

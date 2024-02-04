import Experience from './Experience'
import * as THREE from 'three'

export default class Renderer {
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.config = this.experience.config
    this.debug = this.experience.debug
    this.time = this.experience.time
    this.scene = this.experience.scene
    this.camera = this.experience.camera.instance

    // New elements
    this.instance = null
    this.debugFolder = null
    this.clearColor = {
      color: '#ff0000',
      alpha: 1,
    }

    // Init
    this._init()
  }

  /**
   * Set debug
   */
  _setDebug() {
    this.debugFolder = this.debug.addFolder({
      title: 'Renderer',
    })

    this.debugFolder
      .addInput(this, 'clearColor', { view: 'color' }, { label: 'Clear Color' })
      .on('change', () => {
        this.instance.setClearColor(this.clearColor, 1)
      })
  }

  /**
   * Init the renderer
   */
  _init() {
    // Renderer
    this.instance = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })

    // Setters
    this.instance.setClearColor(this.clearColor.color, this.clearColor.alpha)
    this.instance.setSize(this.config.width, this.config.height)
    this.instance.setPixelRatio(this.config.pixelRatio)

    // Options
    this.instance.physicallyCorrectLights = true
    this.instance.outputColorSpace = THREE.SRGBColorSpace
    this.instance.toneMapping = THREE.NoToneMapping
    this.instance.toneMappingExposure = 1

    // Debug
    if (this.debug) this._setDebug()

    // Append canvas
    this.experience.container.appendChild(this.instance.domElement)
  }

  /**
   * Resize the renderer
   */
  resize() {
    this.instance.setSize(this.config.width, this.config.height)
    this.instance.setPixelRatio(this.config.pixelRatio)
  }

  /**
   * Update the renderer
   */
  update() {
    this.instance.render(this.scene, this.camera)
  }
}

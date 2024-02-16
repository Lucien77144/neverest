import Experience from './Experience'
import * as THREE from 'three'

export default class Renderer {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.config = this.experience.config
    this.debug = this.experience.debug
    this.time = this.experience.time
    this.scene = this.experience.scene
    this.camera = this.experience.camera.instance
    this.stats = this.experience.stats

    // New elements
    this.instance = null
    this.context = null
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
      .addBinding(this.clearColor, 'color', { view: 'color' })
      .on('change', () => {
        this.instance.setClearColor(this.clearColor.color, 1)
      })

    // Panels
    if (this.stats) {
      this.stats.setRenderPanel(this.context)
    }
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

    // Context
    this.context = this.instance.getContext()

    // Debug
    if (this.debug) this._setDebug()

    // Append canvas
    this.experience.targetElement.appendChild(this.instance.domElement)
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
    this.stats?.beforeRender()
    this.instance.render(this.scene, this.camera)
    this.stats?.afterRender()
  }
}

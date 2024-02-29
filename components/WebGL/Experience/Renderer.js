import * as THREE from 'three'
import Experience from './Experience'
import vertexShader from './Shaders/vertexShader.vert?raw'
import fragmentShader from './Shaders/fragmentShader.frag?raw'
import { TRANSITIONS } from './Utils/SceneManager'

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
    this.sceneManager = this.experience.sceneManager
    this.stats = this.experience.stats

    // New elements
    this.instance = null
    this.camera = null
    this.rt0 = null
    this.rt1 = null
    this.renderMesh = null
    this.context = null
    this.debugFolder = null
    this.clearColor = {
      color: '#ff039a',
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
        this.instance.setClearColor(
          new THREE.Color(this.clearColor.color),
          this.clearColor.alpha
        )
      })

    // Panels
    if (this.stats) {
      this.stats.setRenderPanel(this.context)
    }
  }

  /**
   * Set the camera instance ONLY USED TO RENDER THE SCENE ON THE MESH
   */
  _setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.config.width / this.config.height,
      0.1,
      100
    )
  }

  /**
   * Set render targets and mesh
   */
  _setRenderTargets() {
    const size = this.instance.getDrawingBufferSize(new THREE.Vector2())
    this.rt0 = new THREE.WebGLRenderTarget(size.width, size.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false,
      samples: 4,
    })

    this.rt1 = this.rt0.clone()
  }

  /**
   * Set the render mesh
   */
  _setRenderMesh() {
    this.renderMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: {
          uScene0: new THREE.Uniform(this.rt0.texture),
          uScene1: new THREE.Uniform(this.rt1.texture),
          uTransition: new THREE.Uniform(),
          uTemplate: new THREE.Uniform(TRANSITIONS.FADE),
          uTime: new THREE.Uniform(0),
        },
        vertexShader,
        fragmentShader,
      })
    )
  }

  /**
   * Set the renderer instance
   */
  _setInstance(canvas) {
    // Renderer
    this.instance = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      stencil: false,
      alpha: false,
      depth: true,
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
  }

  /**
   * Render the targets and the mesh
   */
  _renderTargets() {
    // Get elements from experience
    const active = this.sceneManager.active
    const next = this.sceneManager.next

    // Scene1
    this.instance.setRenderTarget(this.rt0)
    this.instance.render(active.scene, active.camera.instance)

    // Transition
    if (next) {
      this.instance.setRenderTarget(this.rt1)
      this.instance.render(next.scene, next.camera.instance)
    }

    // RenderMesh
    this.instance.setRenderTarget(null)
    this.instance.render(this.renderMesh, this.camera)
  }

  /**
   * Init the renderer
   */
  _init() {
    this._setCamera()
    this._setInstance(this.experience.canvas)
    this._setRenderTargets()
    this._setRenderMesh()

    // Debug
    if (this.debug) this._setDebug()
  }

  /**
   * Update the renderer
   */
  update() {
    this.stats?.beforeRender()

    this._renderTargets()
    if (this.renderMesh?.material.uniforms.uTime) {
      this.renderMesh.material.uniforms.uTime.value = this.time.elapsed
    }

    this.stats?.afterRender()
  }

  /**
   * Resize the renderer
   */
  resize() {
    this.camera.aspect = this.config.width / this.config.height
    this.camera.updateProjectionMatrix()

    this.instance.setSize(this.config.width, this.config.height)
    this.instance.setPixelRatio(this.config.pixelRatio)

    const size = this.instance.getDrawingBufferSize(new THREE.Vector2())
    this.rt0.setSize(size.width, size.height)
    this.rt1.setSize(size.width, size.height)
  }

  /**
   * Dispose the renderer
   */
  dispose() {
    this.instance.renderLists.dispose()
    this.instance.dispose()
    this.rt0.dispose()
    this.rt1.dispose()
  }
}

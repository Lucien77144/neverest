import {
  ACESFilmicToneMapping,
  Color,
  LinearFilter,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  RGBAFormat,
  SRGBColorSpace,
  ShaderMaterial,
  Uniform,
  Vector2,
  WebGLRenderTarget,
  WebGLRenderer,
} from 'three'
import Experience from '../../Experience'
import vertexShader from './shaders/vertexShader.vert?raw'
import fragmentShader from './shaders/fragmentShader.frag?raw'

export default class Renderer {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.viewport = this.experience.viewport
    this.debug = this.experience.debug
    this.time = this.experience.time
    this.stats = this.experience.stats
    this.$bus = this.experience.$bus

    // New elements
    this.instance = null
    this.camera = null
    this.rt0 = null
    this.rt1 = null
    this.renderMesh = null
    this.context = null
    this.debugFolder = null
    this.clearColor = {
      color: '#C7C6C8',
      alpha: 0,
    }

    // Events
    this.handleMouseMoveEvt = this.onMouseMoveEvt.bind(this)

    // Init
    this.init()
  }

  // --------------------------------
  // Workflow
  // --------------------------------

  /**
   * Set debug
   */
  setDebug() {
    this.debugFolder = this.debug.panel.addFolder({
      expanded: false,
      title: 'Renderer',
    })

    this.debugFolder
      .addBinding(this.clearColor, 'color', { view: 'color' })
      .on('change', () => {
        this.instance.setClearColor(
          new Color(this.clearColor.color),
          this.clearColor.alpha
        )
      })

    this.debugFolder.addBinding(this.instance, 'toneMappingExposure', {
      label: 'Tone Mapping Exposure',
      min: 0,
      max: 10,
      step: 0.01,
    })

    this.debugFolder.addBinding(this.instance, 'toneMapping', {
      label: 'Tone Mapping',
      options: {
        None: 0,
        Linear: 1,
        Reinhard: 2,
        Cineon: 3,
        ACESFilmic: 4,
      },
    })

    // Panels
    if (this.stats) {
      this.stats.setRenderPanel(this.context)
    }
  }

  /**
   * Set the camera instance ONLY USED TO RENDER THE SCENE ON THE MESH
   */
  setCamera() {
    this.camera = new PerspectiveCamera(
      75,
      this.viewport.width / this.viewport.height,
      0.1,
      100
    )
  }

  /**
   * Raycast on mouse move
   */
  onMouseMoveEvt({ centered }) {
    this.renderMesh.material.uniforms.uCursor.value = new Vector2(
      centered.x / 2,
      centered.y / 2
    )
  }

  /**
   * Set the render mesh
   */
  setRenderMesh() {
    this.renderMesh = new Mesh(
      new PlaneGeometry(2, 2, 100, 100),
      new ShaderMaterial({
        uniforms: {
          // Scene gesture
          uScene0: new Uniform(this.rt0.texture),
          uScene1: new Uniform(this.rt1.texture),
          uTransition: new Uniform(0),
          uDirection: new Uniform(1),
          uBackgroundColor: new Uniform(new Color(this.clearColor.color)),
          uNoisePostProc: new Uniform(),
          uNoiseRepeat: new Uniform(new Vector2(1, 1)),

          // Focus
          uFocTransitionColor: new Uniform(new Color('#0d1113')),
          uFocColor: new Uniform(new Color('#6c6ca7')),
          uFocProgress: new Uniform(0),

          // Data modal
          uModalColor: new Uniform(new Color('#131313')),
          uModalProgress: new Uniform(0),
          uBlob: new Uniform(),

          // Config
          uTime: new Uniform(0),
          uRatio: new Uniform(this.getVec2Ratio()),
          uResolution: new Uniform(
            new Vector2(this.viewport.width, this.viewport.height)
          ),
          uCursor: new Uniform(new Vector2(0.5, 0.5)),
        },
        vertexShader,
        fragmentShader,
      })
    )

    this.$bus.on('mousemove', this.handleMouseMoveEvt)
  }

  /**
   * Set the renderer instance
   */
  setInstance(canvas) {
    // Renderer
    this.instance = new WebGLRenderer({
      canvas,
      antialias: true,
      stencil: false,
      alpha: false,
      powerPreference: 'high-performance',
    })

    // Setters
    this.instance.setClearColor(this.clearColor.color, this.clearColor.alpha)
    this.instance.setSize(this.viewport.width, this.viewport.height)
    this.instance.setPixelRatio(this.viewport.dpr)

    // Options
    this.instance.toneMapping = ACESFilmicToneMapping
    this.instance.toneMappingExposure = 1.1
    this.instance.outputColorSpace = SRGBColorSpace

    // Context
    this.context = this.instance.getContext()
  }

  /**
   * Set render targets and mesh
   */
  setRenderTargets() {
    const size = this.instance.getDrawingBufferSize(new Vector2())
    this.rt0 = new WebGLRenderTarget(size.width, size.height, {
      generateMipmaps: false,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
      samples: 1,
    })
    this.rt1 = this.rt0.clone()
  }

  /**
   * Get the vec2 ratio
   */
  getVec2Ratio() {
    const x = this.viewport.width / this.viewport.height
    const y = this.viewport.height / this.viewport.width

    const isH = x > y
    return new Vector2(!isH ? 1 : x, isH ? 1 : y)
  }

  /**
   * Render the targets and the mesh
   */
  renderTargets() {
    // Get elements from experience
    const active = this.experience.sceneManager.active
    const next = this.experience.sceneManager.next

    // Scene1
    if (active?.camera?.instance) {
      this.instance.setRenderTarget(this.rt0)
      this.instance.render(active.scene, active.camera.instance)
    }

    // Transition
    if (next?.camera?.instance) {
      this.instance.setRenderTarget(this.rt1)
      this.instance.render(next.scene, next.camera.instance)
    }

    // RenderMesh
    this.instance.setRenderTarget(null)
    this.instance.render(this.renderMesh, this.camera)
  }

  // --------------------------------
  // Lifecycle
  // --------------------------------

  /**
   * Init the renderer
   */
  init() {
    this.setCamera()
    this.setInstance(this.experience.canvas)
    this.setRenderTargets()
    this.setRenderMesh()

    // Debug
    if (this.debug) this.setDebug()
  }

  /**
   * Update the renderer
   */
  update() {
    this.stats?.beforeRender()

    this.renderTargets()
    if (this.renderMesh?.material.uniforms.uTime) {
      this.renderMesh.material.uniforms.uTime.value = this.time.elapsed
    }

    this.stats?.afterRender()
  }

  /**
   * Resize the renderer
   */
  resize() {
    this.camera.aspect = this.viewport.width / this.viewport.height
    this.camera.updateProjectionMatrix()

    this.instance.setSize(this.viewport.width, this.viewport.height)
    this.instance.setPixelRatio(this.viewport.dpr)

    const size = this.instance.getDrawingBufferSize(new Vector2())
    this.rt0.setSize(size.width, size.height)
    this.rt1.setSize(size.width, size.height)

    this.renderMesh.material.uniforms.uResolution.value = new Vector2(
      this.viewport.width,
      this.viewport.height
    )
    this.renderMesh.material.uniforms.uRatio.value = this.getVec2Ratio()
  }

  /**
   * Dispose the renderer
   */
  dispose() {
    this.instance.renderLists.dispose()
    this.instance.dispose()
    this.rt0.dispose()
    this.rt1.dispose()
    this.$bus.off('mousemove', this.handleMouseMoveEvt)
  }
}

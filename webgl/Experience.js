import Renderer from './Modules/Renderer/Renderer'
import Time from './Utils/Time'
import Resources from './Utils/Resources'
import SceneManager from './Utils/SceneManager'
import CursorManager from '../utils/CursorManager'
import DragManager from '~/utils/DragManager'
import {
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  Raycaster,
  RepeatWrapping,
  Vector2,
} from 'three'
import AudioManager from './Utils/AudioManager'
import Debug from './Utils/Debug'

export default class Experience {
  static _instance

  /**
   * Constructor
   */
  constructor({ canvas, baseScene, name } = {}) {
    if (Experience._instance) {
      return Experience._instance
    }
    Experience._instance = this

    // Set container
    this.name = name || 'Experience'
    this.canvas = canvas
    this.baseScene = baseScene

    // Utils
    this.cursor = new CursorManager({ el: this.canvas })

    // New elements
    this.landingPage = true
    this.viewport = null
    this.debug = null
    this.audioManager = null
    this.scrollManager = null
    this.keysManager = null
    this.dragManager = null
    this.sceneManager = null
    this.raycaster = null
    this.renderer = null
    this.time = null
    this.resources = null
    this.offset = { x: 0, y: 0 }

    // Events
    this.handleResize = this.resize.bind(this)
    this.handleStart = this.start.bind(this)
    this.handleUpdate = this.update.bind(this)
    this.handleScroll = this.scroll.bind(this)
    this.handleUniforms = this.setUniforms.bind(this)

    // Plugins
    this.$bus = useNuxtApp().$bus

    // Store
    this.setScroll = useExperienceStore().setScroll
    this.setLandingPage = useExperienceStore().setLanding
    this.setActive = useExperienceStore().setActive

    // Init
    this.init()
  }

  /**
   * Set debug panel
   */
  initDebug() {
    if (!this.viewport.debug) return
    this.debug = new Debug()

    // Toggle landing
    const landing = this.debug.panel.addBinding(this, 'landingPage', {
      label: 'Landing page',
    })
    this.landingPage = this.debug.persist(landing)?.binding.value
    this.setLandingPage(this.landingPage)
  }

  /**
   * Set global debuggers
   */
  setDebug() {
    this.setDragDebug()
    this.setScrollDebug()
  }

  /**
   * Set drag debugger
   */
  setDragDebug() {
    if (!this.debug) return

    const folder = this.debug.panel.addFolder({
      expanded: false,
      title: 'Debugger Position',
    })
    this.debug.panel.dragButton = folder.addButton({ title: 'Drag Position' })

    folder
      .addButton({ title: 'Reset Position' })
      .on('click', () => this.handlePosChange({ x: 0, y: 0 }))

    // Init a drag manager and it event
    this.dragManager = new DragManager({
      el: this.debug.panel.dragButton.element,
    })

    this.dragManager.on('drag', this.onDrag.bind(this))
  }

  /**
   * Set scroll debugger
   */
  setScrollDebug() {
    if (!this.debug) return

    const folder = this.debug.panel.addFolder({
      expanded: false,
      title: 'Scroll',
      closed: false,
    })

    folder.addBinding(this.scrollManager, 'factor', {
      label: 'Factor',
      min: 0,
      max: 1,
      step: 0.001,
    })

    folder.addBinding(this.scrollManager, 'speed', {
      label: 'Speed',
      min: 0,
      max: 1,
      step: 0.001,
    })
  }

  /**
   * Set uniforms of the render mesh
   */
  setUniforms() {
    const items = this.resources.items
    const uniforms = this.renderer.renderMesh.material.uniforms

    const blob = items.blob
    if (blob) {
      blob.wrapS = blob.wrapT = ClampToEdgeWrapping
      blob.repeat.set(1, 1)
      uniforms.uBlob.value = blob
    }

    const noise = items.noisePostProc
    if (noise) {
      const x = this.viewport.width / noise.source.data.width
      const y = this.viewport.height / noise.source.data.height
      noise.wrapS = noise.wrapT = RepeatWrapping

      uniforms.uNoisePostProc.value = noise
      uniforms.uNoiseRepeat.value = new Vector2(x, y)
    }
  }

  /**
   * Start the experience
   */
  start() {
    this.sceneManager.init(this.viewport.debug && this.baseScene).then(() => {
      this.setActive(true)

      // Events
      this.$bus.on('tick', this.handleUpdate)
      this.$bus.emit('loading:complete')
    })
  }

  /**
   * On drag
   * @param {*} e
   */
  onDrag(e) {
    this.handlePosChange({
      x: this.offset.x - e.delta.x,
      y: this.offset.y - e.delta.y,
    })
  }

  /**
   * Handle position change
   * @param {*} param0
   */
  handlePosChange({ x, y }) {
    this.offset.x = x
    this.offset.y = y

    document.querySelector(
      '.tp-dfwv'
    ).style.transform = `translate(${this.offset.x}px, ${this.offset.y}px)`
  }

  /**
   * Init the experience
   */
  init() {
    // Set viewport and time
    this.viewport = new Viewport()
    this.time = new Time()

    // Init debug
    this.initDebug()

    // Set elements
    this.scrollManager = new ScrollManager({
      limit: { min: 0, max: 100 },
      decimal: 1000,
    })
    this.renderer = new Renderer()
    this.keysManager = new KeysManager()
    this.sceneManager = new SceneManager()
    this.raycaster = new Raycaster()
    this.resources = new Resources()
    this.audioManager = new AudioManager()

    // Set global debuggers
    this.setDebug()

    // Events
    this.$bus.on('start', this.handleStart)
    this.$bus.on('resize', this.handleResize)
    this.$bus.on('resources:done', this.handleUniforms)
    this.scrollManager.on('scroll', this.handleScroll)
  }

  /**
   * Resize the experience
   */
  resize() {
    this.renderer.resize()
    this.sceneManager.resize()
    this.setUniforms()
  }

  /**
   * On scroll
   * @param {TScrollEvent} event
   */
  scroll(event) {
    this.setScroll(event.current)
  }

  /**
   * Update the experience
   */
  update() {
    this.renderer.update()
    this.sceneManager.update()
    this.debug?.update()
  }

  /**
   * Dispose the experience
   */
  dispose() {
    this.$bus.off('start', this.handleStart)
    this.$bus.off('resize', this.handleResize)
    this.$bus.off('tick', this.handleUpdate)
    this.$bus.off('resources:done', this.handleUniforms)

    this.time.stop()

    this.viewport?.destroy()
    this.scrollManager?.destroy()
    this.cursor?.destroy()

    this.renderer.dispose()
    this.resources.dispose()
    this.sceneManager.dispose()
    this.audioManager.dispose()
    this.debug?.dispose()

    Experience._instance = null
  }
}

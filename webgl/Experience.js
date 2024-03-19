import Renderer from './Modules/Renderer/Renderer'
import { Pane } from 'tweakpane'
import Time from './Utils/Time'
import Resources from './Utils/Resources'
import Stats from './Utils/Stats'
import SceneManager from './Utils/SceneManager'
import CursorManager from '../utils/CursorManager'
import DragManager from '~/utils/DragManager'
import ScrollManager from './Utils/ScrollManager'
import { Raycaster } from 'three'

export default class Experience {
  static _instance

  /**
   * Constructor
   */
  constructor(_options = {}) {
    if (Experience._instance) {
      return Experience._instance
    }
    Experience._instance = this

    // Nuxt elements
    this.$router = useRouter()

    // Set container
    this.canvas = _options.canvas
    this.baseScene = _options.baseScene

    // Utils
    this.cursor = new CursorManager()

    // New elements
    this.viewport = null
    this.debug = null
    this.stats = null
    this.scrollManager = null
    this.dragManager = null
    this.sceneManager = null
    this.raycaster = null
    this.renderer = null
    this.time = null
    this.resources = null
    this.pane = null
    this.offset = { x: 0, y: 0 }

    // plugin
    this.$bus = useNuxtApp().$bus

    // Init
    this.init()
  }

  /**
   * Start the experience
   */
  start() {
    if (
      !this.sceneManager?.active &&
      this.resources.toLoad === this.resources.loaded
    ) {
      this.sceneManager.init(this.viewport.debug && this.baseScene)
      this.update()
    }
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
   * Set events
   */
  setEvents() {
    this.dragManager = new DragManager({ el: this.pane.dragButton.element })
    this.dragManager.on('drag', this.onDrag.bind(this))
  }

  /**
   * Get debug
   */
  getDebug() {
    if (!this.viewport.debug) return

    const { getLanding, toggleLanding } = useDebugStore()
    this.pane = new Pane({
      title: 'Debug',
      expanded: true,
    })

    // Toggle landing
    this.pane
      .addBinding({ landing: getLanding }, 'landing')
      .on('change', () => toggleLanding())

    // Drag :
    const folder = this.pane.addFolder({ title: 'Position', expanded: true })
    this.pane.dragButton = folder.addButton({ title: 'Drag Position' })
    folder
      .addButton({ title: 'Reset Position' })
      .on('click', () => this.handlePosChange({ x: 0, y: 0 }))

    // Set events
    this.setEvents()

    return this.pane
  }

  /**
   * Init the experience
   */
  init() {
    this.viewport = new Viewport()
    this.debug = this.getDebug()
    this.time = new Time()
    this.scrollManager = new ScrollManager()
    this.sceneManager = new SceneManager()
    this.raycaster = new Raycaster()
    this.stats = new Stats(this.viewport.debug)
    this.renderer = new Renderer()
    this.resources = new Resources()

    this.$bus.on('resize', () => this.resize())
  }

  /**
   * Resize the experience
   */
  resize() {
    this.renderer.resize()
    this.sceneManager.resize()
  }

  /**
   * Update the experience
   */
  update() {
    this.renderer.update()
    this.sceneManager.update()
    this.stats?.update()
    this.scrollManager?.update()

    window.requestAnimationFrame(() => {
      this.update()
    })
  }

  /**
   * Dispose the experience
   */
  dispose() {
    this.viewport?.destroy()
    this.time.stop()
    this.renderer.dispose()
    this.resources.dispose()
    this.sceneManager.dispose()
    this.cursor?.destroy()
  }
}

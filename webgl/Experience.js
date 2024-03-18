import Renderer from './Modules/Renderer/Renderer'
import { Pane } from 'tweakpane'
import Time from './Utils/Time'
import Sizes from './Utils/Sizes'
import Resources from './Utils/Resources'
import Stats from './Utils/Stats'
import SceneManager from './Utils/SceneManager'
import Cursor from './Utils/Cursor'
import Viewport from '~/utils/Viewport'
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
    this.viewport = new Viewport()
    this.cursor = new Cursor()

    // New elements
    this.config = {}
    this.sizes = null
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
      this.sceneManager.init(this.config.debug && this.baseScene)
      this.update()
    }
  }

  /**
   * Set config
   */
  setConfig() {
    // Set if Debug is on
    this.config.debug = this.$router.currentRoute.value.href.includes('debug')

    // Pixel ratio
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

    // Width and height
    const boundings = this.canvas.getBoundingClientRect()
    this.config.width = boundings.width
    this.config.height = boundings.height || window.innerHeight
  }

  /**
   * Drag Events
   */
  setDrag() {
    this.pane.addBlade({ view: 'separator' })

    const folder = this.pane.addFolder({ title: 'Position', expanded: false })

    this.pane.dragButton = folder.addButton({ title: 'Drag Position' })

    folder.addButton({ title: 'Reset Position' }).on('click', () => {
      this.handlePosChange({ x: 0, y: 0 })
    })

    this.pane.addBlade({ view: 'separator' })
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
    this.handleDrag = this.onDrag.bind(this)

    this.dragManager = new DragManager({ el: this.pane.dragButton.element })
    this.$bus.on('drag', this.handleDrag)
  }

  /**
   * Get debug
   */
  getDebug() {
    if (!this.config.debug) return

    const { getLanding, toggleLanding } = useDebugStore()
    this.pane = new Pane({
      title: 'Debug',
      expanded: true,
    })
    this.pane
      .addBinding({ landing: getLanding }, 'landing')
      .on('change', () => toggleLanding())

    this.setDrag()
    this.setEvents()

    return this.pane
  }

  /**
   * Init the experience
   */
  init() {
    this.setConfig()

    this.debug = this.getDebug()
    this.time = new Time()
    this.scrollManager = new ScrollManager()
    this.sceneManager = new SceneManager()
    this.raycaster = new Raycaster()
    this.stats = new Stats(this.config.debug)
    this.renderer = new Renderer()
    this.sizes = new Sizes()
    this.resources = new Resources()
    this?.cursor?.setup(this.canvas, !!this.debug)

    this.sizes.on('resize', () => {
      this.resize()
    })
  }

  /**
   * Resize the experience
   */
  resize() {
    this.setConfig()

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
    this.sizes.off('resize')
    this.time.stop()
    this.renderer.dispose()
    this.resources.dispose()
    this.sceneManager.dispose()
    this?.cursor?.destroy()
  }
}

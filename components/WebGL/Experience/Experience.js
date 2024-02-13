import Renderer from './Renderer'
import { Pane } from 'tweakpane'
import * as THREE from 'three'
import Camera from './Camera'
import Time from './Utils/Time'
import Sizes from './Utils/Sizes'
import Resources from './Utils/Resources'
import World from './World'

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

    // Set container
    this.targetElement = _options.targetElement

    // New elements
    this.config = {}
    this.sizes = null
    this.debug = null
    this.scene = null
    this.camera = null
    this.renderer = null
    this.time = null
    this.resources = null
    this.world = null

    // Init
    this._init()
  }

  /**
   * Set config
   */
  _setConfig() {
    // Debug
    this.config.debug = window.location.hash === '#debug'

    // Pixel ratio
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

    // Width and height
    const boundings = this.targetElement.getBoundingClientRect()
    this.config.width = boundings.width
    this.config.height = boundings.height || window.innerHeight
  }

  /**
   * Get debug
   */
  _getDebug() {
    return (
      this.config.debug &&
      new Pane({
        title: 'Debug',
        expanded: true,
      })
    )
  }

  /**
   * Get scene
   */
  _getScene() {
    return new THREE.Scene()
  }

  /**
   * Init the experience
   */
  _init() {
    this._setConfig()

    this.debug = this._getDebug()
    this.scene = this._getScene()
    this.sizes = new Sizes()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.time = new Time()
    this.resources = new Resources()
    this.world = new World()

    this.sizes.on('resize', () => {
      this._resize()
    })

    this._update()
  }

  /**
   * Resize the experience
   */
  _resize() {
    this._setConfig()

    this.renderer.resize()
    this.camera.resize()
  }

  /**
   * Update the experience
   */
  _update() {
    this.renderer.update()
    this.camera.update()

    window.requestAnimationFrame(() => {
      this._update()
    })
  }

  destroy() {
    this.sizes.off('resize')
    this.renderer.instance.dispose()
    this.time.stop()
    this.resources.destroy()
    this.world.destroy()
  }
}

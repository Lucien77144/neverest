import Renderer from './Renderer'
import { Pane } from 'tweakpane'
import * as THREE from 'three'
import Camera from './Camera'

export default class Experience {
  static _instance

  constructor(_container) {
    if (Experience._instance) {
      return Experience._instance
    }
    Experience._instance = this

    // Set container
    this.container = _container

    // New elements
    this.config = null
    this.debug = null
    this.scene = null
    this.activeScene = null
    this.camera = null
    this.renderer = null
    this.time = null

    // Init
    this._init()
  }

  /**
   * Get config
   * @return config of the Experience
   */
  _getConfig() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      debug: window.location.hash === '#debug',
      pixelRatio: Math.min(Math.max(window.devicePixelRatio, 1), 2),
    }
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
    this.config = this._getConfig()
    this.debug = this._getDebug()
    this.scene = this._getScene()
    this.activeScene = {}
    this.camera = new Camera()
    this.renderer = new Renderer()
    // this._initTime()

    console.group('Experience')
    console.log('Config:', this.config)
    console.log('Debug:', this.debug)
    console.log('Scene:', this.scene)
    console.log('Active Scene:', this.activeScene)
    console.log('Camera:', this.camera)
    console.log('Renderer:', this.renderer)
    console.groupEnd()

    window.addEventListener('resize', this._resize())

    this._update()
  }

  /**
   * Resize the experience
   */
  _resize() {
    this.config = this._getConfig()
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
}

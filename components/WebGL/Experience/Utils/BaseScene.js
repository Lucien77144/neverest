import { Scene } from 'three'
import Camera from '../Camera'

export default class BaseScene {
  /**
   * Constructor
   */
  constructor() {
    this.scene = new Scene()
    this.camera = new Camera()
  }

  /**
   * Update the scene
   */
  _init() {
    Object.keys(this.components).forEach((c) => {
      this.scene.add(this.components[c].item)
    })
    this.scene.add(this.camera.instance)
  }

  /**
   * Update the scene
   */
  update() {
    Object.keys(this.components).forEach((_key) => {
      this.components[_key].update()
    })
    this.camera.update()
  }

  /**
   * Resize the scene
   */
  resize() {
    this.camera.resize()
  }

  /**
   * Dispose the scene
   */
  dispose() {
    Object.keys(this.components).forEach((_key) => {
      this.components[_key].dispose()
      this.scene.remove(this.components[_key].item)
    })
  }
}

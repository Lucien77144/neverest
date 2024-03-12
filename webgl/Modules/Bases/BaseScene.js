import { Scene } from 'three'
import Camera from '../Camera/Camera'

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
  init() {
    Object.keys(this.components).forEach((c) => {
      this.scene.add(this.components[c].item)
    })
    this.scene.add(this.camera.instance)
  }

  /**
   * Update the scene
   */
  update() {
    Object.keys(this.components).forEach((key) => {
      this.components[key].update()
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
    Object.keys(this.components).forEach((key) => {
      this.components[key].dispose()
      this.scene.remove(this.components[key].item)
    })
  }
}

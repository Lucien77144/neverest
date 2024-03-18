import { Raycaster, Scene } from 'three'
import Camera from '../Camera/Camera'
import Cursor from '~/webgl/Utils/Cursor'

export default class BaseScene {
  /**
   * Constructor
   */
  constructor() {
    this.scene = new Scene()
    this.camera = new Camera()
    this.raycaster = new Raycaster()
    this.cursor = new Cursor()
    this.$bus = useNuxtApp().$bus
  }

  /**
   * Init the scene
   */
  init() {
    Object.keys(this.components).forEach((c) => {
      this.scene.add(this.components[c].item)
    })
    this.scene.add(this.camera.instance)
    this.setEvents()
  }

  setEvents() {
    this.$bus.on('mousedown', (e) => this.onClick(e.centered))
  }

  setRaycast() {
    Object.keys(this.components).forEach((c) => {
      const intersects = this.raycaster.intersectObjects([
        this.components[c].item,
      ])
      if (intersects.length) {
        this.$bus.emit('openModal', c)
      }
    })
  }

  /**
   * Raycast on click
   */
  onClick(centered) {
    this.raycaster.setFromCamera(centered, this.camera.instance)
    this.setRaycast()
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

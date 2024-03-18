import { Raycaster, Scene } from 'three'
import Camera from '../Camera/Camera'
import Cursor from '~/webgl/Utils/Cursor'
import Experience from '~/webgl/Experience'

export default class BaseScene {
  /**
   * Constructor
   */
  constructor() {
    this.experience = new Experience()
    this.raycaster = this.experience.raycaster
    this.scene = new Scene()
    this.camera = new Camera()
    this.cursor = new Cursor()
    this.$bus = useNuxtApp().$bus
    this.hovering = false
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

  /**
   * Set events
   */
  setEvents() {
    this.$bus.on('mousedown', (e) => this.onClick(e.centered))
    this.$bus.on('mousemove', (e) => this.onHover(e.centered))
  }

  /**
   * Set raycast
   */
  setRaycast(fn = 'onClick') {
    const interact = Object.values(this.components).filter((c) => c[fn])
    interact.forEach((c) => {
      const intersects = this.raycaster.intersectObjects([c.item])
      intersects.length && c[fn]()
    })
  }

  /**
   * Raycast on click
   */
  onClick(centered) {
    this.raycaster.setFromCamera(centered, this.camera.instance)
    this.setRaycast('onClick')
  }

  onHover(centered) {
    this.raycaster.setFromCamera(centered, this.camera.instance)
    this.setRaycast('onHover')
  }

  /**
   * Update the scene
   */
  update() {
    Object.keys(this.components).forEach((key) => {
      this.components[key].update?.()
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

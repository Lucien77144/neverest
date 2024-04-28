import { Vector2, Vector3 } from 'three'
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/addons/renderers/CSS2DRenderer.js'
import Experience from '~/webgl/Experience'

export default class CSSRenderer {
  constructor(scene, camera) {
    // Get elements from experience
    this.experience = new Experience()
    this.$bus = this.experience.$bus
    this.viewport = this.experience.viewport

    // New elements
    this.instance = null
    this.scene = scene
    this.camera = camera
    this.list = {}
    this.handleAddDialogs = this.addDialogs.bind(this)

    // Setters
    this.removeFromList = useDialogsStore().removeFromList

    this.init()
  }

  /**
   * Remove element from renderer
   * @param {*} id id of the element
   */
  remove(id) {
    const d = this.list[id]
    if (!d) return

    d.el.remove()
    d.parent.remove(d.obj)
    this.removeFromList(id)

    delete this.list[id]
  }

  /**
   * Handle add a dialog
   * @param {*} dialog
   */
  addDialogs({ id, el, position, parent, layers, center }) {
    // Remove not present elements
    Object.keys(this.list).forEach((k) => !(id === k) && this.remove(k))

    // Add new elements
    !this.list[id] && this.add({ id, el, position, parent, layers, center })
  }

  /**
   * Add elements to renderer
   * @param {*} list list of elements
   */
  add({ id, el, position, parent, layers, center }) {
    const obj = new CSS2DObject(el)
    obj.position.copy(position || new Vector3(0, 0, 0))
    obj.center.copy(center || new Vector2(0.5, 0.5))
    obj.layers.set(layers || 0)

    parent.add(obj)
    this.list[id] = { obj, parent, el }
  }

  /**
   * Init
   */
  init() {
    let element = document.getElementById('css-2d-renderer')
    if (!element) {
      element = document.createElement('div')
      element.style.position = 'absolute'
      element.id = 'css-2d-renderer'
      element.style.top = 0
      document.body.appendChild(element)
    }

    this.instance = new CSS2DRenderer({ element })
    this.instance.setSize(this.viewport.width, this.viewport.height)

    this.$bus.on('dialogs:add', this.handleAddDialogs)
  }

  /**
   * Resize
   */
  resize() {
    this.instance?.setSize(this.viewport.width, this.viewport.height)
  }

  /**
   * Update
   
   */
  update() {
    this.instance?.render(this.scene, this.camera.instance)
  }

  /**
   * Dispose
   */
  dispose() {
    this.$bus.off('dialogs:add', this.handleAddDialogs)
    Object.keys(this.list).forEach((k) => this.remove(k))
  }
}

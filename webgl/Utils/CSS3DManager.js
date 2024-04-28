import { Euler } from 'three'
import {
  CSS3DRenderer,
  CSS3DObject,
  CSS3DSprite,
} from 'three/addons/renderers/CSS3DRenderer.js'
import Experience from '~/webgl/Experience'

export default class CSS3DManager {
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
    this.handleAdd = this.add.bind(this)

    // Setters
    this.removeFromList = useCSSRendererStore().removeFromCSS3DList

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
   * Handle add a CSS 3D element
   * @param {ICSS3DRendererStore} element data
   */
  add({ id, el, position, rotation, scalar, parent, layers, sprite }) {
    // Format id
    id = id.toLowerCase()

    // Remove not present elements
    Object.keys(this.list).forEach((k) => !(id === k) && this.remove(k))

    // Add new elements
    if (this.list[id]) return

    // Active element
    el.classList.add('renderer__item--active')

    // Create object
    const obj = sprite ? new CSS3DSprite(el) : new CSS3DObject(el)
    obj.scale.setScalar(scalar || 0.01)
    obj.rotation.copy(rotation || new Euler(0, -Math.PI, 0))
    position && obj.position.copy(position)
    layers && obj.layers.set(layers)
    parent.add(obj)

    // Save to list
    this.list[id] = { obj, parent, el }
  }

  /**
   * Init
   */
  init() {
    let element = document.getElementById('css-3d-renderer')
    if (!element) {
      element = document.createElement('div')
      element.style.position = 'absolute'
      element.id = 'css-3d-renderer'
      element.style.top = 0
      document.getElementById('webgl-css-wrapper').appendChild(element)
    }

    this.instance = new CSS3DRenderer({ element })
    this.instance.setSize(this.viewport.width, this.viewport.height)

    this.$bus.on('CSS3D:add', this.handleAdd)
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
    this.instance?.render(this.scene, this.camera)
  }

  /**
   * Dispose
   */
  dispose() {
    this.$bus.off('CSS3D:add', this.handleAdd)
    Object.keys(this.list).forEach((k) => this.remove(k))
  }
}

import { Vector2, Vector3 } from 'three'
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/addons/renderers/CSS2DRenderer.js'
import Experience from '~/webgl/Experience'

export default class CSSRenderer {
  constructor(scene, camera) {
    this.experience = new Experience()
    this.$bus = this.experience.$bus
    this.viewport = this.experience.viewport
    this.instance = null
    this.scene = scene
    this.camera = camera
    this.list = {}

    // Setters
    this.removeFromList = useDialogsStore().removeFromList

    this.init()
  }

  /**
   * Remove element from renderer
   * @param {*} id id of the element
   */
  remove(id) {
    if (this.list[id]) {
      this.list[id].parent.remove(this.list[id].obj)
      this.removeFromList(id)
      delete this.list[id]
    }
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
    this.list[id] = { obj, parent }
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

    this.$bus.on('dialogs:add', (d) => {
      // Remove not present elements
      Object.keys(this.list).forEach((k) => {
        if (!d.find((e) => e.id === k)) {
          this.remove(k)
        }
      })

      // Add new elements
      d.forEach((el) => {
        el.id = el.id.toLowerCase()

        if (!this.list[el.id]) {
          this.add({
            id: el.id,
            el: el.el,
            position: el.position,
            parent: el.parent,
            layers: el.layers,
            center: el.center,
          })
        }
      })
    })
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
    Object.keys(this.list).forEach((k) => {
      this.remove(k)
    })
  }
}

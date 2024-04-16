import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/addons/renderers/CSS2DRenderer.js'
import Experience from '~/webgl/Experience'

export default class LabelRenderer {
  constructor(scene, camera, labels) {
    this.experience = new Experience()

    this.viewport = this.experience.viewport
    this.labelRenderer = null
    this.labels = labels
    this.scene = scene
    this.camera = camera
  }

  init() {
    this.labels.forEach((lbl, id) => {
      const labelDiv = document.createElement('div')
      labelDiv.style.setProperty('transition', '0.2s ease')
      labelDiv.style.setProperty('opacity', '0')
      labelDiv.id = lbl.labelId
      labelDiv.textContent = lbl.inputText
      labelDiv.style.backgroundColor = 'transparent'

      const label = new CSS2DObject(labelDiv)
      label.position.set(0, 0, 0)
      label.center.set(0.5, 0.5)
      lbl.item.children[2].add(label)
      label.layers.set(0)
    })

    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.setSize(this.viewport.width, this.viewport.height)
    this.labelRenderer.domElement.style.position = 'absolute'
    this.labelRenderer.domElement.id = 'labelRendererDiv'
    this.labelRenderer.domElement.style.top = '0px'
    document.body.appendChild(this.labelRenderer.domElement)
  }

  resize() {
    this.labelRenderer.setSize(this.viewport.width, this.viewport.height)
  }

  update() {
    if (!this.labelRenderer) return
    this.labelRenderer.render(this.scene, this.camera.instance)
  }

  dispose() {
    this.labelRenderer.domElement.remove()
  }
}

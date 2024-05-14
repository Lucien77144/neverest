import { Modal } from '#components'
import { MeshNormalMaterial, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class BCBloc extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    scale = new Vector3(1, 1, 1),
    name = 'BCBloc',
    visibility = [0, 100],
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.scale = scale
    this.name = name
    this.visibility = visibility

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCBloc.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.scale.copy(this.scale)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    this.item.children[0].material = new MeshNormalMaterial()
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setMaterial()

    // this.addCSS2D({
    //   id: this.name + '_audio',
    //   template: UIAudioPlayer,
    //   data: {
    //     source: this.resources.yameteAh,
    //   },
    //   parent: this.item,
    //   position: new Vector3(0, 1, 0),
    // })

    this.addCSS2D({
      id: this.name + '_modal',
      template: Modal,
      data: {
        content: [
          {
            type: 'audio',
            source: this.resources.yameteAh,
          },
          {
            type: 'video',
            source: this.resources.yameteAh,
          },
          {
            type: 'image',
            source: this.resources.yameteAh,
          },
          {
            type: 'text',
            source: 'Yamete Ah',
          },
        ],
      },
      parent: this.item,
      position: new Vector3(0, 1, 0),
    })
  }
}

import { UIAudioPlayer } from '#components'
import { DoubleSide, MeshBasicMaterial, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class MountainLS2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'MountainLS2024',
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCMountainLS_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    this.item.children[0].material = new MeshBasicMaterial({
      side: DoubleSide,
      map: this.resources.BCMountainLS_2024_texture,
    })
    this.item.children[0].material.map.flipY = false
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setMaterial()

    this.addCSS2D({
      id: this.name + '_audio',
      template: UIAudioPlayer,
      data: {
        source: this.resources.montagne_2024,
        id: this.name + '_audio',
        tempo: '2024',
      },
      parent: this.item,
      position: new Vector3(-8, 10, -135),
    })
  }
}

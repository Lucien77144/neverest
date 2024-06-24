import { UIAudioPlayer } from '#components'
import { Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class Flag2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'Flag2024',
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name

    // New elements
    this.resources = this.experience.resources.items
    this.time = this.experience.time
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.Flag_2024.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Init
   */
  init() {
    this.setItem()

    this.addCSS2D({
      id: this.name + '_audio',
      template: UIAudioPlayer,
      data: {
        source: this.resources.drapeau_priere_2024,
        id: this.name + '_audio',
        tempo: '2024',
      },
      parent: this.item,
      position: new Vector3(0, 0.2, 0),
    })
  }
}

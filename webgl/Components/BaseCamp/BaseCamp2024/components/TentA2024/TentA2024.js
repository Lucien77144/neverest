import { Vector3 } from 'three'
import ModalBtn from '~/webgl/Components/Shared/ModalBtn/ModalBtn'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class TentA2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'TentA2024',
    modal,
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.modal = modal

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Set sprite
   */
  setSprite() {
    const mat = this.item.children[0]
    const boundings = mat.geometry.boundingBox

    const position = new Vector3()
    mat.getWorldPosition(position)
    position.y = boundings.min.y + 1
    position.z += 3.3

    this.components.modalSprite2024 = new ModalBtn({
      position,
      data: {
        template: this.modal,
        values: {
          video2024_1: this.resources.video2024_1,
          video2024_2: this.resources.video2024_2,
        },
      },
      name: 'modalSprite2024',
    })
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_1_2024.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setSprite()
  }
}

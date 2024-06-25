import { Vector3 } from 'three'
import ModalBtn from '~/webgl/Components/Shared/ModalBtn/ModalBtn'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class TentA2050 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'TentA2050',
    modal,
  }) {
    super()
    // Get elements from Experience
    this.resources = this.experience.resources.items

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.modal = modal
    this.components = {
      modal2050: new ModalBtn({
        position: this.position.clone().add(new Vector3(0, 1, 0)),
        data: {
          title: 'TITLE_2050',
          template: this.modal,
        },
        name: 'modal2050',
      }),
    }
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_Main_2050.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
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
    position.x += 0.4
    position.z += 3.3
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setSprite()
  }
}
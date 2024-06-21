import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { Vector3 } from 'three'
import ModalSprite from '../../../../Shared/ModalSprite/ModalSprite'

import vertexShader from '~/webgl/Components/Shared/WindyTenteShader/WindyTenteShader.vert?raw'
import fragmentShader from '~/webgl/Components/Shared/WindyTenteShader/WindyTenteShader.frag?raw'

export default class TentA1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'TentA1953',
    modal,
  }) {
    super()
    this.debug = this.experience.debug

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.modal = modal

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_1_1953.scene.clone()
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
    position.z += 3.3

    this.components.modalSprite1953 = new ModalSprite({
      position,
      data: {
        template: this.modal,
        values: {
          archives1953: this.resources.archives1953,
          return1953: this.resources.return1953,
        },
      },
    })
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setSprite()
  }
}

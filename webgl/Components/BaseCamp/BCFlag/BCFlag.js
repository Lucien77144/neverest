import { Modal } from '#components'
import { MeshNormalMaterial, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import ModalSprite from '../../Shared/ModalSprite/ModalSprite'

export default class BCFlag extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    scale = new Vector3(1, 1, 1),
    name = 'BCFlag',
    visibility = [0, 100],
    modal,
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.scale = scale
    this.name = name
    this.visibility = visibility
    this.modal = modal

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Set item
   */
  setBCFlag() {
    this.item = this.resources.BCFlag.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.scale.copy(this.scale)
    this.item.name = this.name

    this.item.children[0].material = new MeshNormalMaterial()
  }

  /**
   * Set sprite
   */
  setSprite() {
    const mat = this.item.children[0].children[0]
    const boundings = mat.geometry.boundingBox

    const position = new Vector3()
    mat.getWorldPosition(position)
    position.y = boundings.min.y + (boundings.max.y - boundings.min.y)

    this.components.modalSprite = new ModalSprite({
      position,
      data: this.modal,
    })
  }

  /**
   * Init
   */
  init() {
    this.setBCFlag()
    this.setSprite()
  }
}

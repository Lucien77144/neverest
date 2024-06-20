import { DoubleSide, MeshNormalMaterial, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'
import ModalSprite from '../../Shared/ModalSprite/ModalSprite'

export default class BCTent_1_2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCTent_1_2024',
    visibility = [0, 100],
    modal,
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility
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
    // + (boundings.max.y - boundings.min.y)

    this.components.modalSprite2024 = new ModalSprite({
      visibility: this.visibility,
      position,
      data: {
        template: this.modal,
        values: {
          video2024_1: this.resources.video2024_1,
          video2024_2: this.resources.video2024_2,
        },
      },
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
   * Set material
   */
  setMaterial() {
    this.item.children[0].material  = new TextureCraieMaterial({
      side:2,
      color:'#FFD500',
      bgColor:'#F8ECE8',
      texture:this.resources.BCTent1_1953Texture
    }).instance
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setSprite()
    // this.setMaterial()
  }
}

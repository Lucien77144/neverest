import { DoubleSide, MeshNormalMaterial, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'
import ModalSprite from '../../Shared/ModalSprite/ModalSprite'

export default class BCTent_Main_2050 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCTent_Main_2050',
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
    // + (boundings.max.y - boundings.min.y)

    this.components.modalSprite2050 = new ModalSprite({
      visibility: this.visibility,
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
   * Set material
   */
  setMaterial() {
    const material = new TextureCraieMaterial({
      side:2,
      color:'#FFD500',
      bgColor:'#F8ECE8',
      texture:this.resources.BCTent1_1953Texture
    }).instance
    this.item.children[0].material = material
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

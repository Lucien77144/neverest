import { DoubleSide, MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'

export default class BCTent_Main_2050 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCTent_Main_2050',
    visibility = [0, 100],
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility

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
    this.setMaterial()
  }
}

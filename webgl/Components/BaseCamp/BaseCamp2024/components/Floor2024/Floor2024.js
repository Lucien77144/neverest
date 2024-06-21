import { MeshBasicMaterial, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class Floor2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'Floor2024',
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
   * Get geometry
   */
  setItem() {
    this.item = this.resources.BCFloor_2024.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Get material
   */
  setMaterial() {
    this.material = new MeshBasicMaterial({
      color: 0xffffff,
      side: 2,
    })
  }

  /**
   * Init
   */
  init() {
    this.setItem()
  }
}

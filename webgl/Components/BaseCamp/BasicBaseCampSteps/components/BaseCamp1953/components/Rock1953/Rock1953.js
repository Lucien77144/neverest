import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { Vector3 } from 'three'

export default class Rock1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'Rock1953',
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
    this.item = this.resources.BCCailloux.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Init the rock
   */
  init() {
    this.setItem()
  }
}

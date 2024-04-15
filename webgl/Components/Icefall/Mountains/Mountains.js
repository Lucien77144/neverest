import { MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class Mountains extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Get mesh
   */
  setItem() {
    this.item = this.resources.IFMountains.scene.clone()

    this.item.children.forEach((e) => {
      e.material = new MeshNormalMaterial({
        color: 0xffffff,
      })
    })
  }

  /**
   * Init the floor
   */
  init() {
    this.setItem()
  }
}

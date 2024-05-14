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

    this.item.traverse((e) => {
      if (!e.isMesh) return
      e.material = new MeshNormalMaterial()
    })
  }

  /**
   * Init
   */
  init() {
    this.setItem()
  }
}

import { DoubleSide, MeshBasicMaterial, Vector3 } from 'three'
import AudioBtn from '~/webgl/Components/Shared/AudioBtn/AudioBtn'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class MountainRS1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'MountainRS1953',
  }) {
    super()
    // Get elements from Experience
    this.resources = this.experience.resources.items

    // New elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.components = {
      audioBtnRS53: new AudioBtn({
        position: new Vector3(2, 6, -85),
        source: this.resources.montagne_1953,
        name: this.name + '_audio',
      }),
    }
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCMountainRS_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    this.item.children[0].material = new MeshBasicMaterial({
      side: DoubleSide,
      map: this.resources.BCMountainRS_1953_texture,
    })
    this.item.children[0].material.map.flipY = false
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setMaterial()
  }
}

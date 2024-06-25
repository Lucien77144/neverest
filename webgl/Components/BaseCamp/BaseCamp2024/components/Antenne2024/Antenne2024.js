import { Vector3 } from 'three'
import AudioBtn from '~/webgl/Components/Shared/AudioBtn/AudioBtn'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class Antenne2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'Antenne2024',
  }) {
    super()

    // Get elements from Experience
    this.resources = this.experience.resources.items
    this.time = this.experience.time

    // New elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.components = {
      audioBtnAntenne24: new AudioBtn({
        position: this.position.clone().add(new Vector3(0, 1, 0)),
        source: this.resources.antenne_2024,
        name: this.name + '_audio',
      }),
    }
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCAntenne_2024.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Init
   */
  init() {
    this.setItem()
  }
}

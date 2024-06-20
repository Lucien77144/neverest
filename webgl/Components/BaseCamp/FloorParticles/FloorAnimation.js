import { Vector2, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import FloorAnimationEffect from './components/FloorAnimationEffect'
import FloorAnimationMesh from './components/FloorAnimationMesh'

export default class FloorAnimation extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0.1, -25),
    size = new Vector2(100, 100),
  } = {}) {
    super()

    // Get elements from the experience
    this.time = this.experience.time

    // Elements
    this.position = position
    this.size = size

    this.components = {
      effect: new FloorAnimationEffect(),
      mesh: new FloorAnimationMesh({ position, size }),
    }
  }
}

import Experience from '../../Experience'
import Floor from './Scenes/Floor'

export default class World {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()

    // New elements
    this.components = null

    // Init
    this.init()
  }

  /**
   * Init the world
   */
  init() {
    this.components = {}
  }

  /**
   * Update the world
   */
  update() {
    Object.keys(this.components).forEach((key) => {
      this.components[key].update()
    })
  }

  /**
   * Destroy the world
   */
  destroy() {
    Object.keys(this.components).forEach((key) => {
      this.components[key].destroy()
    })
  }
}

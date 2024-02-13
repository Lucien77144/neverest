import Experience from './Experience'
import Floor from './Scenes/Floor'

export default class World {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()

    // New elements
    this.floor = null

    // Init
    this._init()
  }

  /**
   * Init the world
   */
  _init() {
    this.floor = new Floor()
  }

  /**
   * Update the world
   */
  update() {
    this.floor.update()
  }

  /**
   * Destroy the world
   */
  destroy() {
    this.floor.destroy()
  }
}

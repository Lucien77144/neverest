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
    this.components = null

    // Init
    this._init()
  }

  /**
   * Init the world
   */
  _init() {
    this.components = {
      floor: new Floor(),
    }
  }

  /**
   * Update the world
   */
  update() {
    Object.keys(this.components).forEach((_key) => {
      this.components[_key].update()
    })
  }

  /**
   * Destroy the world
   */
  destroy() {
    Object.keys(this.components).forEach((_key) => {
      this.components[_key].destroy()
    })
  }
}

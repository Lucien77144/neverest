import { AmbientLight, Group } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class BaseCampLight extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.item = new Group()
  }

  /**
   * Set the ambient light
   */
  setAmbientLight() {
    const ambient = new AmbientLight(0xffffff, 2)
    ambient.position.set(0, 3, 0)

    this.item.add(ambient)
  }

  /**
   * Init the lights
   */
  init() {
    this.setAmbientLight()
  }
}

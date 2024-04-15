import { AmbientLight, DirectionalLight, Group } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class Lights extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.ambient = null
    this.directional = null
  }

  /**
   * Set the ambient light
   */
  setAmbientLight() {
    this.ambient = new AmbientLight(0xffffff, 0.5)

    this.item.add(this.ambient)
  }

  /**
   * Set the directional light
   */
  setDirectionalLight() {
    this.directional = new DirectionalLight(0xffffff, 0.8)
    this.directional.position.set(500, 500, 0)
    this.directional.target.lookAt(0, 0, 0)

    this.item.add(this.directional)
    this.item.add(this.directional.target)
  }

  /**
   * Init the lights
   */
  init() {
    this.item = new Group()

    this.setAmbientLight()
    this.setDirectionalLight()
  }
}

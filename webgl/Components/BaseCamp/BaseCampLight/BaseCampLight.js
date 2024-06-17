import { AmbientLight, DirectionalLight, DirectionalLightHelper } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class BaseCampLight extends BasicItem {
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
    this.ambient = new AmbientLight(0xff0000, 1)
    this.ambient.position.set(0, 3, 0)

    this.item = this.ambient
  }

  /**
   * Set the directional light
   */
  setDirectionalLight() {
    this.directional = new DirectionalLight(0xffffff, 1)
    this.directional.position.set(2, 3, -15)
    this.directional.target.lookAt(0, 0, 0)
    this.directional.helper = new DirectionalLightHelper(this.directional, 1)

    this.item = this.directional
    this.item = this.directional.target
    this.item = this.directional.helper
  }

  /**
   * Init the lights
   */
  init() {
    this.setAmbientLight()
    this.setDirectionalLight()
  }

  /**
   * Update
   */
  update() {}
}

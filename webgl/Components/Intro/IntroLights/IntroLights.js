import { AmbientLight, DirectionalLight, Group, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class IntroLights extends BasicItem {
  /**
   * Set lights
   */
  setLights() {
    const aLight = new AmbientLight(0xffffff, 0.5)
    const dLight = new DirectionalLight(0xffffff, 2.5)

    dLight.position.set(2, 2, 2)
    dLight.lookAt(new Vector3(0, 0, 0))

    this.lights = [aLight, dLight]
  }

  /**
   * Set group
   */
  setGroup() {
    const lightGroup = new Group()
    this.lights.forEach((l) => lightGroup.add(l))
    this.item = lightGroup
  }

  /**
   * Init
   */
  init() {
    this.setLights()
    this.setGroup()
  }
}

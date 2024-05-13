import { Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import Mountain from '../Mountain/Mountain'
import InfoLine from '../InfoLine/InfoLine'
import IntroLights from '../IntroLights/IntroLights'

export default class IntroGroup extends BasicItem {
  constructor() {
    super()

    // New elements
    this.cssRenderer = null
  }

  /**
   * Set camera position
   */
  setCameraPos() {
    this.parentScene.camera.instance.position.set(0, 10, 50)
    this.parentScene.camera.instance.lookAt(new Vector3(0, 0, 0))
  }

  /**
   * Add components
   */
  addComponents() {
    this.components = {
      mountain: new Mountain(),
      infoLine1: new InfoLine(
        [new Vector3(0, 0, 0), new Vector3(0, 15, 0), new Vector3(-5, 17, 0)],
        new Vector3(-5, -9, 10),
        {
          id: 'label-camp-base',
          position: new Vector3(-7, 19, 0),
          data: {
            value: 'BASECAMP',
          },
        }
      ),
      infoLine2: new InfoLine(
        [new Vector3(0, 0, 0), new Vector3(0, 4, 0), new Vector3(1, 5, 0)],
        new Vector3(2, 0, 0),
        {
          id: 'label-col-sud',
          position: new Vector3(2, 5.5, 0),
          data: {
            value: 'SOUTHCOL',
          },
        }
      ),
      lights: new IntroLights(),
    }
  }

  /**
   * Init
   */
  init() {
    this.setCameraPos()
    this.addComponents()
  }

  /**
   * Update
   */
  update() {
    if (this.item) {
      this.item.rotation.y += 0.005
    }
    if (this.cssRenderer) {
      this.cssRenderer.update()
    }
  }
}

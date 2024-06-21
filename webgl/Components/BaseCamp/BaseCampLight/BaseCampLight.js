import { AmbientLight, Color, Group } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class BaseCampLight extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // Get elements from experience
    this.debug = this.experience.debug

    // New elements
    this.item = new Group()
    this.ambient = null
    this.color = 0xffffff
    this.intensity = 3
  }

  /**
   * Set debug
   */
  setDebug() {
    this.debugFolder = this.debug.panel.addFolder({
      expanded: false,
      title: 'BC Lights',
    })

    this.debugFolder.addBinding(this.ambient, 'intensity', {
      label: 'Ambient Light',
    })

    const color = {
      value: this.ambient.color.getHex(),
    }
    this.debugFolder
      .addBinding(color, 'value', {
        label: 'Ambient Color',
        view: 'color',
      })
      .on('change', () => {
        this.ambient.color.setHex(color.value)
      })
  }

  /**
   * Set the ambient light
   */
  setAmbientLight() {
    this.ambient = new AmbientLight(this.color, this.intensity)
    // const ambient = new AmbientLight(0xff0000, 3)
    this.ambient.position.set(0, 3, 0)
    this.ambient.castShadow = false

    this.item.add(this.ambient)
  }

  /**
   * Init the lights
   */
  init() {
    this.setAmbientLight()
    this.debug && this.setDebug()
  }
}

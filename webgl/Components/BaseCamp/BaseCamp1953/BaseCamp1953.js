import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { Modal1953 } from '#components'
import { Vector3 } from 'three'
import Rock1953 from './components/Rock1953/Rock1953'
import Flag1953 from './components/Flag1953/Flag1953'
import Floor1953 from './components/Floor1953/Floor1953'
import MountainRS1953 from './components/MountainRS1953/MountainRS1953'
import MountainR1953 from './components/MountainR1953/MountainR1953'
import MountainLS1953 from './components/MountainLS1953/MountainLS1953'
import MountainL1953 from './components/MountainL1953/MountainL1953'
import Mountain1953 from './components/Mountain1953/Mountain1953'
import TentC1953 from './components/TentC1953/TentC1953'
import TentB1953 from './components/TentB1953/TentB1953'
import TentA1953 from './components/TentA1953/TentA1953'
import BigBox1953 from './components/BigBox1953/BigBox1953'
import MediumBox1953 from './components/MediumBox1953/MediumBox1953'
import SmallBox1953 from './components/SmallBox1953/SmallBox1953'

export default class BaseCamp1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({ visibility = [0, 25.87], active = true }) {
    super()

    // Elements
    this.visibility = visibility
    this.isActive = active
    this.ready = false
    this.$bus = this.experience.$bus
    this.colors = {
      background: '#b0d4e4',
      mouse: '#869195',
    }
    this.components = {
      // Boxes
      smallBox: new SmallBox1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),
      mediumBox: new MediumBox1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),
      bigBox: new BigBox1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),

      // Tents
      tent_1: new TentA1953({
        position: new Vector3(0.328, 0, -35.809),
        rotation: new Vector3(0, -0.5 + Math.PI / 2, 0),
        modal: Modal1953,
      }),
      tent_2: new TentB1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),
      tent_3: new TentC1953({
        position: new Vector3(-9.319, 0, -38.493),
        rotation: new Vector3(0, 0.2 + Math.PI / 2, 0),
      }),

      // Mountains
      mountain: new Mountain1953({
        position: new Vector3(0.192, 2, -200.766),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainL: new MountainL1953({
        position: new Vector3(-61.506, 0, -140.15),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainLS: new MountainLS1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainR: new MountainR1953({
        position: new Vector3(40.752, 0, -162.061),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainRS: new MountainRS1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),

      // Floors
      floor: new Floor1953({
        position: new Vector3(0.9, 0, -49.1),
        rotation: new Vector3(0, 0, 0),
      }),

      // Single Elements
      flag: new Flag1953({
        position: new Vector3(6.2, 0.251, -18.331),
        rotation: new Vector3(0.005, 0.291, -0.289),
      }),
      rock: new Rock1953({
        position: new Vector3(-9.567, 0, -32.582),
        rotation: new Vector3(0, 0.262, 0),
      }),
    }
  }

  /**
   * Toggle active
   */
  toggleActive() {
    this.isActive = !this.isActive
    this.setActive()
  }

  /**
   * Set active
   */
  setActive(active = this.isActive) {
    this.isActive = active
    this.item.visible = active

    if (this.isActive) {
      this.$bus.emit('active-tempo', '1953')

      Object.values(this.components).forEach((c) => {
        if (c.name === 'Floor1953') return
        c.onMouseMove = false
      })
    } else {
      Object.values(this.components).forEach((c) => {
        if (c.name === 'Floor1953') return
        c.onMouseMove = undefined
      })
    }
  }

  /**
   * After the scene has rendered
   */
  onAfterRender() {
    this.setActive()
  }
}

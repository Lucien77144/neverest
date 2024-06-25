import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { Modal2050 } from '#components'
import { Vector3 } from 'three'
import BigBox2050 from './components/BigBox2050/BigBox2050'
import TentA2050 from './components/TentA2050/TentA2050'
import TentB2050 from './components/TentB2050/TentB2050'
import TentC2050 from './components/TentC2050/TentC2050'
import TentD2050 from './components/TentD2050/TentD2050'
import Mountain2050 from './components/Mountain2050/Mountain2050'
import MountainL2050 from './components/MountainL2050/MountainL2050'
import MountainLS2050 from './components/MountainLS2050/MountainLS2050'
import MountainR2050 from './components/MountainR2050/MountainR2050'
import MountainRS2050 from './components/MountainRS2050/MountainRS2050'
import Floor2050 from './components/Floor2050/Floor2050'
import River2050 from './components/River2050/River2050'

export default class BaseCamp2050 extends BasicItem {
  /**
   * Constructor
   */
  constructor({ visibility = [75.97, 100], active = false }) {
    super()

    // Elements
    this.visibility = visibility
    this.isActive = active
    this.$bus = this.experience.$bus
    this.components = {
      // Boxes
      bigBox2050: new BigBox2050({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),

      // Tents
      tentA2050: new TentA2050({
        position: new Vector3(0.328, 0, -35.809),
        rotation: new Vector3(0, -0.5 + Math.PI / 2, 0),
        modal: Modal2050,
      }),
      tentB2050: new TentB2050({
        position: new Vector3(0.328, 0, -35.809),
        rotation: new Vector3(0, -0.3, 0),
      }),
      tentC2050: new TentC2050({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),
      tentD2050: new TentD2050({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),

      // Mountains
      mountain2050: new Mountain2050({
        position: new Vector3(0.192, 2, -200.766),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainL2050: new MountainL2050({
        position: new Vector3(-61.506, 0, -140.15),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainLS2050: new MountainLS2050({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainR2050: new MountainR2050({
        position: new Vector3(40.752, 0, -162.061),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainRS2050: new MountainRS2050({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),

      // Floor
      floor2050: new Floor2050({
        position: new Vector3(0.9, 0, -49.1),
        rotation: new Vector3(0, 0, 0),
      }),
      river2050: new River2050({
        position: new Vector3(-7.8, 0, -66),
        rotation: new Vector3(0, 0, 0),
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
      this.$bus.emit('active-tempo', '2050')
      this.$bus.emit('audio:2050')
    }
  }

  /**
   * After the scene has rendered
   */
  onAfterRender() {
    this.setActive()
  }
}

import { Modal2024 } from '#components'
import { Vector3 } from 'three'
import SmallBox2024 from './components/SmallBox2024/SmallBox2024'
import MediumBox2024 from './components/MediumBox2024/MediumBox2024'
import BigBox2024 from './components/BigBox2024/BigBox2024'
import TentA2024 from './components/TentA2024/TentA2024'
import TentB2024 from './components/TentB2024/TentB2024'
import TentC2024 from './components/TentC2024/TentC2024'
import Mountain2024 from './components/Mountain2024/Mountain2024'
import MountainL2024 from './components/MountainL2024/MountainL2024'
import MountainLS2024 from './components/MountainLS2024/MountainLS2024'
import MountainR2024 from './components/MountainR2024/MountainR2024'
import MountainRS2024 from './components/MountainRS2024/MountainRS2024'
import Floor2024 from './components/Floor2024/Floor2024'
import River2024 from './components/River2024/River2024'
import Antenne2024 from './components/Antenne2024/Antenne2024'
import Flag2024 from './components/Flag2024/Flag2024'
import BasicBaseCampSteps from '../../BasicBaseCampSteps'

export default class BaseCamp2024 extends BasicBaseCampSteps {
  /**
   * Constructor
   */
  constructor(options) {
    super(options)

    // New elements
    this.colors = {
      background: '#c1d9e3',
      mouse: '#869195',
    }
    this.components = {
      // Boxes
      smallBox2024: new SmallBox2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),
      mediumBox2024: new MediumBox2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),
      bigBox2024: new BigBox2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),

      // Tents
      tentA2024: new TentA2024({
        position: new Vector3(0.328, 0, -35.809),
        rotation: new Vector3(0, -0.5 + Math.PI / 2, 0),
        modal: Modal2024,
      }),
      tentB2024: new TentB2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),
      tentC2024: new TentC2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),

      // Mountains
      mountain2024: new Mountain2024({
        position: new Vector3(0.192, 2, -200.766),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainL2024: new MountainL2024({
        position: new Vector3(-61.506, 0, -140.15),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainLS2024: new MountainLS2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainR2024: new MountainR2024({
        position: new Vector3(40.752, 0, -162.061),
        rotation: new Vector3(0, 0, 0),
      }),
      mountainRS2024: new MountainRS2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
      }),

      // Floor
      floor2024: new Floor2024({
        position: new Vector3(0.9, 0, -49.1),
        rotation: new Vector3(0, 0, 0),
      }),

      // Single elements
      river2024: new River2024({
        position: new Vector3(-6.8, 0, -64),
        rotation: new Vector3(0, 0, 0),
      }),
      antenne2024: new Antenne2024({
        position: new Vector3(6.52, -0.2, -25.785),
        rotation: new Vector3(0.0, 0, 0),
      }),
      flag2024: new Flag2024({
        position: new Vector3(-4.45, 1.5, -20),
        rotation: new Vector3(0, 0, 0),
      }),
    }
  }
}

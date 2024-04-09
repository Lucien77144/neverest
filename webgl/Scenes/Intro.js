import { Vector3 } from 'three'
import InfoLine from '../Components/Intro/InfoLine/InfoLine'
import Mountain from '../Components/Intro/Mountain/Mountain'
import BasicScene from '../Modules/Basics/BasicScene'
import IntroGroup from '../Components/Intro/IntroGroup/IntroGroup'

export default class Intro extends BasicScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      //mountain: new Mountain(),
      //line1:new InfoLine([new Vector3(5,0,0),new Vector3(5,5,0),new Vector3(7,7,0)],'AAAAA'),
      introGroup: new IntroGroup()
    }

    this.audios = {
      // onichan: { group: 'Cringe', loop: true, volume: 0.5 },
      // yameteAh: { group: 'Cringe', loop: true, volume: 0.25 },
      babyshark: { group: 'Enfants', loop: true, volume: 0.3, persist: true },
    }

    // Init the scene
    this.init()
  }

  /**
   * On scroll
   * @param {*} delta
   */
  onScroll(delta) {
    this.camera.instance.position.z += delta / 100
  }
}

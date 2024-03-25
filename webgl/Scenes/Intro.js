import Mountain from '../Components/Mountain/Mountain'
import BaseScene from '../Modules/Basics/BasicScene'

export default class Intro extends BaseScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      mountain: new Mountain(),
    }

    this.audios = {
      // onichan: { group: 'Cringe', loop: true, volume: 0.5 },
      // yameteAh: { group: 'Cringe', loop: true, volume: 0.25 },
      babyshark: { group: 'Enfants', loop: true, volume: 0.3 },
    }

    // Init the scene
    this.init()
  }
}

import Mountain from '../Components/Intro/Mountain/Mountain'
import BasicScene from '../Modules/Basics/BasicScene'

export default class Intro extends BasicScene {
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
      babyshark: { group: 'Enfants', loop: true, volume: 0.3, persist: true },
    }
  }

  /**
   * On scroll
   * @param {*} delta
   */
  onScroll(delta) {
    this.camera.instance.position.z += delta / 100
  }
}

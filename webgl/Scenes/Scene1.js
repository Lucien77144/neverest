import Cube from '../Components/Cube/Cube'
import Floor from '../Components/Floor/Floor'
import BaseScene from '../Modules/Bases/BaseScene'

export default class Scene1 extends BaseScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      floor: new Floor(),
      cube: new Cube(),
    }

    // Computed
    this.targetScroll = useScrollStore().getTarget
    watch(
      () => useScrollStore().getTarget,
      (value) => {
        this.camera.instance.rotation.y += value / 1000
      }
    )

    // Init the scene
    this.init()
  }
}

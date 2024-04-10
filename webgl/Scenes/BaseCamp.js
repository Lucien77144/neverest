import Cube from '../Components/Shared/Cube/Cube'
import BasicScene from '../Modules/Basics/BasicScene'

export default class BaseCamp extends BasicScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.components = {
      cube: new Cube(),
      // player: new Player(players.cube),
    }

    // Store
    this.currentScroll = computed(
      () => Math.round(useScrollStore().getCurrent * 100) / 100
    )

    // Watchers
    this.watcher = watch(
      this.currentScroll,
      () => this.camera?.instance && this.rotateCamera()
    )
  }

  /**
   * Scroll the camera around the cube
   */
  rotateCamera() {
    const rotate = this.currentScroll.value * Math.PI * 0.1
    this.camera.instance.position.x = -Math.cos(rotate) * 10
    this.camera.instance.position.z = Math.sin(rotate) * 10
    this.camera.instance.lookAt(this.scene.position)
  }
}

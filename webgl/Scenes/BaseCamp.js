import Cube from '../Components/Shared/Cube/Cube'
import BasicScene from '../Modules/Basics/BasicScene'
import { types, val } from '@theatre/core'

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
    this.project = this.experience.project
    this.sheet = null
    this.cameraObj = null

    // Store
    this.currentScroll = computed(
      () => Math.round(useScrollStore().getCurrent * 100) / 100
    )

    // Watchers
    this.watcher = watch(
      this.currentScroll,
      () => this.camera?.instance && this.playSequence()
    )

    // Init the scene
    this.init()
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

  init() {
    super.init()

    // Setup the sheet
    this.setupSheet()
  }

  /**
   * Setup the sheet
   */
  setupSheet() {
    // Create a sheet
    this.sheet = this.project.sheet('BaseCamp Camera animation')

    // Create Theatre object with camera props
    this.cameraObj = this.sheet.object(
      'Camera',
      {
        rotation: types.compound({
          x: types.number(this.camera.instance.rotation.x, { range: [-2, 2] }),
          y: types.number(this.camera.instance.rotation.y, { range: [-2, 2] }),
          z: types.number(this.camera.instance.rotation.z, { range: [-2, 2] }),
        }),
        position: types.compound({
          x: types.number(this.camera.instance.position.x, {
            range: [-10, 10],
          }),
          y: types.number(this.camera.instance.position.y, {
            range: [-10, 10],
          }),
          z: types.number(this.camera.instance.position.z, {
            range: [-30, 30],
          }),
        }),
      },
      { reconfigure: true }
    )

    // Listen to values change
    this.cameraObj.onValuesChange((values) => {
      const { rotation, position } = values

      if (!this.camera.instance) return
      
      this.camera.instance.rotation.set(rotation.x, rotation.y, rotation.z)
      this.camera.instance.position.set(position.x, position.y, position.z)
    })
  }

  /**
   * Play the sheet sequence depending on the scroll
   */
  playSequence() {
    if (!this.sheet || !this.sheet.sequence) return

    const sequenceLength = val(this.sheet.sequence.pointer.length)
    const newPosition = (this.currentScroll.value / 100) * sequenceLength
    this.sheet.sequence.position = newPosition
  }

  dispose() {
    super.dispose()
  }
}

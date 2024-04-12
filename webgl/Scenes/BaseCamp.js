import { Vector3 } from 'three'
import BaseCampItem from '../Components/Shared/BaseCampItem/BaseCampItem'
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
    this.resources = this.experience.resources
    this.project = this.experience.project
    this.sheet = null
    this.cameraObj = null
    this.blocking = []

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
    // Setup the sheet
    // this.setupSheet()

    // Blocking
    this.setBlocking()

    console.log(this.components)
    super.init()
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
        visible: types.boolean(this.components.cube.item.visible),
      },
      { reconfigure: true }
    )

    // Listen to values change
    this.cameraObj.onValuesChange((values) => {
      const { rotation, position, visible } = values

      if (!this.camera.instance) return

      this.camera.instance.rotation.set(rotation.x, rotation.y, rotation.z)
      this.camera.instance.position.set(position.x, position.y, position.z)
      this.components.cube.item.visible = visible
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

  /**
   * Blocking
   */
  setBlocking() {
    this.blocking = [
      {
        name: "Boxd",
        position: new Vector3(-6.768, 0.816, -3.797),
        rotation: new Vector3(0, -0.631, 0),
        scale: new Vector3(0.746, 0.836, 0.746),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxd1",
        position: new Vector3(-5.255, 0.706, -5.031),
        rotation: new Vector3(0, -1.269, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxd2",
        position: new Vector3(-4.404, 0.73, -6.196),
        rotation: new Vector3(0, -0.624, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxd3",
        position: new Vector3(-3.562, 0.507, -7.182),
        rotation: new Vector3(0, -0.624, 0),
        scale: new Vector3(0.5, 0.5, 0.5),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxu",
        position: new Vector3(-5.608, 1.954, -5.397),
        rotation: new Vector3(0, 0.785, 0),
        scale: new Vector3(0.448, 0.448, 0.448),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxu1",
        position: new Vector3(-4.521, 1.811, -5.838),
        rotation: new Vector3(-3.141, 0.789, -3.141),
        scale: new Vector3(0.327, 0.327, 0.327),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxd004",
        position: new Vector3(9.024, 0.73, -15.228),
        rotation: new Vector3(3.141, -1.197, 3.141),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxd005",
        position: new Vector3(9.97, 0.73, -13.099),
        rotation: new Vector3(3.141, -0.124, 3.141),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxu002",
        position: new Vector3(8.618, 0.433, -13.226),
        rotation: new Vector3(0, -0.077, 0),
        scale: new Vector3(0.448, 0.448, 0.448),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxu003",
        position: new Vector3(8.645, 0.179, -11.573),
        rotation: new Vector3(0, 0.216, 0),
        scale: new Vector3(0.327, 0.203, 0.327),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxd006",
        position: new Vector3(-4.67, 0.73, -35.288),
        rotation: new Vector3(0, -0.624, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Box",
        position: new Vector3(6.163, 0.051, -17.777),
        rotation: new Vector3(3.141, 0.03, 3.141),
        scale: new Vector3(0.275, 0.275, 0.275),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxl",
        position: new Vector3(5.775, 0.051, -18.327),
        rotation: new Vector3(-3.141, -0.556, -3.141),
        scale: new Vector3(0.275, 0.275, 0.275),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Boxr",
        position: new Vector3(6.71, 0.051, -18.197),
        rotation: new Vector3(3.141, -0.31, 3.141),
        scale: new Vector3(0.275, 0.275, 0.275),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Stake",
        position: new Vector3(5.866, -1.144, -17.924),
        rotation: new Vector3(1.487, -0.274, 0.56),
        scale: new Vector3(0.425, 0.425, 0.425),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Tent_Primative_l_1",
        position: new Vector3(-7.939, 1.073, -30.382),
        rotation: new Vector3(0, 1.128, 0),
        scale: new Vector3(1.2, 1.2, 1.2),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Tent_Primative_main",
        position: new Vector3(0.551, 3.135, -36.868),
        rotation: new Vector3(3.141, 0.045, 3.141),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Tent_Primative_r_1",
        position: new Vector3(4.993, 2.318, -21.521),
        rotation: new Vector3(-0.036, 0.938, -0.005),
        scale: new Vector3(1.044, 1.044, 1.044),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Tent_Primative_r_2",
        position: new Vector3(9.231, 2.365, -17.279),
        rotation: new Vector3(3.141, 1.365, 3.141),
        scale: new Vector3(0.953, 0.953, 0.953),
        model: this.resources.items.tent.scene,
      },
      {
        name: "Tent_Primative_l_1001",
        position: new Vector3(-6.143, 1.073, -33.12),
        rotation: new Vector3(0, 0.696, 0),
        scale: new Vector3(1.2, 1.2, 1.2),
        model: this.resources.items.tent.scene,
      }
    ]

    this.blocking.forEach((block) => {
      this.components[block.name] = new BaseCampItem({
        name: block.name,
        model: block.model,
        position: block.position,
        rotation: block.rotation,
        scale: block.scale,
      })
    })
    
    console.log(this.components);
  }

  dispose() {
    super.dispose()
  }
}

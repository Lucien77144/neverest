import { Vector3 } from 'three'
import BaseCampItem from '../Components/BaseCamp/BaseCampItem/BaseCampItem'
import BasicScene from '../Modules/Basics/BasicScene'
import { types, val } from '@theatre/core'
import Floor from '../Components/BaseCamp/Floor/Floor'
import gsap from 'gsap'
import Lights from '../Components/Shared/Lights/Lights'

export default class BaseCamp extends BasicScene {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.resources = this.experience.resources
    this.project = this.experience.project
    this.interest = null
    this.sheet = null
    this.cameraObj = null
    this.camFov = 20
    this.camRot = null
    this.blocking = []

    // Store
    // Getters
    this.currentScroll = computed(
      () => Math.round(useScrollStore().getCurrent * 10000) / 10000
    )
    this.factorScroll = computed(() => useScrollStore().getFactor)
    this.currentScene = computed(() => useNavigationStore().getScene)
    // Actions
    this.setFactor = useScrollStore().setFactor

    // Watchers
    this.watcher = watch(this.currentScroll, (v) => this.watchCurrentScroll(v))

    this.components = {
      floor: new Floor(),
      lights: new Lights(),
    }

    // Init the scene
    this.init()
  }

  /**
   * Scroll the camera around the cube
   */
  setCamera() {
    this.camRot = new Vector3(0, 0, 0)

    this.camera.instance.position.y = 3.7
    this.camera.instance.position.z = 20

    this.camera.instance.fov = this.camFov
    this.camera.instance.far = 500
    this.camera.instance.updateProjectionMatrix()
  }

  /**
   * Watch the current scroll progression
   * @param {*} value Scroll value
   * @param {*} instant If the transtiion should be instant
   */
  watchCurrentScroll(value, instant = false) {
    this.camera?.instance && this.playSequence()

    const trigger = this.interest.list.find(({ start, end }) => {
      return value >= start && value <= end
    })

    const power = trigger?.power || this.interest.base
    if (this.interest.curr === power) return

    this.$bus.emit('interest', trigger?.data)

    this.setInterestVis(!!trigger?.data, instant)
    this.setScrollFactor(power)
  }

  /**
   * Rotate the camera on x axis to show the sky and start animation for the transition
   * @param {boolean} active Is the interest active
   * @param {object} instant Should the transition be instant
   */
  setInterestVis(active, instant) {
    const val = {
      ...this.camRot,
      fov: this.camera.instance.fov,
    }

    if (active) {
      this.shaderManager.add({
        name: 'interest',
        scene: 'scene0',
      })
    } else {
      this.shaderManager.remove('interest')
    }

    gsap.to(val, {
      x: active ? 0.15 : 0,
      fov: active ? this.camFov * 0.85 : this.camFov,
      duration: instant ? 0 : 0.75,
      ease: 'power1.inOut',
      onUpdate: () => {
        this.camRot.x = val.x
        this.camera.instance.fov = val.fov
        this.camera.instance.updateProjectionMatrix()
      },
    })
  }

  /**
   * Set the scroll power
   * @param {*} power
   */
  setScrollFactor(power) {
    this.interest.curr = power

    const factor = { value: this.factorScroll.value }
    gsap.to(factor, {
      value: power,
      duration: 0.5,
      ease: 'power1.inOut',
      onUpdate: () => this.setFactor(factor.value),
    })
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
        // rotation: types.compound({
        //   x: types.number(this.camera.instance.rotation.x, { range: [-2, 2] }),
        //   y: types.number(this.camera.instance.rotation.y, { range: [-2, 2] }),
        //   z: types.number(this.camera.instance.rotation.z, { range: [-2, 2] }),
        // }),
        position: types.compound({
          x: types.number(this.camera.instance.position.x, {
            range: [-100, 100],
          }),
          y: types.number(this.camera.instance.position.y, {
            range: [-100, 100],
          }),
          z: types.number(this.camera.instance.position.z, {
            range: [-100, 100],
          }),
        }),
        // visible: types.boolean(this.components.cube.item.visible),
      },
      { reconfigure: true }
    )

    // Listen to values change
    this.cameraObj.onValuesChange((values) => {
      const { rotation, position, visible } = values

      if (!this.camera.instance) return

      // this.camera.instance.rotation.copy(rotation)
      this.camera.instance.position.copy(position)
      // this.components.cube.item.visible = visible
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
        name: 'Boxd',
        position: new Vector3(-6.768, -0.019, -3.797),
        rotation: new Vector3(0, -0.631, 0),
        scale: new Vector3(0.746, 0.836, 0.746),
        model: this.resources.items.bloc,
        visibility: [0, 30],
      },
      {
        name: 'Boxd1',
        position: new Vector3(-5.255, -0.013, -5.031),
        rotation: new Vector3(0, -1.269, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.bloc,
        visibility: [0, 20],
      },
      {
        name: 'Boxd2',
        position: new Vector3(-4.404, 0.01, -6.196),
        rotation: new Vector3(0, -0.624, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.bloc,
        visibility: [0, 40],
      },
      {
        name: 'Boxd3',
        position: new Vector3(-3.562, 0.006, -7.182),
        rotation: new Vector3(0, -0.624, 0),
        scale: new Vector3(0.5, 0.5, 0.5),
        model: this.resources.items.bloc,
        visibility: [0, 60],
      },
      {
        name: 'Boxu',
        position: new Vector3(-5.608, 1.506, -5.397),
        rotation: new Vector3(0, 0.785, 0),
        scale: new Vector3(0.448, 0.448, 0.448),
        model: this.resources.items.bloc,
        visibility: [0, 80],
      },
      {
        name: 'Boxu1',
        position: new Vector3(-4.521, 1.484, -5.838),
        rotation: new Vector3(-3.141, 0.789, -3.141),
        scale: new Vector3(0.327, 0.327, 0.327),
        model: this.resources.items.bloc,
        visibility: [0, 100],
      },
      {
        name: 'Boxd004',
        position: new Vector3(9.024, 0.01, -15.228),
        rotation: new Vector3(3.141, -1.197, 3.141),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.bloc,
        visibility: [0, 25],
      },
      {
        name: 'Boxd005',
        position: new Vector3(9.97, 0.01, -13.099),
        rotation: new Vector3(3.141, -0.124, 3.141),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.bloc,
        visibility: [0, 10],
      },
      {
        name: 'Boxu002',
        position: new Vector3(8.618, -0.014, -13.226),
        rotation: new Vector3(0, -0.077, 0),
        scale: new Vector3(0.448, 0.448, 0.448),
        model: this.resources.items.bloc,
        visibility: [0, 35],
      },
      {
        name: 'Boxu003',
        position: new Vector3(8.645, -0.024, -11.573),
        rotation: new Vector3(0, 0.216, 0),
        scale: new Vector3(0.327, 0.203, 0.327),
        model: this.resources.items.bloc,
        visibility: [0, 60],
      },
      {
        name: 'Boxd006',
        position: new Vector3(-4.67, 0.01, -35.288),
        rotation: new Vector3(0, -0.624, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.bloc,
        visibility: [0, 40],
      },
      {
        name: 'Box',
        position: new Vector3(6.163, -0.224, -17.777),
        rotation: new Vector3(3.141, 0.03, 3.141),
        scale: new Vector3(0.275, 0.275, 0.275),
        model: this.resources.items.bloc,
        visibility: [0, 100],
      },
      {
        name: 'Boxl',
        position: new Vector3(5.775, -0.224, -18.327),
        rotation: new Vector3(-3.141, -0.556, -3.141),
        scale: new Vector3(0.275, 0.275, 0.275),
        model: this.resources.items.bloc,
        visibility: [0, 54],
      },
      {
        name: 'Boxr',
        position: new Vector3(6.71, -0.224, -18.197),
        rotation: new Vector3(3.141, -0.31, 3.141),
        scale: new Vector3(0.275, 0.275, 0.275),
        model: this.resources.items.bloc,
        visibility: [0, 60],
      },
      {
        name: 'Cam',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(1, 1, 1),
        model: this.resources.items.animCam,
        visibility: [0, 100],
        isCamera: true,
      },
      {
        name: 'Mountain',
        position: new Vector3(6.861, 1.409, -200.991),
        rotation: new Vector3(Math.PI, -0.65, Math.PI),
        scale: new Vector3(46.323, 46.323, 46.323),
        model: this.resources.items.backgroundMountain,
        visibility: [0, 100],
      },
      {
        name: 'MountainL',
        position: new Vector3(-61.858, -0.462, -140.939),
        rotation: new Vector3(0, -0.939, 0),
        scale: new Vector3(70.881, 70.881, 70.881),
        model: this.resources.items.backgroundMountainL,
        visibility: [0, 100],
      },
      {
        name: 'Mountainl',
        position: new Vector3(-16.473, 2.165, -85.604),
        rotation: new Vector3(-0.051, 0.094, -0.095),
        scale: new Vector3(3.208, 3.208, 3.208),
        model: this.resources.items.backgroundMountainLS,
        visibility: [0, 100],
      },
      {
        name: 'MountainR',
        position: new Vector3(39.906, -1.376, -158.968),
        rotation: new Vector3(0, -0.749, 0),
        scale: new Vector3(61.155, 61.155, 61.155),
        model: this.resources.items.backgroundMountainR,
        visibility: [0, 100],
      },
      {
        name: 'Mountainr',
        position: new Vector3(21.521, 3.897, -49.116),
        rotation: new Vector3(-3.075, -0.701, 3.085),
        scale: new Vector3(3.208, 3.208, 3.208),
        model: this.resources.items.backgroundMountainRS,
        visibility: [0, 100],
      },
      {
        name: 'Stake',
        position: new Vector3(5.866, -1.144, -17.924),
        rotation: new Vector3(1.487, -0.274, 0.56),
        scale: new Vector3(0.425, 0.425, 0.425),
        model: this.resources.items.tent,
        visibility: [0, 30],
      },
      {
        name: 'Tent_Primative_l_1',
        position: new Vector3(-7.939, -0.098, -30.382),
        rotation: new Vector3(0, 1.128, 0),
        scale: new Vector3(1.2, 1.2, 1.2),
        model: this.resources.items.tent,
        visibility: [0, 20],
      },
      {
        name: 'Tent_Primative_main',
        position: new Vector3(0.551, -0.18, -36.868),
        rotation: new Vector3(3.141, 0.045, 3.141),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.tent,
        visibility: [0, 30],
      },
      {
        name: 'Tent_Primative_r_1',
        position: new Vector3(4.993, -0.134, -21.521),
        rotation: new Vector3(-0.036, 0.938, -0.005),
        scale: new Vector3(1.044, 1.044, 1.044),
        model: this.resources.items.tent,
        visibility: [0, 40],
      },
      {
        name: 'Tent_Primative_r_2',
        position: new Vector3(9.231, 0.006, -17.279),
        rotation: new Vector3(3.141, 1.365, 3.141),
        scale: new Vector3(0.953, 0.953, 0.953),
        model: this.resources.items.tent,
        visibility: [0, 30],
      },
      {
        name: 'Tent_Primative_l_1001',
        position: new Vector3(-6.143, -0.098, -33.12),
        rotation: new Vector3(0, 0.696, 0),
        scale: new Vector3(1.2, 1.2, 1.2),
        model: this.resources.items.tent,
        visibility: [0, 78],
      },
    ]

    this.blocking.forEach(
      ({ name, model, position, rotation, scale, visibility, isCamera }) => {
        this.components[name] = new BaseCampItem({
          name,
          model,
          position,
          rotation,
          scale,
          visibility,
          isCamera,
        })
      }
    )
  }

  init() {
    // Set the camera
    this.setCamera()

    // Setup the sheet
    this.setupSheet()

    // Blocking
    this.setBlocking()

    // Set the interest
    this.interest = {
      base: this.factorScroll.value,
      curr: this.factorScroll.value,
      list: this.currentScene.value.nav?.interest || [],
    }
    this.watchCurrentScroll(0, true)

    super.init()
  }

  update() {
    super.update()
  }

  dispose() {
    super.dispose()
  }
}

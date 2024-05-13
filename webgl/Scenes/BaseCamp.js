import { Vector3 } from 'three'
import BaseCampCamera from '../Components/BaseCamp/BaseCampCamera/BaseCampCamera'
import BasicScene from '../Modules/Basics/BasicScene'
import Floor from '../Components/BaseCamp/Floor/Floor'
import gsap from 'gsap'
import Lights from '../Components/Shared/Lights/Lights'
import BCBloc from '../Components/BaseCamp/BCBloc/BCBloc'

export default class BaseCamp extends BasicScene {
  /**
   * Constructor
   */
  constructor({ interest }) {
    super()

    // New elements
    this.resources = this.experience.resources
    this.interest = interest
    this.camFov = 20
    this.camRot = new Vector3(0, 0, 0)
    this.list = []

    // Store
    // Getters
    this.currentScroll = computed(
      () => Math.round(useScrollStore().getCurrent * 10000) / 10000
    )
    this.factorScroll = computed(() => useScrollStore().getFactor)
    this.currentScene = computed(() => useNavigationStore().getScene)
    this.disabledScroll = computed(() => useScrollStore().getDisable)
    // Actions
    this.setFactor = useScrollStore().setFactor
    this.setInterest = useInterestStore().setInterest
    this.setInterestVisible = useInterestStore().setVisible
    this.instantScroll = useScrollStore().instant

    // Scope
    this.scope.run(() => {
      // Watchers
      watch(this.currentScroll, (v) => this.watchCurrentScroll(v))
    })

    const BCBlocs = [
      {
        name: 'Boxd',
        position: new Vector3(-6.768, -0.019, -3.797),
        rotation: new Vector3(0, -0.631, 0),
        scale: new Vector3(0.746, 0.836, 0.746),
        visibility: [0, 30],
      },
      {
        name: 'Boxd1',
        position: new Vector3(-5.255, -0.013, -5.031),
        rotation: new Vector3(0, -1.269, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        visibility: [0, 20],
      },
      {
        name: 'Boxd2',
        position: new Vector3(-4.404, 0.01, -6.196),
        rotation: new Vector3(0, -0.624, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        visibility: [0, 40],
      },
      {
        name: 'Boxd3',
        position: new Vector3(-3.562, 0.006, -7.182),
        rotation: new Vector3(0, -0.624, 0),
        scale: new Vector3(0.5, 0.5, 0.5),
        visibility: [0, 60],
      },
      {
        name: 'Boxu',
        position: new Vector3(-5.608, 1.506, -5.397),
        rotation: new Vector3(0, 0.785, 0),
        scale: new Vector3(0.448, 0.448, 0.448),
        visibility: [0, 80],
      },
      {
        name: 'Boxu1',
        position: new Vector3(-4.521, 1.484, -5.838),
        rotation: new Vector3(-3.141, 0.789, -3.141),
        scale: new Vector3(0.327, 0.327, 0.327),
        visibility: [0, 100],
      },
      {
        name: 'Boxd004',
        position: new Vector3(9.024, 0.01, -15.228),
        rotation: new Vector3(3.141, -1.197, 3.141),
        scale: new Vector3(0.72, 0.72, 0.72),
        visibility: [0, 25],
      },
      {
        name: 'Boxd005',
        position: new Vector3(9.97, 0.01, -13.099),
        rotation: new Vector3(3.141, -0.124, 3.141),
        scale: new Vector3(0.72, 0.72, 0.72),
        visibility: [0, 10],
      },
      {
        name: 'Boxu002',
        position: new Vector3(8.618, -0.014, -13.226),
        rotation: new Vector3(0, -0.077, 0),
        scale: new Vector3(0.448, 0.448, 0.448),
        visibility: [0, 35],
      },
      {
        name: 'Boxu003',
        position: new Vector3(8.645, -0.024, -11.573),
        rotation: new Vector3(0, 0.216, 0),
        scale: new Vector3(0.327, 0.203, 0.327),
        visibility: [0, 60],
      },
      {
        name: 'Boxd006',
        position: new Vector3(-4.67, 0.01, -35.288),
        rotation: new Vector3(0, -0.624, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        visibility: [0, 40],
      },
      {
        name: 'Box',
        position: new Vector3(6.163, -0.224, -17.777),
        rotation: new Vector3(3.141, 0.03, 3.141),
        scale: new Vector3(0.275, 0.275, 0.275),
        visibility: [0, 100],
      },
      {
        name: 'Boxl',
        position: new Vector3(5.775, -0.224, -18.327),
        rotation: new Vector3(-3.141, -0.556, -3.141),
        scale: new Vector3(0.275, 0.275, 0.275),
        visibility: [0, 54],
      },
      {
        name: 'Boxr',
        position: new Vector3(6.71, -0.224, -18.197),
        rotation: new Vector3(3.141, -0.31, 3.141),
        scale: new Vector3(0.275, 0.275, 0.275),
        visibility: [0, 60],
      },
    ]

    // Components
    this.components = {
      floor: new Floor(),
      lights: new Lights(),
      ...BCBlocs.reduce((acc, b) => {
        acc[b.name] = new BCBloc(b)
        return acc
      }, {}),
    }
    Object.values(this.components).forEach((c) => this.setComponentVis(c))

    // Init the scene
    this.init()
  }

  // --------------------------------
  // Workflow
  // --------------------------------

  /**
   * Scroll the camera around the cube
   */
  setCamera() {
    this.camera.instance.position.y = 3.7
    this.camera.instance.position.z = 20

    this.camera.instance.fov = this.camFov
    this.camera.instance.far = 500
    this.camera.instance.updateProjectionMatrix()

    this.components['Camera'] = new BaseCampCamera({
      name: 'Camera',
      model: this.resources.items.BCAnimCam,
      position: new Vector3(0, 0, 0),
      rotation: new Vector3(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    })
  }

  /**
   * Watch the current scroll progression
   * @param {*} value Scroll value
   * @param {*} instant If the transtiion should be instant
   */
  watchCurrentScroll(value, instant = false) {
    if (this.disabledScroll.value) return

    const trigger = this.interest.list?.find(({ start, end }) => {
      return value >= start && value <= end
    })

    const power = trigger?.power || this.interest.base
    if (this.interest.curr === power) return

    this.setInterestVis(trigger?.data, instant)
    this.setScrollFactor(power)

    Object.values(this.components).forEach((c) => this.setComponentVis(c))
  }

  /**
   * Set the visibility of the components if visibility range set
   */
  setComponentVis(c) {
    if (!c.visibility?.length) return

    // If current scroll is between visibility values
    if (
      c.visibility[0] <= this.currentScroll.value &&
      this.currentScroll.value <= c.visibility[1]
    ) {
      c.item.visible = true
    } else {
      c.item.visible = false
    }
  }

  /**
   * Rotate the camera on x axis to show the sky and start animation for the transition
   * @param {object} data Is the interest active
   * @param {boolean} instant Should the transition be instant
   */
  setInterestVis(data, instant) {
    data && this.setInterest(data)
    this.setInterestVisible(!!data)

    const val = {
      ...this.camRot,
      fov: this.camera.instance.fov,
    }

    const uniforms = this.experience.renderer.renderMesh.material.uniforms
    gsap.to(uniforms.uFocProgress, {
      value: !!data ? 1 : 0,
      duration: instant ? 0 : 1,
      ease: 'power1.inOut',
    })

    gsap.to(val, {
      x: !!data ? 0.1 : 0,
      fov: !!data ? this.camFov * 0.85 : this.camFov,
      duration: instant ? 0 : 1,
      ease: 'power1.inOut',
      onUpdate: () => {
        this.camRot.x = val.x
        if (!this.camera.instance) return
        this.camera.instance.fov = val.fov
        this.camera.instance.updateProjectionMatrix()
      },
    })
  }

  /**
   * Set the scroll power
   * @param {*} value
   */
  setScrollFactor(value) {
    this.interest.curr = value

    const factor = { value: this.factorScroll.value }
    gsap.to(factor, {
      value,
      duration: 0.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        this.setFactor(factor.value)
        if (value !== this.interest.base) {
          this.instantScroll(this.currentScroll.value + 0.0001)
        }
      },
    })
  }

  /**
   * List
   */
  setList() {
    this.list = [
      // 1953,
      {
        name: 'Mountain',
        position: new Vector3(6.861, 1.409, -200.991),
        rotation: new Vector3(Math.PI, -0.65, Math.PI),
        scale: new Vector3(46.323, 46.323, 46.323),
        model: this.resources.items.BCMountain,
        visibility: [0, 100],
      },
      {
        name: 'MountainL',
        position: new Vector3(-61.858, -0.462, -140.939),
        rotation: new Vector3(0, -0.939, 0),
        scale: new Vector3(70.881, 70.881, 70.881),
        model: this.resources.items.BCMountainL,
        visibility: [0, 100],
      },
      {
        name: 'Mountainl',
        position: new Vector3(-16.473, 2.165, -85.604),
        rotation: new Vector3(-0.051, 0.094, -0.095),
        scale: new Vector3(3.208, 3.208, 3.208),
        model: this.resources.items.BCMountainLS,
        visibility: [0, 100],
      },
      {
        name: 'MountainR',
        position: new Vector3(39.906, -1.376, -158.968),
        rotation: new Vector3(0, -0.749, 0),
        scale: new Vector3(61.155, 61.155, 61.155),
        model: this.resources.items.BCMountainR,
        visibility: [0, 100],
      },
      {
        name: 'Mountainr',
        position: new Vector3(21.521, 3.897, -49.116),
        rotation: new Vector3(-3.075, -0.701, 3.085),
        scale: new Vector3(3.208, 3.208, 3.208),
        model: this.resources.items.BCMountainRS,
        visibility: [0, 100],
      },
      {
        name: 'Stake',
        position: new Vector3(5.866, -1.144, -17.924),
        rotation: new Vector3(1.487, -0.274, 0.56),
        scale: new Vector3(0.425, 0.425, 0.425),
        model: this.resources.items.BCTent,
        visibility: [0, 30],
      },
      {
        name: 'Tent_Primative_l_1',
        position: new Vector3(-7.939, -0.098, -30.382),
        rotation: new Vector3(0, 1.128, 0),
        scale: new Vector3(1.2, 1.2, 1.2),
        model: this.resources.items.BCTent,
        visibility: [0, 20],
      },
      {
        name: 'Tent_Primative_main',
        position: new Vector3(0.551, -0.18, -36.868),
        rotation: new Vector3(3.141, 0.045, 3.141),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTent,
        visibility: [0, 30],
      },
      {
        name: 'Tent_Primative_r_1',
        position: new Vector3(4.993, -0.134, -21.521),
        rotation: new Vector3(-0.036, 0.938, -0.005),
        scale: new Vector3(1.044, 1.044, 1.044),
        model: this.resources.items.BCTent,
        visibility: [0, 40],
      },
      {
        name: 'Tent_Primative_r_2',
        position: new Vector3(9.231, 0.006, -17.279),
        rotation: new Vector3(3.141, 1.365, 3.141),
        scale: new Vector3(0.953, 0.953, 0.953),
        model: this.resources.items.BCTent,
        visibility: [0, 30],
      },
      {
        name: 'Tent_Primative_l_1001',
        position: new Vector3(-6.143, -0.098, -33.12),
        rotation: new Vector3(0, 0.696, 0),
        scale: new Vector3(1.2, 1.2, 1.2),
        model: this.resources.items.BCTent,
        visibility: [0, 78],
      },
      // 2024
      {
        name: 'Tent_Primative_l_1002',
        position: new Vector3(-10.4, -0.919, -13.491),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1003',
        position: new Vector3(-10.003, -0.465, -19.582),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1004',
        position: new Vector3(-8.725, -0.236, -25.45),
        rotation: new Vector3(0.096, 0.933, -0.12),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1005',
        position: new Vector3(-8.884, -0.258, -30.942),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1006',
        position: new Vector3(-16.356, -0.098, -16.973),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1007',
        position: new Vector3(-15.883, -0.098, -22.354),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1008',
        position: new Vector3(-15.076, -0.098, -27.122),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1009',
        position: new Vector3(-13.735, -0.098, -32.011),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1010',
        position: new Vector3(-11.037, -0.098, -36.744),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1011',
        position: new Vector3(-6.79, -0.336, -37.142),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1012',
        position: new Vector3(-9.384, -0.098, -42.549),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1013',
        position: new Vector3(-5.551, -0.191, -47.315),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_l_1014',
        position: new Vector3(-7.303, -0.098, -52.639),
        rotation: new Vector3(0, 0.934, 0),
        scale: new Vector3(1.803, 1.803, 1.803),
        model: this.resources.items.BCTent2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main001',
        position: new Vector3(0.551, 0.135, -36.868),
        rotation: new Vector3(0, -0.4, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main002',
        position: new Vector3(4.166, 0.018, -25.984),
        rotation: new Vector3(0.047, -0.407, 0.06),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main003',
        position: new Vector3(8.533, 0.135, -46.167),
        rotation: new Vector3(0, -0.616, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main004',
        position: new Vector3(5.277, 0.135, -50.743),
        rotation: new Vector3(0, -0.13, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main005',
        position: new Vector3(-2.168, 0.135, -63.095),
        rotation: new Vector3(0, 0.019, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main006',
        position: new Vector3(1.486, 0.135, -56.101),
        rotation: new Vector3(0, -0.945, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main007',
        position: new Vector3(19.652, 0.331, -25.15),
        rotation: new Vector3(0, -0.665, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main008',
        position: new Vector3(17.464, 0.331, -30.708),
        rotation: new Vector3(0, -0.069, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main009',
        position: new Vector3(11.483, 0.331, -41.528),
        rotation: new Vector3(0, 0.114, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main010',
        position: new Vector3(14.686, 0.331, -36.479),
        rotation: new Vector3(0, -1.069, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main011',
        position: new Vector3(1.297, 0.135, -46.228),
        rotation: new Vector3(0, -0.616, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main012',
        position: new Vector3(15.3, 0.331, -18.687),
        rotation: new Vector3(0, -0.665, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main013',
        position: new Vector3(13.427, 0.331, -25.211),
        rotation: new Vector3(0, -0.069, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main014',
        position: new Vector3(9.861, 0.331, -31.365),
        rotation: new Vector3(0, 0.114, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main015',
        position: new Vector3(6.515, 0.331, -39.342),
        rotation: new Vector3(0, -1.069, 0),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Tent_Primative_main016',
        position: new Vector3(9.468, 0.121, -20.786),
        rotation: new Vector3(-0.01, -0.085, 0.069),
        scale: new Vector3(1.412, 1.412, 1.412),
        model: this.resources.items.BCTentMain2024,
        visibility: [33, 78],
      },
      {
        name: 'Boxd007',
        position: new Vector3(-6.717, 0.426, -27.655),
        rotation: new Vector3(0, -0.624, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.BCBloc2024,
        visibility: [33, 78],
      },
      {
        name: 'Boxd008',
        position: new Vector3(-2.085, 0.338, -20.207),
        rotation: new Vector3(0, -0.788, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.BCBloc2024,
        visibility: [33, 78],
      },
      {
        name: 'Boxd009',
        position: new Vector3(-0.602, 0.126, -19.623),
        rotation: new Vector3(0, -0.218, 0),
        scale: new Vector3(0.474, 0.474, 0.474),
        model: this.resources.items.BCBloc2024,
        visibility: [33, 78],
      },
      {
        name: 'Boxd010',
        position: new Vector3(-0.74, 0.914, -20.004),
        rotation: new Vector3(0, -1.306, 0),
        scale: new Vector3(0.274, 0.274, 0.274),
        model: this.resources.items.BCBloc2024,
        visibility: [33, 78],
      },
      {
        name: 'Boxd011',
        position: new Vector3(-10.133, 0.73, -22.401),
        rotation: new Vector3(0, 0.37, 0),
        scale: new Vector3(0.72, 0.72, 0.72),
        model: this.resources.items.BCBloc2024,
        visibility: [33, 78],
      },
      {
        name: 'Boxd012',
        position: new Vector3(-9.334, 0.142, -16.435),
        rotation: new Vector3(-0.018, 0.37, 0.007),
        scale: new Vector3(0.523, 0.523, 0.523),
        model: this.resources.items.BCBloc2024,
        visibility: [33, 78],
      },
    ]

    // this.list.forEach(
    //   ({ name, model, position, rotation, scale, visibility, isCamera }) => {
    //     this.components[name] = new BaseCampItem({
    //       name,
    //       model,
    //       position,
    //       rotation,
    //       scale,
    //       visibility,
    //       isCamera,
    //     })
    //   }
    // )

    // /**
    //  * On init complete
    //  */
    // onInitComplete() {
    //   if (this.name == 'Tent_Primative_main') {
    //     this.addCSS2D({
    //       id: 'tent-main__audio-player',
    //       template: UIAudioPlayer,
    //       data: {
    //         source: this.resources.items.yameteAh,
    //       },
    //       parent: this.item,
    //       position: new Vector3(0, 1, 0),
    //     })
    //   }
    // }
  }

  // --------------------------------
  // Lifecycle
  // --------------------------------

  /**
   * Init the scene
   */
  init() {
    // Set the camera
    this.setCamera()
    this.setInterestVis(null)
    this.setInterestVisible(false)

    // List
    this.setList()

    super.init()
  }

  /**
   * After init and entrance transition end
   */
  onInitComplete() {
    super.onInitComplete()
    this.watchCurrentScroll(0)
  }

  /**
   * On transition start, before the dispose
   */
  onDisposeStart() {
    super.onDisposeStart()
    this.setInterestVisible(false)
  }

  /**
   * Dispose
   */
  dispose() {
    this.setInterestVis(null, true)
    super.dispose()
  }
}

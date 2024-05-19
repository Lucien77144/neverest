import { Vector3 } from 'three'
import BaseCampCamera from '../Components/BaseCamp/BaseCampCamera/BaseCampCamera'
import BasicScene from '../Modules/Basics/BasicScene'
import Floor from '../Components/BaseCamp/Floor/Floor'
import gsap from 'gsap'
import Lights from '../Components/Shared/Lights/Lights'
import BCSmallBox_1953 from '../Components/BaseCamp/BCSmallBox_1953/BCSmallBox_1953'
import BCMediumBox_1953 from '../Components/BaseCamp/BCMediumBox_1953/BCMediumBox_1953'
import BCBigBox_1953 from '../Components/BaseCamp/BCBigBox_1953/BCBigBox_1953'
import BCSmallBox_2024 from '../Components/BaseCamp/BCSmallBox_2024/BCSmallBox_2024'
import BCMediumBox_2024 from '../Components/BaseCamp/BCMediumBox_2024/BCMediumBox_2024'
import BCBigBox_2024 from '../Components/BaseCamp/BCBigBox_2024/BCBigBox_2024'
import BCSmallBox_2050 from '../Components/BaseCamp/BCSmallBox_2050/BCSmallBox_2050'
import BCBigBox_2050 from '../Components/BaseCamp/BCBigBox_2050/BCBigBox_2050'
import BCTent_1_1953 from '../Components/BaseCamp/BCTent_1_1953/BCTent_1_1953'
import BCTent_2_1953 from '../Components/BaseCamp/BCTent_2_1953/BCTent_2_1953'
import BCTent_3_1953 from '../Components/BaseCamp/BCTent_3_1953/BCTent_3_1953'
import BCTent_1_2024 from '../Components/BaseCamp/BCTent_1_2024/BCTent_1_2024'
import BCTent_2_2024 from '../Components/BaseCamp/BCTent_2_2024/BCTent_2_2024'
import BCTent_3_2024 from '../Components/BaseCamp/BCTent_3_2024/BCTent_3_2024'
import BCTent_1_2050 from '../Components/BaseCamp/BCTent_1_2050/BCTent_1_2050'
import BCMountain from '../Components/BaseCamp/BCMountain/BCMountain'
import BCMountainL from '../Components/BaseCamp/BCMountainL/BCMountainL'
import BCMountainLS from '../Components/BaseCamp/BCMountainLS/BCMountainLS'
import BCMountainR from '../Components/BaseCamp/BCMountainR/BCMountainR'
import BCMountainRS from '../Components/BaseCamp/BCMountainRS/BCMountainRS'
import BCFlag from '../Components/BaseCamp/BCFlag/BCFlag'
import BCCailloux from '../Components/BaseCamp/BCCailloux/BCCailloux'

export default class BaseCamp extends BasicScene {
  /**
   * Constructor
   */
  constructor({ interest }) {
    super()

    // Get elements from experience
    this.scrollManager = this.experience.scrollManager
    this.resources = this.experience.resources
    this.renderUniforms = this.experience.renderer.renderMesh.material.uniforms

    // New elements
    this.interest = interest
    this.camFov = 20
    this.camRot = new Vector3(0, 0, 0)
    this.list = []
    this.playing = false
    this.factorChange = false

    // Store
    // Actions
    this.setInterest = useExperienceStore().setInterest

    // Events
    this.scrollManager.on('scroll', ({ current }) =>
      this.watchCurrentScroll(current)
    )

    // Components
    this.components = {
      floor: new Floor(),
      lights: new Lights(),

      // BOX

      BCSmallBox_1953: new BCSmallBox_1953({
        name: 'BCSmallBox_1953',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCMediumBox_1953: new BCMediumBox_1953({
        name: 'BCMediumBox_1953',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCBigBox_1953: new BCBigBox_1953({
        name: 'BCBigBox_1953',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCSmallBox_2024: new BCSmallBox_2024({
        name: 'BCSmallBox_2024',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCMediumBox_2024: new BCMediumBox_2024({
        name: 'BCMediumBox_2024',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCBigBox_2024: new BCBigBox_2024({
        name: 'BCBigBox_2024',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCSmallBox_2050: new BCSmallBox_2050({
        name: 'BCSmallBox_2050',
        position: new Vector3(9.429, 0.417, -17.631),
        rotation: new Vector3(Math.PI / 2, 0.204, -0.155),
        visibility: [75.97, 100],
      }),
      BCBigBox_2050: new BCBigBox_2050({
        name: 'BCBigBox_2050',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),

      // TENT

      BCTent_1_1953: new BCTent_1_1953({
        name: 'BCTENT_1_1953_1',
        position: new Vector3(0.328, 0, -35.809),
        rotation: new Vector3(0, -0.3, 0),
        visibility: [0, 25.87],
      }),
      BCTent_2_1953: new BCTent_2_1953({
        name: 'BCTent_2_1953',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 17.15],
      }),
      BCTent_3_1953: new BCTent_3_1953({
        name: 'BCTENT_3_1953_1',
        position: new Vector3(-9.319, 0, -37.493),
        rotation: new Vector3(0, 0.2, 0),
        visibility: [0, 25.87],
      }),
      BCTent_1_2024: new BCTent_1_2024({
        name: 'BC_Tent_1_2024_1',
        position: new Vector3(0.328, 0, -35.809),
        rotation: new Vector3(0, -0.3, 0),
        visibility: [25.87, 75.97],
      }),
      BCTent_2_2024: new BCTent_2_2024({
        name: 'BCTent_2_2024',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCTent_3_2024: new BCTent_3_2024({
        name: 'BCTent_3_2024',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCTent_1_2050: new BCTent_1_2050({
        name: 'BCTent_1_2050',
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),

      // MOUNTAINS

      BCMountain: new BCMountain({
        name: 'Mountain',
        position: new Vector3(0.192, 11.703, -200.766),
        rotation: new Vector3(Math.PI, -0.65, Math.PI),
        model: this.resources.items.BCMountain,
        visibility: [0, 100],
      }),
      BCMountainL: new BCMountainL({
        name: 'MountainL',
        position: new Vector3(-51.506, -7.769, -140.148),
        rotation: new Vector3(0, -Math.PI / 3, 0),
        model: this.resources.items.BCMountainL,
        visibility: [0, 100],
      }),
      BCMountainLS: new BCMountainLS({
        name: 'MountainLS',
        position: new Vector3(-22.29, -1, -65.826),
        rotation: new Vector3(-0.051, 0.094, -0.095),
        model: this.resources.items.BCMountainLS,
        visibility: [0, 100],
      }),
      BCMountainR: new BCMountainR({
        name: 'MountainR',
        position: new Vector3(55.752, 10.605, -162.061),
        rotation: new Vector3(0, 0, 0),
        model: this.resources.items.BCMountainR,
        visibility: [0, 100],
      }),
      BCMountainRS: new BCMountainRS({
        name: 'MountainRS',
        position: new Vector3(15.168, -0.8, -68.82),
        rotation: new Vector3(-3.075, -0.701, 3.085),
        model: this.resources.items.BCMountainRS,
        visibility: [0, 100],
      }),

      // SINGLE ITEMS

      BCFlag: new BCFlag({
        name: 'Flag',
        position: new Vector3(6.2, -0.251, -18.331),
        rotation: new Vector3(0.005, 0.291, -0.289),
        model: this.resources.items.BCFlag,
        visibility: [0, 25.87],
      }),
      BCCailloux: new BCCailloux({
        name: 'TasCailloux',
        position: new Vector3(-9.567, 0, -32.582),
        rotation: new Vector3(0, 0.262, 0),
        model: this.resources.items.BCCailloux,
        visibility: [0, 25.87],
      }),
    }

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
    if (this.scrollManager.disabled) return

    const trigger = this.interest.list?.find(({ start, end }) => {
      return value >= start && value <= end
    })

    const power = trigger?.power || this.interest.base

    Object.values(this.components).forEach((c) => this.setComponentVis(c))

    if (this.interest.curr === power) return

    this.setInterestVis(trigger?.data, instant)
    this.setScrollFactor(power)
  }

  /**
   * Set the visibility of the components if visibility range set
   * @param {object} c Webgl component
   * @param {number} force Force the visibility check to this value
   */
  setComponentVis(c, force) {
    if (!c.visibility?.length) return

    const scroll = force ?? this.scrollManager.current
    const start = c.visibility[0]
    const end = c.visibility[1]

    // If current scroll is between visibility values
    if (start <= scroll && scroll <= end) {
      c.item.visible = true
    } else {
      if (c.item.visible) {
        c.item.visible = false
      }
    }
  }

  /**
   * Rotate the camera on x axis to show the sky and start animation for the transition
   * @param {object} data Is the interest active
   * @param {boolean} instant Should the transition be instant
   */
  setInterestVis(data, instant) {
    data && this.setInterest({ data })
    this.setInterest({ visible: !!data })

    const val = {
      ...this.camRot,
      fov: this.camera.instance?.fov,
    }

    gsap.to(this.renderUniforms.uFocProgress, {
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
    if (this.factorChange) return
    this.factorChange = true

    this.interest.curr = value

    const factor = this.scrollManager.factor
    this.scrollManager.setFactor(0)
    setTimeout(() => {
      this.scrollManager.setFactor(factor)
      this.factorChange = false
    }, 500)

    if (value !== this.interest.base) {
      this.scrollManager.to(this.scrollManager.current + 0.001)
    }
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
    this.setInterest({ visible: false })

    // Init the scene and components (basic scene)
    super.init()

    Object.values(this.components).forEach((c) => this.setComponentVis(c, 0))
  }

  /**
   * After init and entrance transition end
   */
  onInitComplete() {
    super.onInitComplete()
    this.watchCurrentScroll(0)
    this.playing = true
  }

  /**
   * On transition start, before the dispose
   */
  onDisposeStart() {
    super.onDisposeStart()
    this.setInterest({ visible: false })
  }

  /**
   * Dispose
   */
  dispose() {
    this.setInterestVis(null, true)
    super.dispose()
  }
}

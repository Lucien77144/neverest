import { MeshStandardMaterial, Vector3 } from 'three'
import BaseCampCamera from '../Components/BaseCamp/BaseCampCamera/BaseCampCamera'
import BasicScene from '../Modules/Basics/BasicScene'
import Floor from '../Components/BaseCamp/Floor/Floor'
import gsap from 'gsap'
import BCAntenne_2024 from '../Components/BaseCamp/BCAntenne_2024/BCAntenne_2024'
import BCSmallBox_1953 from '../Components/BaseCamp/BCSmallBox_1953/BCSmallBox_1953'
import BCMediumBox_1953 from '../Components/BaseCamp/BCMediumBox_1953/BCMediumBox_1953'
import BCBigBox_1953 from '../Components/BaseCamp/BCBigBox_1953/BCBigBox_1953'
import BCBigBox_2024 from '../Components/BaseCamp/BCBigBox_2024/BCBigBox_2024'
import BCBigBox_2050 from '../Components/BaseCamp/BCBigBox_2050/BCBigBox_2050'
import BCCailloux from '../Components/BaseCamp/BCCailloux/BCCailloux'
import BCFlag from '../Components/BaseCamp/BCFlag/BCFlag'
import BCFloor_1953 from '../Components/BaseCamp/BCFloor_1953/BCFloor_1953'
import BCMediumBox_1953 from '../Components/BaseCamp/BCMediumBox_1953/BCMediumBox_1953'
import BCMediumBox_2024 from '../Components/BaseCamp/BCMediumBox_2024/BCMediumBox_2024'
import BCMountainLS_1953 from '../Components/BaseCamp/BCMountainLS_1953/BCMountainLS_1953'
import BCMountainLS_2024 from '../Components/BaseCamp/BCMountainLS_2024/BCMountainLS_2024'
import BCMountainLS_2050 from '../Components/BaseCamp/BCMountainLS_2050/BCMountainLS_2050'
import BCMountainL_1953 from '../Components/BaseCamp/BCMountainL_1953/BCMountainL_1953'
import BCMountainL_2024 from '../Components/BaseCamp/BCMountainL_2024/BCMountainL_2024'
import BCMountainL_2050 from '../Components/BaseCamp/BCMountainL_2050/BCMountainL_2050'
import BCMountainRS_1953 from '../Components/BaseCamp/BCMountainRS_1953/BCMountainRS_1953'
import BCMountainRS_2024 from '../Components/BaseCamp/BCMountainRS_2024/BCMountainRS_2024'
import BCMountainRS_2050 from '../Components/BaseCamp/BCMountainRS_2050/BCMountainRS_2050'
import BCMountainR_1953 from '../Components/BaseCamp/BCMountainR_1953/BCMountainR_1953'
import BCMountainR_2024 from '../Components/BaseCamp/BCMountainR_2024/BCMountainR_2024'
import BCMountainR_2050 from '../Components/BaseCamp/BCMountainR_2050/BCMountainR_2050'
import BCMountain_1953 from '../Components/BaseCamp/BCMountain_1953/BCMountain_1953'
import BCMountain_2024 from '../Components/BaseCamp/BCMountain_2024/BCMountain_2024'
import BCMountain_2050 from '../Components/BaseCamp/BCMountain_2050/BCMountain_2050'
import BCSmallBox_1953 from '../Components/BaseCamp/BCSmallBox_1953/BCSmallBox_1953'
import BCSmallBox_2024 from '../Components/BaseCamp/BCSmallBox_2024/BCSmallBox_2024'
import BCTent_1_1953 from '../Components/BaseCamp/BCTent_1_1953/BCTent_1_1953'
import BCTent_1_2024 from '../Components/BaseCamp/BCTent_1_2024/BCTent_1_2024'
import BCTent_1_2050 from '../Components/BaseCamp/BCTent_1_2050/BCTent_1_2050'
import BCTent_2_1953 from '../Components/BaseCamp/BCTent_2_1953/BCTent_2_1953'
import BCTent_2_2024 from '../Components/BaseCamp/BCTent_2_2024/BCTent_2_2024'
import BCTent_2_2050 from '../Components/BaseCamp/BCTent_2_2050/BCTent_2_2050'
import BCTent_3_1953 from '../Components/BaseCamp/BCTent_3_1953/BCTent_3_1953'
import BCTent_3_2024 from '../Components/BaseCamp/BCTent_3_2024/BCTent_3_2024'
import BCTent_3_2050 from '../Components/BaseCamp/BCTent_3_2050/BCTent_3_2050'
import BCTent_Main_2050 from '../Components/BaseCamp/BCTent_Main_2050/BCTent_Main_2050'
import BaseCampCamera from '../Components/BaseCamp/BaseCampCamera/BaseCampCamera'
import BasicScene from '../Modules/Basics/BasicScene'

import { ModalBC1953, ModalBC2024 } from '#components'
import BCFloor_2024 from '../Components/BaseCamp/BCFloor_2024/BCFloor_2024'
import BCFloor_2050 from '../Components/BaseCamp/BCFloor_2050/BCFloor_2050'
import BCRiver_2024 from '../Components/BaseCamp/BCRiver_2024/BCRiver_2024'
import BCRiver_2050 from '../Components/BaseCamp/BCRiver_2050/BCRiver_2050'
import BaseCampLight from '../Components/BaseCamp/BaseCampLight/BaseCampLight'

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
      lights: new BaseCampLight(),

      // BOX
      BCSmallBox_1953: new BCSmallBox_1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCMediumBox_1953: new BCMediumBox_1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCBigBox_1953: new BCBigBox_1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCSmallBox_2024: new BCSmallBox_2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCMediumBox_2024: new BCMediumBox_2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCBigBox_2024: new BCBigBox_2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCBigBox_2050: new BCBigBox_2050({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),

      // TENT

      BCTent_1_1953: new BCTent_1_1953({
        position: new Vector3(0.328, 0, -35.809),
        rotation: new Vector3(0, -0.5 + Math.PI / 2, 0),
        visibility: [0, 25.87],
      }),
      BCTent_2_1953: new BCTent_2_1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCTent_3_1953: new BCTent_3_1953({
        position: new Vector3(-9.319, 0, -38.493),
        rotation: new Vector3(0, 0.2 + Math.PI / 2, 0),
        visibility: [0, 25.87],
      }),
      BCTent_1_2024: new BCTent_1_2024({
        position: new Vector3(0.328, 0, -35.809),
        rotation: new Vector3(0, -0.5 + Math.PI / 2, 0),
        visibility: [25.87, 75.97],
      }),
      BCTent_2_2024: new BCTent_2_2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCTent_3_2024: new BCTent_3_2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCTent_Main_2050: new BCTent_Main_2050({
        position: new Vector3(0.328, 0, -35.809),
        rotation: new Vector3(0, -0.5 + Math.PI / 2, 0),
        visibility: [75.97, 100],
      }),
      BCTent_1_2050: new BCTent_1_2050({
        position: new Vector3(0.328, 0, -35.809),
        rotation: new Vector3(0, -0.3, 0),
        visibility: [75.97, 100],
      }),
      BCTent_2_2050: new BCTent_2_2050({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),
      BCTent_3_2050: new BCTent_3_2050({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),

      // MOUNTAINS

      BCMountain_1953: new BCMountain_1953({
        position: new Vector3(0.192, 2, -200.766),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCMountainL_1953: new BCMountainL_1953({
        position: new Vector3(-61.506, 0, -140.15),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCMountainLS_1953: new BCMountainLS_1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCMountainR_1953: new BCMountainR_1953({
        position: new Vector3(40.752, 0, -162.061),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCMountainRS_1953: new BCMountainRS_1953({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCMountain_2024: new BCMountain_2024({
        position: new Vector3(0.192, 2, -200.766),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCMountainL_2024: new BCMountainL_2024({
        position: new Vector3(-61.506, 0, -140.15),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCMountainLS_2024: new BCMountainLS_2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCMountainR_2024: new BCMountainR_2024({
        position: new Vector3(40.752, 0, -162.061),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCMountainRS_2024: new BCMountainRS_2024({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCMountain_2050: new BCMountain_2050({
        position: new Vector3(0.192, 2, -200.766),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),
      BCMountainL_2050: new BCMountainL_2050({
        position: new Vector3(-61.506, 0, -140.15),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),
      BCMountainLS_2050: new BCMountainLS_2050({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),
      BCMountainR_2050: new BCMountainR_2050({
        position: new Vector3(40.752, 0, -162.061),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),
      BCMountainRS_2050: new BCMountainRS_2050({
        position: new Vector3(0, 0, 0),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),

      // FLOOR
      BCFloor_1953: new BCFloor_1953({
        position: new Vector3(0.9, 0, -49.1),
        rotation: new Vector3(0, 0, 0),
        visibility: [0, 25.87],
      }),
      BCFloor_2024: new BCFloor_2024({
        position: new Vector3(0.9, 0, -49.1),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCRiver_2024: new BCRiver_2024({
        position: new Vector3(-6.8, 0, -64),
        rotation: new Vector3(0, 0, 0),
        visibility: [25.87, 75.97],
      }),
      BCFloor_2050: new BCFloor_2050({
        position: new Vector3(0.9, 0, -49.1),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),
      BCRiver_2050: new BCRiver_2050({
        position: new Vector3(-7.8, 0, -66),
        rotation: new Vector3(0, 0, 0),
        visibility: [75.97, 100],
      }),

      // SINGLE ITEMS

      BCFlag: new BCFlag({
        position: new Vector3(6.2, 0.251, -18.331),
        rotation: new Vector3(0.005, 0.291, -0.289),
        visibility: [0, 25.87],
        modal: ModalBC1953,
      }),
      BCAntenne_2024: new BCAntenne_2024({
        position: new Vector3(6.52, -0.2, -25.785),
        rotation: new Vector3(0.0, 0, 0),
        visibility: [25.87, 75.97],
        modal: ModalBC2024,
      }),
      BCCailloux: new BCCailloux({
        position: new Vector3(-9.567, 0, -32.582),
        rotation: new Vector3(0, 0.262, 0),
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
   * @param {*} instant If the transition should be instant
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

    // console.log(c.item);

    // If current scroll is between visibility values
    if (start <= scroll && scroll <= end) {
      if (c.item.visible === false) {
        c.item.visible = true
      }
    } else {
      if (c.item.visible === true) {
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
    Object.values(this.components).forEach((c) => {
      c.item.visible = true
    })
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
    this.scrollManager.off('scroll')
    super.dispose()
  }
}

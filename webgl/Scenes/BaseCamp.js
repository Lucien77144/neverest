import { Vector3 } from 'three'
import BaseCampCamera from '../Components/BaseCamp/BaseCampCamera/BaseCampCamera'
import BasicScene from '../Modules/Basics/BasicScene'
import Floor from '../Components/BaseCamp/Floor/Floor'
import gsap from 'gsap'
import Lights from '../Components/Shared/Lights/Lights'
import BCSmallBox_1953 from '../Components/BaseCamp/BCSmallBox_1953/BCSmallBox_1953'
import BCMediumBox_1953 from '../Components/BaseCamp/BCMediumBox_1953/BCMediumBox_1953'
import BCBigBox_1953 from '../Components/BaseCamp/BCBigBox_1953/BCBigBox_1953'
import BCTent_1_1953 from '../Components/BaseCamp/BCTent_1_1953/BCTent_1_1953'
import BCTent_2_1953 from '../Components/BaseCamp/BCTent_2_1953/BCTent_2_1953'
import BCTent_3_1953 from '../Components/BaseCamp/BCTent_3_1953/BCTent_3_1953'
import BCTent_1_2024 from '../Components/BaseCamp/BCTent_1_2024/BCTent_1_2024'
import BCTent_2_2024 from '../Components/BaseCamp/BCTent_2_2024/BCTent_2_2024'
import BCTent_3_2024 from '../Components/BaseCamp/BCTent_3_2024/BCTent_3_2024'
import BCMountain from '../Components/BaseCamp/BCMountain/BCMountain'
import BCMountainL from '../Components/BaseCamp/BCMountainL/BCMountainL'
import BCMountainLS from '../Components/BaseCamp/BCMountainLS/BCMountainLS'
import BCMountainR from '../Components/BaseCamp/BCMountainR/BCMountainR'
import BCMountainRS from '../Components/BaseCamp/BCMountainRS/BCMountainRS'
import BCFlag from '../Components/BaseCamp/BCFlag/BCFlag'

// Import const from the blocking folder
import { BCSMALLBOX } from '~/const/blocking/baseCamp.const'
import { BCMEDIUMBOX } from '~/const/blocking/baseCamp.const'
import { BCBIGBOX } from '~/const/blocking/baseCamp.const'
import { BCTENT_1_1953 } from '~/const/blocking/baseCamp.const'
import { BCTENT_2_1953 } from '~/const/blocking/baseCamp.const'
import { BCTENT_3_1953 } from '~/const/blocking/baseCamp.const'
import { BCTENT_1_2024 } from '~/const/blocking/baseCamp.const'
import { BCTENT_2_2024 } from '~/const/blocking/baseCamp.const'
import { BCTENT_3_2024 } from '~/const/blocking/baseCamp.const'

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
      ...BCSMALLBOX.reduce((acc, b) => {
        acc[b.name] = new BCSmallBox_1953(b)
        return acc
      }, {}),
      ...BCMEDIUMBOX.reduce((acc, b) => {
        acc[b.name] = new BCMediumBox_1953(b)
        return acc
      }, {}),
      ...BCBIGBOX.reduce((acc, b) => {
        acc[b.name] = new BCBigBox_1953(b)
        return acc
      }, {}),
      ...BCTENT_1_1953.reduce((acc, b) => {
        acc[b.name] = new BCTent_1_1953(b)
        return acc
      }, {}),
      ...BCTENT_2_1953.reduce((acc, b) => {
        acc[b.name] = new BCTent_2_1953(b)
        return acc
      }, {}),
      ...BCTENT_3_1953.reduce((acc, b) => {
        acc[b.name] = new BCTent_3_1953(b)
        return acc
      }, {}),
      ...BCTENT_1_2024.reduce((acc, b) => {
        acc[b.name] = new BCTent_1_2024(b)
        return acc
      }, {}),
      ...BCTENT_2_2024.reduce((acc, b) => {
        acc[b.name] = new BCTent_2_2024(b)
        return acc
      }, {}),
      ...BCTENT_3_2024.reduce((acc, b) => {
        acc[b.name] = new BCTent_3_2024(b)
        return acc
      }, {}),
      BCMountain: new BCMountain({
        name: 'Mountain',
        position: new Vector3(6.861, 1.409, -200.991),
        rotation: new Vector3(Math.PI, -0.65, Math.PI),
        scale: new Vector3(46.323, 46.323, 46.323),
        model: this.resources.items.BCMountain,
        visibility: [0, 100],
      }),
      BCMountainL: new BCMountainL({
        name: 'MountainL',
        position: new Vector3(-61.858, -0.462, -140.939),
        rotation: new Vector3(0, -0.939, 0),
        scale: new Vector3(70.881, 70.881, 70.881),
        model: this.resources.items.BCMountainL,
        visibility: [0, 100],
      }),
      BCMountainLS: new BCMountainLS({
        name: 'MountainLS',
        position: new Vector3(-16.473, 2.165, -85.604),
        rotation: new Vector3(-0.051, 0.094, -0.095),
        scale: new Vector3(3.208, 3.208, 3.208),
        model: this.resources.items.BCMountainLS,
        visibility: [0, 100],
      }),
      BCMountainR: new BCMountainR({
        name: 'MountainR',
        position: new Vector3(39.906, -1.376, -158.968),
        rotation: new Vector3(0, -0.749, 0),
        scale: new Vector3(61.155, 61.155, 61.155),
        model: this.resources.items.BCMountainR,
        visibility: [0, 100],
      }),
      BCMountainRS: new BCMountainRS({
        name: 'MountainRS',
        position: new Vector3(21.521, 3.897, -49.116),
        rotation: new Vector3(-3.075, -0.701, 3.085),
        scale: new Vector3(3.208, 3.208, 3.208),
        model: this.resources.items.BCMountainRS,
        visibility: [0, 100],
      }),
      BCFlag: new BCFlag({
        name: 'Flag',
        position: new Vector3(6.066, -0.05, -17.924),
        rotation: new Vector3(0.0, 3.5, 0.1),
        scale: new Vector3(1, 1, 1),
        model: this.resources.items.BCFlag,
        visibility: [0, 33],
        modal: [
          {
            type: 'audio',
            source: this.resources.yameteAh,
          },
          {
            type: 'video',
            source: this.resources.yameteAh,
          },
          {
            type: 'image',
            source: this.resources.yameteAh,
          },
          {
            type: 'text',
            source: 'Yamete Ah',
          },
        ],
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

    const scroll = this.scrollManager.current
    const start = c.visibility[0]
    const end = c.visibility[1]

    // If current scroll is between visibility values
    if (start <= scroll && scroll <= end) {
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
    data && this.setInterest({ data })
    this.setInterest({ visible: !!data })

    const val = {
      ...this.camRot,
      fov: this.camera.instance.fov,
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
      this.scrollManager.to(this.scrollManager.current + 0.01)
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

    Object.values(this.components).forEach((c) => this.setComponentVis(c))
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

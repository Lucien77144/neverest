import { Vector3 } from 'three'
import gsap from 'gsap'
import BaseCampCamera from '../Components/BaseCamp/BaseCampCamera/BaseCampCamera'
import BasicScene from '../Modules/Basics/BasicScene'
import BaseCampLight from '../Components/BaseCamp/BaseCampLight/BaseCampLight'
import FloorAnimation from '../Components/BaseCamp/FloorParticles/FloorAnimation'
import BaseCamp1953 from '../Components/BaseCamp/BasicBaseCampSteps/components/BaseCamp1953/BaseCamp1953'
import BaseCamp2024 from '../Components/BaseCamp/BaseCamp2024/BaseCamp2024'
import BaseCamp2050 from '../Components/BaseCamp/BaseCamp2050/BaseCamp2050'

export default class BaseCamp extends BasicScene {
  /**
   * Constructor
   */
  constructor({ interest, infos }) {
    super(infos)

    // Get elements from experience
    this.scrollManager = this.experience.scrollManager
    this.resources = this.experience.resources
    this.renderUniforms = this.experience.renderer.renderMesh.material.uniforms

    // New elements
    this.interest = interest
    this.camFov = 12.5
    this.list = []
    this.playing = false
    this.factorChange = false

    // Store
    // Actions
    this.setInterest = useExperienceStore().setInterest

    // Components
    this.components = {
      camera: new BaseCampCamera(),
      lights: new BaseCampLight(),
      floorAnimation: new FloorAnimation(),

      baseCamp1953: new BaseCamp1953({
        visibility: [0, 25.87],
        CSSVisibility: [0, 25.87],
      }),
      baseCamp2024: new BaseCamp2024({
        visibility: [25.87, 75.97],
        CSSVisibility: [25.87, 75.97],
        active: false,
      }),
      baseCamp2050: new BaseCamp2050({
        visibility: [75.97, 100],
        CSSVisibility: [75.97, 100],
        active: false,
      }),
    }

    // Init the scene
    this.init()
  }

  // --------------------------------
  // Workflow
  // --------------------------------

  /**
   * Watch the current scroll progression
   * @param {*} value Scroll value
   * @param {boolean} visibility Update components visibility
   */
  watchCurrentScroll(value, visibility = true) {
    if (this.scrollManager.disabled) return

    const trigger = this.interest.list?.find(({ start, end }) => {
      return value >= start && value <= end
    })

    const power = trigger?.power || this.interest.base

    if (visibility) {
      Object.values(this.components).forEach((c) => this.setComponentVis(c))
    }

    if (this.interest.curr === power) return

    this.setInterestVis(trigger?.data, false)
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

    console.log(scroll)

    // If current scroll is between visibility values
    const start = c.visibility[0]
    const end = c.visibility[1]
    if (start <= scroll && scroll <= end) {
      !c.isActive && c.toggleActive()

      this.components.floorAnimation.setEffectColor(c.colors.mouse)
      this.components.floorAnimation.setBackgroundColor(c.colors.background)
    } else {
      c.isActive && c.toggleActive()
    }

    // If current scroll is between CSS visibility values
    const startCSS = c.CSSVisibility[0]
    const endCSS = c.CSSVisibility[1]
    if (startCSS <= scroll && scroll <= endCSS) {
      !c.isActiveCSS && c.toggleActiveCSS()
    } else {
      c.isActiveCSS && c.toggleActiveCSS()
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

    const value = {
      fov: this.camera.instance?.fov,
    }

    gsap.to(this.renderUniforms.uFocProgress, {
      value: !!data ? 1 : 0,
      duration: instant ? 0 : 1,
      ease: 'power1.inOut',
    })

    gsap.to(value, {
      fov: !!data ? this.camFov * 0.85 : this.camFov,
      duration: instant ? 0 : 1,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (!this.camera.instance) return
        this.camera.instance.fov = value.fov
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
    this.scrollManager.setFactor(0.05)
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
    this.setInterestVis(null)
    this.setInterest({ visible: false })

    // Init the scene and components (basic scene)
    super.init()
  }

  /**
   * After init and entrance transition end
   */
  onInitComplete() {
    super.onInitComplete()
    this.playing = true

    // Events
    this.watchCurrentScroll(0, false)
    this.scrollManager.on('scroll', ({ current }) =>
      this.watchCurrentScroll(current)
    )
    this.components.floorAnimation.setBackgroundColor(
      this.components.baseCamp1953.colors.background
    )
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

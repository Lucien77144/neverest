import { Raycaster, Scene } from 'three'
import Camera from '../Camera/Camera'
import Experience from '~/webgl/Experience'
import gsap from 'gsap'

export default class BaseScene {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.raycaster = new Raycaster()
    this.$bus = this.experience.$bus

    // New elements
    this.scene = new Scene()
    this.camera = new Camera()
    this.hovered = null
    this.holded = null
    this.holdProgress = null
    this.handleMouseDown = null
    this.handleMouseUp = null
    this.handleMouseMove = null

    // Actions
    this.setProgressHold = useHoldStore().setProgress

    // Getters
    this.progressHold = computed(() => useHoldStore().getProgress)
  }

  /**
   * Set events
   */
  setEvents() {
    this.handleMouseDown = this.onMouseDown.bind(this)
    this.handleMouseUp = this.onMouseUp.bind(this)
    this.handleMouseMove = this.onMouseMove.bind(this)

    this.$bus.on('mousedown', this.handleMouseDown)
    this.$bus.on('mouseup', this.handleMouseUp)
    this.$bus.on('mousemove', this.handleMouseMove)
  }

  /**
   * Raycast on mouse down
   */
  onMouseDown({ centered }) {
    // Clicked item
    const clicked = this.getRaycastedItem(centered, ['onClick'])
    clicked?.onClick?.()

    // Holded item
    this.holded = this.getRaycastedItem(centered, ['onHold'])
    this.holded && this.handleHold()
  }

  /**
   * Raycast on mouse up
   */
  onMouseUp() {
    this.resetHolded()
  }

  /**
   * Raycast on mouse move
   */
  onMouseMove({ centered }) {
    // Get hovered item
    const hovered = this.getRaycastedItem(centered, [
      'onMouseEnter',
      'onMouseLeave',
    ])

    // If mouse leave the hovered item, refresh the hovered item
    if (this.hovered?.id !== hovered?.id) {
      this.hovered?.onMouseLeave?.()
      this.hovered = hovered
      this.hovered?.onMouseEnter?.()
    }

    // Get holded item hovered
    const holded = this.getRaycastedItem(centered, ['onHold'])

    // If user leave the hold item, reset the holded item
    if (this.holded?.item?.id !== holded?.item?.id) {
      this.resetHolded()
    }
  }

  /**
   * Handle hold event
   */
  handleHold() {
    if (this.progressHold.value > 0) return

    // Manage progression with store
    const progress = { value: this.progressHold.value }
    this.holdProgress = gsap.to(progress, {
      value: 100,
      duration: this.holded.holdDuration / 1000,
      ease: 'easeInOut',
      onUpdate: () => this.setProgressHold(progress.value),
      onComplete: () => {
        if (this.holded && this.holded?.item.id === this.holded?.item.id) {
          this.holded?.onHold?.()
          this.resetHolded(true)
        }
      },
    })
  }

  /**
   * Reset holded item
   * @param {boolean} success If the hold event was a success
   */
  resetHolded() {
    this.holdProgress?.kill()
    this.holded = null

    const progress = { value: this.progressHold.value }
    this.holdProgress = gsap.to(progress, {
      value: 0,
      duration: 1 * (progress.value / 100),
      ease: 'easeInOut',
      onUpdate: () => this.setProgressHold(progress.value),
      onComplete: () => {
        setTimeout(() => {
          this.setProgressHold(0)
          this.holdProgress?.kill()
          this.holded = null
        })
      },
    })
  }

  /**
   * Get raycasted item
   * @param {*} centered Coordinates of the cursor
   * @param {*} fn Check available functions in the item
   * @returns Item triggered
   */
  getRaycastedItem(centered, fn = []) {
    if (!this.raycaster) return

    this.raycaster.setFromCamera(centered, this.camera.instance)

    // Filter the components to only get the ones that have the functions in the fn array
    const list = Object.values(this.components).filter(
      (c) => fn.filter((f) => c[f]).length > 0
    )
    // Get the first object that the raycaster intersects
    const target = this.raycaster.intersectObjects(list.map((c) => c.item))?.[0]

    // Return the item that has the object id that matches the target object id
    return list.find((i) => i.item.id === target?.object?.id)
  }

  /**
   * Init the scene
   */
  init() {
    Object.values(this.components).forEach((c) => this.scene.add(c.item))
    this.scene.add(this.camera.instance)

    this.setEvents()
  }

  /**
   * Update the scene
   */
  update() {
    Object.values(this.components).forEach((c) => c.update?.())

    this.camera.update()
  }

  /**
   * Resize the scene
   */
  resize() {
    this.camera.resize()
  }

  /**
   * Dispose the scene
   */
  dispose() {
    Object.values(this.components).forEach((c) => {
      c.dispose?.()
      this.scene.remove(c.item)
    })
    this.scene.remove(this.camera.instance)

    this.components = {}
    this.$bus.off('mousedown', this.handleMouseDown)
    this.$bus.off('mouseup', this.handleMouseUp)
    this.$bus.off('mousemove', this.handleMouseMove)
  }
}

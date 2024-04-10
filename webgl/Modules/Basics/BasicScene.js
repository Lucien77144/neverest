import { Group, Scene } from 'three'
import BasicCamera from './BasicCamera'
import Experience from '~/webgl/Experience'
import gsap from 'gsap'

export default class BasicScene {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.raycaster = this.experience.raycaster
    this.audioManager = this.experience.audioManager
    this.$bus = this.experience.$bus

    // New elements
    this.scene = new Scene()
    this.camera = new BasicCamera()
    this.allComponents = {}
    this.hovered = null
    this.holded = null
    this.holdProgress = null
    this.handleMouseDownEvt = null
    this.handleMouseUpEvt = null
    this.handleMouseMoveEvt = null
    this.handleScrollEvt = null

    // Actions
    this.setProgressHold = useHoldStore().setProgress

    // Getters
    this.progressHold = computed(() => useHoldStore().getProgress)

    // --------------------------------
    // Elements
    // --------------------------------

    /**
     * Components of the scene (Mesh of Groups)
     */
    this.components = {}

    /**
     * Object of audios to add to the scene
     * @param {string} group - Group of the audio
     * @param {boolean} play - If audio is playing
     * @param {boolean} loop - If audio is looping
     * @param {boolean} persist - If true, the audio will not be removed on scene change
     * @param {number} volume - Volume of the audio
     */
    this.audios = {}

    // --------------------------------
    // Functions
    // --------------------------------

    /**
     * On scroll function
     * @param {number} delta - Delta of the scroll
     */
    this.onScroll
  }

  /**
   * Set events
   */
  setEvents() {
    this.handleMouseDownEvt = this.onMouseDownEvt.bind(this)
    this.handleMouseUpEvt = this.onMouseUpEvt.bind(this)
    this.handleMouseMoveEvt = this.onMouseMoveEvt.bind(this)
    this.handleScrollEvt = this.onScrollEvt.bind(this)

    this.$bus.on('mousedown', this.handleMouseDownEvt)
    this.$bus.on('mouseup', this.handleMouseUpEvt)
    this.$bus.on('mousemove', this.handleMouseMoveEvt)
    this.$bus.on('scroll', this.handleScrollEvt)
  }

  /**
   * Raycast on mouse down
   */
  onMouseDownEvt({ centered }) {
    // Clicked item
    const clicked = this.getRaycastedItem(centered, ['onClick'])
    this.triggerFn(clicked, 'onClick')

    // Holded item
    this.holded = this.getRaycastedItem(centered, ['onHold'])
    this.holded && this.handleHold()
  }

  /**
   * Raycast on mouse up
   */
  onMouseUpEvt() {
    this.resetHolded()
  }

  /**
   * Raycast on mouse move
   */
  onMouseMoveEvt({ centered }) {
    // Get hovered item
    // const hovered = this.getRaycastedItem(centered, [
    //   'onMouseEnter',
    //   'onMouseLeave',
    // ])
    // // If mouse leave the hovered item, refresh the hovered item
    // if (this.hovered?.id !== hovered?.id) {
    //   this.triggerFn(this.hovered, 'onMouseLeave')
    //   this.hovered = hovered
    //   this.triggerFn(this.hovered, 'onMouseEnter')
    // }
    // // Get holded item hovered
    // const holded = this.getRaycastedItem(centered, ['onHold'])
    // // If user leave the hold item, reset the holded item
    // if (this.holded?.item?.id !== holded?.item?.id) {
    //   this.resetHolded()
    // }
  }

  /**
   * On scroll event
   */
  onScrollEvt(delta) {
    this.onScroll?.(delta)
    Object.values(this.allComponents).forEach((c) => c.onScroll?.(delta))
  }

  /**
   * Trigger item function
   * @param {*} item Item to trigger
   * @param {*} fn Function to trigger
   * @param {*} arg Argument to pass to the function
   */
  triggerFn(item, fn, arg) {
    item?.[fn] && item[fn](arg)
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
          this.triggerFn(this.holded, 'onHold')
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
    const list = Object.values(this.allComponents).filter(
      (c) => fn.filter((f) => c[f] || c[f] == false).length > 0
    )

    // Get the target object
    const target = this.raycaster.intersectObjects(
      list.map((c) => c.item),
      true
    )?.[0]

    // Return the item that has the object id that matches the target object id
    const match = list.find((i) => i.item.id === target?.object?.id)
    const childMatch = list.find((i) => i.ids.includes(target?.object?.id))

    console.log(list)
    console.log(match)
    return match || childMatch
  }

  /**
   * Add items to the scene
   */
  addItemsToScene() {
    const getItems = (c) => {
      let res = new Group()

      Object.keys(c).forEach((key) => {
        const value = c[key]
        const items = value.components && getItems(value.components)

        if (items?.children?.length > 0) {
          value.item && res.add(value.item)
          res.add(items)
        } else {
          res = value.item
        }

        this.addAudios(value.audios, value.item)
      })

      return res
    }

    this.scene.add(getItems(this.components))
  }

  /**
   * Add a audio to the scene
   * @param {*} audios Object of audios
   * @param {*} parent Parent of the audio (if set)
   */
  addAudios(audios = {}, parent = null) {
    Object.keys(audios)?.forEach((name) => {
      const audio = audios[name]
      this.audioManager.add({
        name,
        ...audio,
        ...(parent && { parent }),
        listener: this.camera.listener,
      })
    })
  }

  /**
   * Remove audios from the scene
   * @param {*} audios Object of audios
   */
  removeAudios(audios = {}, force = false) {
    // Filter by persist and no parents
    const toRemove = Object.keys(audios).filter(
      (name) => !audios[name].persist || force
    )

    toRemove?.forEach((name) => this.audioManager.remove(name))
  }

  /**
   * Get recursive components
   * @returns Object of components flatten
   */
  getRecursiveComponents(components = this.components) {
    const res = {}

    const flatComponents = (c) => {
      Object.keys(c).forEach((key) => {
        const value = c[key]
        value.parentScene = this

        value.ids = []
        value.item?.traverse((i) => {
          value.ids.push(i.id)
        })

        res[key] = value
        value?.components && flatComponents(value.components)
      })
    }
    flatComponents(components)

    return res
  }

  /**
   * Init the scene
   */
  init() {
    this.allComponents = this.getRecursiveComponents()
    this.addItemsToScene()

    this.audios && this.addAudios(this.audios)
    this.scene.add(this.camera.instance)

    this.setEvents()
  }

  /**
   * Update the scene
   */
  update() {
    Object.values(this.allComponents).forEach((c) =>
      this.triggerFn(c, 'update')
    )

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
    // Items
    Object.values(this.allComponents).forEach((c) => {
      this.triggerFn(c, 'dispose')
      this.scene.remove(c.item)
      this.removeAudios(c.audios, true)
    })

    // Audios
    this.audios && this.removeAudios(this.audios)

    // Camera
    this.camera.dispose()
    this.scene.remove(this.camera.instance)

    // Debug
    this.debugFolder && this.debug?.remove(this.debugFolder)

    // Events
    this.$bus.off('mousedown', this.handleMouseDownEvt)
    this.$bus.off('mouseup', this.handleMouseUpEvt)
    this.$bus.off('mousemove', this.handleMouseMoveEvt)
    this.$bus.off('scroll', this.handleScrollEvt)
  }
}

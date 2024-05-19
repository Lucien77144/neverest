import { Group, Scene } from 'three'
import BasicCamera from './BasicCamera'
import Experience from '~/webgl/Experience'
import gsap from 'gsap'
import CSS2DManager from '~/webgl/Utils/CSS2DManager'
import CSS3DManager from '~/webgl/Utils/CSS3DManager'

export default class BasicScene {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.raycaster = this.experience.raycaster
    this.$bus = this.experience.$bus
    this.debug = this.experience.debug

    // New elements
    this.scene = new Scene()
    this.camera = new BasicCamera()
    this.allComponents = {}
    this.hovered = null
    this.holded = null
    this.holdProgress = null
    this.debugFolder = null
    this.wireframe = false

    // Events
    this.handleMouseDownEvt = this.onMouseDownEvt.bind(this)
    this.handleMouseUpEvt = this.onMouseUpEvt.bind(this)
    this.handleMouseMoveEvt = this.onMouseMoveEvt.bind(this)
    this.handleScrollEvt = this.onScrollEvt.bind(this)

    // Utils
    this.css2d = null
    this.css3d = null

    // Actions
    this.setProgressHold = useHoldStore().setProgress
    this.addToCSS2DList = useCSSRendererStore().addToCSS2DList
    this.addToCSS3DList = useCSSRendererStore().addToCSS3DList

    // Getters
    this.progressHold = computed(() => useHoldStore().getProgress)

    // Scope
    this.scope = effectScope()

    // --------------------------------
    // Elements (to override in the child class)
    // --------------------------------

    /**
     * Components included in the item (optional)
     *  Will replace @item by a group (including @item) and add components to it
     *  Components can have children components and items
     * @param {Object} [component] - BasicItems
     */
    this.components = {}

    /**
     * Object of audios to add to the scene
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
     * Add CSS2D to the item
     * @param {ICSS2DRendererStore} item
     */
    this.addCSS2D

    /**
     * Add CSS3D to the item
     * @param {ICSS2DRendererStore} item
     */
    this.addCSS3D

    // --------------------------------
    // Lifecycle
    // --------------------------------

    /**
     * On scroll function
     * @param {number} delta - Delta of the scroll
     */
    this.onScroll

    /**
     * On transition start, before the dispose
     */
    this.onDisposeStart

    /**
     * On switch between scene complete and this scene is the new one
     */
    this.onInitComplete
  }

  // --------------------------------
  // Workflow
  // --------------------------------

  /**
   * Set debug
   */
  setDebug() {
    this.debugFolder = this.debug.panel.addFolder({
      expanded: false,
      title: 'Scene',
    })

    this.debugFolder.addBinding(this, 'wireframe').on('change', () =>
      this.scene.traverse((c) => {
        if (c.isMesh) {
          c.material.wireframe = this.wireframe
        }
      })
    )
  }

  /**
   * Set events
   */
  setEvents() {
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
    // Trigger mouse move on all components
    Object.values(this.allComponents).forEach((c) =>
      this.triggerFn(c, 'onMouseMove', centered)
    )

    // Get hovered item
    const hovered = this.getRaycastedItem(centered, [
      'onMouseEnter',
      'onMouseLeave',
    ])

    // If mouse leave the hovered item, refresh the hovered item
    if (this.hovered?.id !== hovered?.id) {
      this.triggerFn(this.hovered, 'onMouseLeave')
      this.hovered = hovered
      this.triggerFn(this.hovered, 'onMouseEnter')
    }
    // Get holded item hovered
    const holded = this.getRaycastedItem(centered, ['onHold'])
    // If user leave the hold item, reset the holded item
    if (this.holded?.item?.id !== holded?.item?.id) {
      this.resetHolded()
    }
  }

  /**
   * On scroll event
   */
  onScrollEvt(delta) {
    this.triggerFn(this, 'onScroll', delta)
    Object.values(this.allComponents).forEach((c) =>
      this.triggerFn(c, 'onScroll', delta)
    )
  }

  /**
   * Trigger item function (if not false)
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
        this.triggerFn(this.holded, 'onHold')
        this.resetHolded(true)
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
    const list = Object.values(this.allComponents).filter((c) => {
      const funcs = fn.filter((f) => {
        return (c[f] || c[f] == false) && !c.disabledFn?.includes(f)
      })
      return funcs.length > 0
    })

    // Get the target object
    const target = this.raycaster.intersectObjects(
      list.map((c) => c.item),
      true
    )?.[0]

    // Return the triggered item
    // - If fn not set, use the first parent function available
    // - If fn is set or false, return the item (the function will not be triggered if false)
    const match = list.filter((l) => {
      const ids = []
      l.item?.traverse((i) => {
        ids.push(i.id)
      })

      const isSet = fn.find((f) => l?.[f] != null || l?.[f] !== undefined)
      return ids.includes(target?.object?.id) && isSet
    })

    return match[match.length - 1]
  }

  /**
   * Add items to the scene
   */
  addItemsToScene() {
    const getItems = (c) => {
      const childs = Object.values(c.components || {})

      if (childs.length > 0) {
        let res = new Group()
        c.item && res.add(c.item)
        childs.forEach((c) => res.add(getItems(c)))

        this.camera.addAudios(c.audios, res)
        c.item = res
        return c.item
      } else if (c.item) {
        this.camera.addAudios(c.audios, c.item)
        return c.item
      }
    }

    this.scene.add(getItems({ components: this.components }))
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

        res[key] = value
        value.init?.()

        value?.components && flatComponents(value.components)
      })
    }
    flatComponents(components)

    return res
  }

  // --------------------------------
  // Functions
  // --------------------------------

  /**
   * Add CSS2D to the item
   * @param {ICSS2DRendererStore} item
   */
  addCSS2D(item) {
    this.css2d ??= new CSS2DManager(this.scene, this.camera.instance)
    this.addToCSS2DList(item)
  }

  /**
   * Add CSS3D to the item
   * @param {ICSS3DRendererStore} item
   */
  addCSS3D(item) {
    this.css3d ??= new CSS3DManager(this.scene, this.camera.instance)
    this.addToCSS3DList(item)
  }

  // --------------------------------
  // Lifecycle
  // --------------------------------

  /**
   * On scroll function
   * @param {number} delta - Delta of the scroll
   */
  onScroll(delta) {}

  /**
   * Init the scene
   * Automatically called after the constructor
   */
  init() {
    this.allComponents = this.getRecursiveComponents()
    this.addItemsToScene()

    this.debug && this.setDebug()
    this.audios && this.camera.addAudios(this.audios)

    this.scene.add(this.camera.instance)
    this.setEvents()

    Object.values(this.allComponents).forEach((c) => c.afterSceneInit?.())
  }

  /**
   * On switch between scene complete and this scene is the new one
   */
  onInitComplete() {
    // Trigger onInitComplete on all components
    Object.values(this.allComponents).forEach((c) =>
      this.triggerFn(c, 'onInitComplete')
    )
  }

  /**
   * Update the scene
   */
  update() {
    Object.values(this.allComponents).forEach((c) =>
      this.triggerFn(c, 'update')
    )

    this.camera.update()
    this.css2d?.update()
    this.css3d?.update()
  }

  /**
   * Resize the scene
   */
  resize() {
    this.camera.resize()
    this.css2d?.resize()
    this.css3d?.resize()
  }

  /**
   * On transition start, before the dispose
   */
  onDisposeStart() {}

  /**
   * Dispose the scene
   */
  dispose() {
    // Scope
    this.scope.stop()
    this.scope = null

    // Items
    Object.values(this.allComponents).forEach((c) => {
      this.triggerFn(c, 'dispose')
      this.scene.remove(c.item)
      this.camera.removeAudios(c.audios, true)
    })

    // Camera
    this.scene.remove(this.camera.instance)
    this.camera.dispose()
    this.css2d?.dispose()
    this.css3d?.dispose()

    // Debug
    this.debugFolder && this.debug.panel.remove(this.debugFolder)

    // Events
    this.$bus.off('mousedown', this.handleMouseDownEvt)
    this.$bus.off('mouseup', this.handleMouseUpEvt)
    this.$bus.off('mousemove', this.handleMouseMoveEvt)
    this.$bus.off('scroll', this.handleScrollEvt)
  }
}

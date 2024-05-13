import { Group } from 'three'
import Experience from '~/webgl/Experience'

export default class BasicItem {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()

    // New elements
    this.parentScene = null // Parent scene of the item   /!/ - Null in the constructor - /!/

    // Scope
    this.scope = effectScope()

    // --------------------------------
    // Elements (to override in the child class)
    // --------------------------------

    /**
     * Item that will be added to the scene (@Group or @Mesh)
     */
    this.item = new Group()

    /**
     * Components included in the item (optional)
     *  Will replace @item by a group (including @item) and add components to it
     *  Components can have children components and items
     * @param {Object} [component] - BasicItems
     */
    this.components = {}

    /**
     * Object of audios
     * @param {Object} audio.distance - Parent of the audio
     * @param {boolean} audio.play - If audio is playing
     * @param {boolean} audio.loop - If audio is looping
     * @param {boolean} audio.persist - If true, the audio will not be removed on scene change
     * @param {number} audio.volume - Volume of the audio
     */
    this.audios = {}

    /**
     * Debug folder of the item (faculative)
     */
    this.debugFolder = null

    /**
     * Duration after hold event is triggered
     */
    this.holdDuration = 1000

    /**
     * Disable any functions of the item
     * @param {string[]} - Array of functions to disable (onHold, onClick, onMouseEnter, onMouseLeave, onScroll, update)
     */
    this.disabledFn = []

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
     * Init function
     * Automatically called after the constructor
     */
    this.init

    /**
     * After transition init function
     * Automatically called after the scene has been switched
     */
    this.onInitComplete

    /**
     * After the parent scene has been built
     */
    this.afterSceneInit

    /**
     * If set, this function will be called on each tick to update
     * If false, the event will be ignored, even if parent is triggering it
     */
    this.update

    /**
     * If set, this function will be called on click item
     * If false, the event will be ignored, even if parent is triggering it
     */
    this.onClick

    /**
     * If set, this function will be called on mouse down item
     * If false, the event will be ignored, even if parent is triggering it
     */
    this.onMouseMove

    /**
     * If set, this function will be called on mouse enter item
     * If false, the event will be ignored, even if parent is triggering it
     */
    this.onMouseEnter

    /**
     * If set, this function will be called on mouse leave item
     * If false, the event will be ignored, even if parent is triggering it
     */
    this.onMouseLeave

    /**
     * If set, this function will be called on hold item
     * If false, the event will be ignored, even if parent is triggering it
     */
    this.onHold

    /**
     * On scroll function
     * If false, the event will be ignored, even if parent is triggering it
     * @param {number} delta - Delta of the scroll
     */
    this.onScroll
  }

  // --------------------------------
  // Functions
  // --------------------------------

  /**
   * Add CSS2D to the item
   * @param {ICSS2DRendererStore} item
   */
  addCSS2D(item) {
    this.parentScene.addCSS2D(item)
  }

  /**
   * Add CSS3D to the item
   * @param {ICSS2DRendererStore} item
   */
  addCSS3D(item) {
    this.parentScene.addCSS3D(item)
  }

  /**
   * Dispose the item
   */
  dispose() {
    // Scope
    this.scope.stop()
    this.scope = null

    // Debug
    this.debugFolder && this.debug?.remove(this.debugFolder)
  }
}

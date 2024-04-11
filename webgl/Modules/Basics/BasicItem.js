import Experience from '~/webgl/Experience'

export default class BasicItem {
  /**
   * Constructor
   */
  constructor() {
    // --------------------------------
    // Elements
    // --------------------------------

    /**
     * Experience ref
     */
    this.experience = new Experience()

    /**
     * Item that will be added to the scene (@Group or @Mesh)
     */
    this.item

    /**
     * Components included in the item (optional)
     *  Will replace @item by a group (including @item) and add components to it
     *  Components can have children components and items
     * @param {Object} [component] - BasicItems
     */
    this.components = {}

    /**
     * Object of audios
     * @param {Object} distance - Parent of the audio
     * @param {boolean} play - If audio is playing
     * @param {boolean} loop - If audio is looping
     * @param {boolean} persist - If true, the audio will not be removed on scene change
     * @param {number} volume - Volume of the audio
     */
    this.audios = {}

    /**
     * Debug folder of the item (faculative)
     */
    this.debugFolder

    /**
     * Parent scene of the item
     * /!/ - Null in the constructor
     */
    this.parentScene

    /**
     * Duration after hold event is triggered
     */
    this.holdDuration = 1000

    // --------------------------------
    // Functions
    // --------------------------------

    /**
     * Init function
     * Automatically called after the constructor
     */
    this.init

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

  /**
   * Dispose the item
   */
  dispose() {
    this.geometry?.dispose()
    this.material?.dispose()

    this.debugFolder && this.debug?.remove(this.debugFolder)
  }
}
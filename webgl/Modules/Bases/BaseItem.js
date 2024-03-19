export default class BaseItem {
  /**
   * Constructor
   */
  constructor() {
    // --------------------------------
    // Elements
    // --------------------------------

    /**
     * Item that will be add to the scene (Group or Mesh)
     */
    this.item

    /**
     * Duration after hold event is triggered
     */
    this.holdDuration = 1000

    // --------------------------------
    // Functions
    // --------------------------------

    /**
     * If set, this function will be called on each tick to update
     */
    this.update

    /**
     * If set, this function will be called on click item
     */
    this.onClick

    /**
     * If set, this function will be called on mouse enter item
     */
    this.onMouseEnter

    /**
     * If set, this function will be called on mouse leave item
     */
    this.onMouseLeave

    /**
     * If set, this function will be called on hold item
     */
    this.onHold
  }

  /**
   * Dispose the item
   */
  dispose() {
    this.geometry?.dispose()
    this.material?.dispose()
  }
}

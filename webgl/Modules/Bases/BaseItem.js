export default class BaseItem {
  /**
   * Constructor
   */
  constructor() {
    // New elements
    this.material = null
    this.geometry = null
    this.item = null
  }

  /**
   * Update the floor
   */
  update() {}

  /**
   * Dispose the floor
   */
  dispose() {
    this.geometry?.dispose()
    this.material?.dispose()
  }
}

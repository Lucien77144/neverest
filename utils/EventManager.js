/**
 * @class EventManager
 */
class EventManager {
  listeners = {}

  /**
   * Add Event
   *
   * @param {string} name
   * @param {Hook} listener
   */
  addEventListener (name, listener) {
    if (this.listeners[name] === undefined) this.listeners[name] = []

    if (!this.listeners[name].includes(listener))
      this.listeners[name].push(listener)
  }

  /**
   * Remove Event
   *
   * @param {string} name
   * @param {() => void} listener
   */
  removeEventListener (name, listener) {
    if (!Object.keys(this.listeners).length || !this.listeners[name])
      return

    const index = this.listeners[name].indexOf(listener)

    if (index !== -1) this.listeners[name].splice(index, 1)
  }

  /**
   * Trigger Event
   *
   * @param {string} name
   * @param {{}} data
   */
  dispatchEvent (name, data) {
    if (!Object.keys(this.listeners).length || !this.listeners[name]) return

    if (this.listeners[name].length > 0) {
      for (let i = 0; i < this.listeners[name].length; i++) {
        this.listeners[name][i].call(this, data)
      }
    }
  }

  removeEvents () {
    this.listeners = {}
  }
}

export default EventManager

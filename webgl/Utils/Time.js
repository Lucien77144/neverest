export default class Time {
  constructor() {
    // New elements
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.playing = true
    this.ticker = null
    this.tick = this.tick.bind(this)

    // Plugin
    this.$bus = useNuxtApp().$bus

    // Tick
    this.tick()
  }

  /**
   * Start time
   */
  start() {
    this.playing = true
  }

  /**
   * Pause time
   */
  pause() {
    this.playing = false
  }

  /**
   * Update time values
   */
  tick() {
    this.ticker = window.requestAnimationFrame(this.tick)

    const current = Date.now()

    this.delta = current - this.current
    this.elapsed += this.playing ? this.delta : 0
    this.current = current

    if (this.delta > 60) {
      this.delta = 60
    }

    this.playing && this.$bus.emit('tick')
  }

  /**
   * Stop time
   */
  stop() {
    window.cancelAnimationFrame(this.ticker)
  }
}

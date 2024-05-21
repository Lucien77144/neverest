export default class KeysManager extends EventEmitter {
  // Public
  public el: HTMLElement | Window
  public enabled: boolean

  // Private
  private _handleKeyDown: any
  private _handleKeyUp: any

  /**
   * Constructor
   */
  constructor(_options?: { el?: HTMLElement | Window }) {
    super()

    // Public
    this.el = _options?.el || window
    this.enabled = true

    // Init
    this._initBinds()
    this._initEvents()
  }

  /**
   * Setup binds for the cursor
   */
  private _initBinds(): void {
    this._handleKeyDown = (e: KeyboardEvent) => this._keyDown.bind(this)(e)
    this._handleKeyUp = (e: KeyboardEvent) => this._keyUp.bind(this)(e)
  }

  /**
   * Setup events for the cursor
   */
  private _initEvents(): void {
    this.el.addEventListener('keydown', this._handleKeyDown)
    this.el.addEventListener('keyup', this._handleKeyUp)
  }

  /**
   * On key down
   * @param evt Keyboard event
   */
  private _keyDown(evt: KeyboardEvent): void {
    if (!this.enabled) return
    this.trigger('keydown', evt)
  }

  /**
   * On key up
   * @param evt Keyboard event
   */
  private _keyUp(evt: KeyboardEvent): void {
    if (!this.enabled) return
    this.trigger('keydown', evt)
  }

  /**
   * Destroy the cursor and remove all events
   */
  public destroy(): void {
    this.el.removeEventListener('keydown', this._handleKeyDown)
    this.el.removeEventListener('keyup', this._handleKeyUp)
  }

  // Getters and setters

  /**
   * Check if the cursor is enabled
   */
  get isEnabled(): boolean {
    return this.enabled
  }

  /**
   * Disable the cursor
   */
  set setEnabled(state: boolean) {
    this.enabled = state
  }
}

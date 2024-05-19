import { Pane } from 'tweakpane'
import DragManager from '~/utils/DragManager'
import Experience from '../Experience'
import Stats from './Stats'

export default class Debug {
  static _instance

  /**
   * Constructor
   */
  constructor() {
    if (Debug._instance) {
      return Debug._instance
    }
    Debug._instance = this

    // Get elements from experience
    this.experience = new Experience()
    this.viewport = this.experience.viewport

    // New elements
    this.panel = null
    this.preset = null
    this.stats = null

    // Init
    this.init()
  }

  /**
   * Set drag debugger
   */
  setDragDebug() {
    const folder = this.debug.addFolder({
      expanded: false,
      title: 'Debugger Position',
    })
    this.debug.dragButton = folder.addButton({ title: 'Drag Position' })
    folder
      .addButton({ title: 'Reset Position' })
      .on('click', () => this.handlePosChange({ x: 0, y: 0 }))

    // Init a drag manager and it event
    this.dragManager = new DragManager({ el: this.debug.dragButton.element })
    this.dragManager.on('drag', this.onDrag.bind(this))
  }

  /**
   * Set scroll debugger
   */
  setScrollDebug() {
    const folder = this.debug.addFolder({
      expanded: false,
      title: 'Scroll',
      closed: false,
    })

    folder.addBinding(this.scrollManager, 'factor', {
      label: 'Factor',
      min: 0,
      max: 1,
      step: 0.001,
    })

    folder.addBinding(this.scrollManager, 'speed', {
      label: 'Speed',
      min: 0,
      max: 1,
      step: 0.001,
    })
  }

  /**
   * Make a binding or folder persistent in local storage
   * @param {*} debug
   * @returns {*} Preset values
   */
  persist(debug) {
    const label = debug.label
    debug.importState(this.preset[label])

    debug.on('change', () => {
      this.preset[label] = debug.exportState()
      this.savePreset()
    })

    return this.preset[label]
  }

  /**
   * Init local storage values
   */
  initPreset() {
    this.preset = JSON.parse(localStorage.getItem('debug-pane') || '{}')
  }

  /**
   * Save the preset in the local storage
   */
  savePreset() {
    localStorage.setItem('debug-pane', JSON.stringify(this.preset))
  }

  /**
   * Init the debug
   */
  init() {
    // Init stats
    this.stats = new Stats(this.viewport.debug)

    // Init tweakpane
    this.panel = new Pane({
      title: 'Debug',
      expanded: true,
    })

    // Init local storage values
    this.initPreset()
  }

  /**
   * Update the debug
   */
  update() {
    this.stats?.update()
  }

  /**
   * Dispose the debug
   */
  dispose() {
    this.panel.dispose()
    this.stats.dispose()
  }
}

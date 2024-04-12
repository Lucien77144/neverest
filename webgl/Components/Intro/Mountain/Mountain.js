import { ConeGeometry, Mesh, MeshNormalMaterial, Vector3 } from 'three'
import { MathUtils } from 'three'
import scenes from '~/const/scenes.const'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class Mountain extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // Get elements from experience
    this.$bus = this.experience.$bus

    // New elements
    this.geometry = null
    this.material = null
    this.test = null
    this.holdDuration = 2000
  }

  /**
   * Get geometry
   */
  setGeometry() {
    this.geometry = new ConeGeometry(4, 8, 16)
  }

  /**
   * Get material
   */
  setMaterial() {
    this.material = new MeshNormalMaterial()
  }

  /**
   * Get mesh
   */
  setMesh() {
    this.item = new Mesh(this.geometry, this.material)
  }

  /**
   * Set audio of the scene
   */
  setAudio() {
    this.audios = {
      onichan: { loop: true, volume: 0.5 },
      yameteAh: { loop: true, volume: 0.25, persist: true },
      // babyshark: { loop: true, volume: 0.3 },
    }
  }

  /**
   * On hold item
   */
  onHold() {
    const scene = scenes.list.find((scene) => scene.name === 'basecamp')
    this.$bus.emit('scene:switch', scene)
  }

  /**
   * Init the floor
   */
  init() {
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
    this.setAudio()
  }

  /**
   * Update the floor
   */
  update() {
    
  }
}

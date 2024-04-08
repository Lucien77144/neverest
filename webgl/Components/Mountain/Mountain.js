import { ConeGeometry, Mesh, MeshNormalMaterial } from 'three'
import { MathUtils } from 'three'
import scenes from '~/const/scenes.const'
import Experience from '~/webgl/Experience'
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
    this.holdDuration = 2000

    // Init
    this.init()
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
      onichan: { group: 'Cringe', loop: true, volume: 0.5 },
      yameteAh: { group: 'Cringe', loop: true, volume: 0.25, persist: true },
      // babyshark: { group: 'Enfants', loop: true, volume: 0.3 },
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
   * On scroll
   * @param {*} delta
   */
  onScroll(delta) {
    this.item.rotation.y += MathUtils.degToRad(delta / 25)
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
    this.item.rotation.y += 0.005
  }
}

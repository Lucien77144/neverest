import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three'
import { MathUtils } from 'three'
import Experience from '~/webgl/Experience'
import BaseItem from '~/webgl/Modules/Bases/BaseItem'

export default class Cube extends BaseItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // Get elements from experience
    this.experience = new Experience()
    this.$bus = this.experience.$bus

    // New elements
    this.geometry = null
    this.material = null
    this.holdDuration = 2000

    // Store
    this.currentScroll = computed(() => useScrollStore().getCurrent)

    // Init
    this.init()
  }

  /**
   * Get geometry
   */
  setGeometry() {
    this.geometry = new BoxGeometry(4, 4, 4)
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
   * On hold item
   */
  onHold() {
    console.log('holded after : ', this.holdDuration, 'ms')
  }

  /**
   * Update the cube
   */
  update() {
    this.item.rotation.y = MathUtils.lerp(
      this.item.rotation.y,
      this.currentScroll.value * 0.1,
      0.1
    )
  }

  /**
   * Init the floor
   */
  init() {
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }
}

import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class Cube extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // New elements
    this.geometry = null
    this.material = null
    this.mesh = null
    this.holdDuration = 2000

    // Store
    this.currentScroll = computed(() => useScrollStore().getCurrent)
  }

  /**
   * Set geometry
   */
  setGeometry() {
    this.geometry = new BoxGeometry(4, 4, 4)
  }

  /**
   * Set material
   */
  setMaterial() {
    this.material = new MeshNormalMaterial()
  }

  /**
   * Set mesh
   */
  setMesh() {
    this.mesh = new Mesh(this.geometry, this.material)
  }

  /**
   * Set item
   */
  setItem() {
    // this.item = new Mesh(this.geometry, this.material)
    this.item = this.mesh
  }

  /**
   * Set the player
   */
  setPlayer() {
    // this.components = {}

    // this.item.add(this.components.player.item)
  }

  /**
   * On hold item
   */
  onHold() {
    console.log('holded after : ', this.holdDuration, 'ms')
  }

  /**
   * On click item
   */
  onClick() {
    console.log('clicked')

    // this.components.player.item.visible = !this.components.player.item.visible
  }

  /**
   * Update the cube
   */
  update() {
    // this.item.rotation.y = MathUtils.lerp(
    //   this.item.rotation.y,
    //   this.currentScroll.value * 0.1,
    //   0.1
    // )
  }

  /**
   * Init the floor
   */
  init() {
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
    this.setItem()
    this.setPlayer()
  }
}

import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three'
import { lerp } from 'three/src/math/MathUtils'
import BaseItem from '~/webgl/Modules/Bases/BaseItem'

export default class Cube extends BaseItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // New elements
    this.geometry = null
    this.material = null
    this.item = null

    // Store
    this.currentScroll = computed(() => useScrollStore().getCurrent)

    // Plugin
    this.$bus = useNuxtApp().$bus

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
   * On click
   */
  onClick() {
    console.log('click');
    this.$bus.emit('openModal', this)
  }

  onHover() {
    console.log('hover');
  }

  /**
   * Update the cube
   */
  update() {
    this.item.rotation.y = lerp(
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

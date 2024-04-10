import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three'
import { MathUtils } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class RockyCube extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // New elements
    this.geometry = null
    this.material = null
    this.holdDuration = 2000

    // Store
    this.currentScroll = computed(() => useScrollStore().getCurrent)
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
   * Set audio of the scene
   */
  setAudio() {
    this.audios = {
      tedTalk: {
        loop: true,
        play: true,
        volume: 1,
        persist: true,
        parent: false,
      },
    }
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
    this.setAudio()
  }
}

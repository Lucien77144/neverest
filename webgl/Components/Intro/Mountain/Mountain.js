import { MeshToonMaterial } from 'three'
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
    this.experience = new Experience()
    this.resources = this.experience.resources.items

    this.$bus = this.experience.$bus

    // New elements
    this.geometry = null
    this.material = null
    this.test = null
  }

  setMaterial() {
    this.material = new MeshToonMaterial({ side: 0, color: 0xffffff })
  }

  setItem() {
    const item = this.resources.introMountain.scene.clone()
    this.item = item.children[0].children[0].children[0].children[0]
    this.item.rotation.x = -Math.PI * 0.5
    this.item.scale.set(0.005, 0.005, 0.005)
    this.item.material = new MeshToonMaterial({ side: 0, color: 0xffffff })
  }

  onHold() {
    const scene = scenes.nav.list.find((s) => s.name === 'basecamp')

    scene && this.$bus.emit('scene:switch', scene)
  }

  init() {
    this.setMaterial()
    this.setItem()
  }
}

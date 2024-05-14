import { Sprite, SpriteMaterial, Vector3 } from 'three'
import { clamp } from 'three/src/math/MathUtils'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class ModalSprite extends BasicItem {
  /**
   * Constructor
   */
  constructor({ position, data }) {
    super()
    // Elements
    this.resources = this.experience.resources.items
    this.position = position
    this.data = data

    // New elements
    this.camera = null
    this.item = null
    this.material = null
    this.active = false
  }

  /**
   * Get material
   */
  setMaterial() {
    this.material = new SpriteMaterial({
      map: this.resources.circle,
    })
  }

  /**
   * Get mesh
   */
  setSprite() {
    this.item = new Sprite(this.material)
    this.item.position.copy(this.position)
  }

  /**
   * On click item
   */
  onClick() {
    console.log('clicked')
    this.item.active = !this.item.active
  }

  /**
   * Update
   */
  update() {
    // update the sprite scale
    const target = new Vector3()
    const camTarget = new Vector3()

    const camPos = this.camera.getWorldPosition(camTarget)
    const pos = this.item.getWorldPosition(target)

    const distance = camPos.distanceTo(pos)

    const scale = clamp(distance / 40, 0.35, 1)
    this.item.scale.set(scale, scale, scale)
  }

  /**
   * Init
   */
  init() {
    this.camera = this.parentScene.camera.instance
    this.setMaterial()
    this.setSprite()
  }
}

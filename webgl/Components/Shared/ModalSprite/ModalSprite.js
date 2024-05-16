import gsap from 'gsap'
import { ClampToEdgeWrapping, Sprite, SpriteMaterial, Vector3 } from 'three'
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
    this.renderUniforms = this.experience.renderer.renderMesh.material.uniforms
    this.$bus = this.experience.$bus
    this.position = position
    this.data = data

    // New elements
    this.camera = null
    this.item = null
    this.material = null
    this.active = false
    this.scale = 1
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
   * Set uniforms of the render mesh
   */
  setUniforms() {
    this.resources.modalT1.wrapS = this.resources.modalT1.wrapT =
      ClampToEdgeWrapping
    this.resources.modalT2.wrapS = this.resources.modalT2.wrapT =
      ClampToEdgeWrapping
    this.resources.modalT2.wrapS = this.resources.modalT2.wrapT =
      ClampToEdgeWrapping

    this.resources.modalT1.repeat.set(1, 1)
    this.resources.modalT2.repeat.set(1, 1)
    this.resources.modalT3.repeat.set(1, 1)

    this.renderUniforms.uModalT1.value = this.resources.modalT1
    this.renderUniforms.uModalT2.value = this.resources.modalT2
    this.renderUniforms.uModalT3.value = this.resources.modalT3
  }

  /**
   * On click item
   */
  onClick() {
    gsap.to(this.renderUniforms.uModalProgress, {
      value: 1,
      duration: 1.5,
      ease: 'power1.inOut',
      onStart: () => this.$bus.emit('modal:init'),
      onComplete: () => this.$bus.emit('modal:open', this.data),
    })

    gsap.to(this, {
      scale: 0.75,
      duration: 0.75,
      ease: 'power1.inOut',
    })
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

    const scale = clamp(distance / 40, 0.35, 1) * this.scale
    this.item.scale.set(scale, scale, scale)
  }

  /**
   * Init
   */
  init() {
    this.camera = this.parentScene.camera.instance
    this.setMaterial()
    this.setSprite()
    this.setUniforms()
  }
}

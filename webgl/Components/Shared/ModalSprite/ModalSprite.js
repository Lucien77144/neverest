import gsap from 'gsap'
import { CustomEase } from 'gsap/all'
import { ClampToEdgeWrapping, Sprite, SpriteMaterial, Vector3 } from 'three'
import { clamp } from 'three/src/math/MathUtils'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
gsap.registerPlugin(CustomEase)

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
   * On click item
   */
  onClick() {
    const base = { value: this.camera.fov }
    const fov = { value: this.camera.fov }
    gsap.to(this.renderUniforms.uModalProgress, {
      value: 1,
      duration: 1.5,
      ease: CustomEase.create(
        'custom',
        'M0,0 C0.799,0 0.72,0.004 0.8,0.683 0.826,0.91 0.849,1 1,1 '
      ),
      onStart: () => this.$bus.emit('modal:init'),
      onComplete: () => {
        this.$bus.emit('modal:open', this.data)
        this.camera.fov = base.value
        this.camera.updateProjectionMatrix()
      },
    })

    gsap.to(fov, {
      value: base.value * 0.5,
      duration: 0.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        this.camera.fov = fov.value
        this.camera.updateProjectionMatrix()
      },
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
  }
}

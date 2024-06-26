import { UIModalPlayer } from '#components'
import gsap from 'gsap'
import { CustomEase } from 'gsap/all'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
gsap.registerPlugin(CustomEase)

export default class ModalBtn extends BasicItem {
  /**
   * Constructor
   */
  constructor({ position, data, name }) {
    super()

    // Elements from Experience
    this.scrollManager = this.experience.scrollManager
    this.keysManager = this.experience.keysManager
    this.resources = this.experience.resources.items
    this.renderUniforms = this.experience.renderer.renderMesh.material.uniforms
    this.$bus = this.experience.$bus

    // New elements
    this.position = position
    this.data = data
    this.name = name
    this.camera = null
    this.flag = false
  }

  /**
   * Toggle modal effects
   * @param {boolean} data - Open or close the modal
   */
  toggleModal(data) {
    if (this.flag) return
    this.flag = true

    this.$bus.emit('audio:click')
    this.scrollManager.setDisable(!!data)

    gsap.to(this.renderUniforms.uModalProgress, {
      value: data ? 1 : 0,
      duration: 1,
      ease: data ? 'power2.in' : 'circ.out',
      onStart: () => this.$bus.emit('modal:init'),
      onUpdate: () => {
        if (this.renderUniforms.uModalProgress.value > 0.25) {
          if (data) {
            this.$bus.emit('modal:open', data)
          } else {
            this.$bus.emit('modal:destroy')
          }
        }
      },
      onComplete: () => {
        this.flag = false
      },
    })

    if (data) {
      const fov = { value: this.camera.fov, base: this.camera.fov }

      gsap.to(fov, {
        value: fov.base * 0.9,
        duration: 0.5,
        ease: CustomEase.create(
          'custom',
          'M0,0 C0.097,0.602 0.139,1 0.5,1 0.847,1 0.9,0.6 1,0 '
        ),
        onUpdate: () => {
          this.camera.fov = fov.value
          this.camera.updateProjectionMatrix()
        },
        onComplete: () => {
          this.camera.fov = fov.base
          this.camera.updateProjectionMatrix()
        },
      })
    }
  }

  /**
   * Init
   */
  init() {
    this.addCSS2D({
      id: this.name + '_modal',
      template: UIModalPlayer,
      data: this.data,
      parent: this.item,
      position: this.position,
    })

    this.$bus.on('modal:toggle', (data) => this.toggleModal(data))
    this.keysManager.on('keydown', ({ keyCode }) => {
      if (keyCode === 27 && this.renderUniforms.uModalProgress.value > 0) {
        this.toggleModal()
      }
    })

    this.camera = this.parentScene.camera.instance
  }

  /**
   * Dispose
   */
  dispose() {
    this.keysManager.off('keydown')
    this.$bus.off('modal:toggle')
  }
}

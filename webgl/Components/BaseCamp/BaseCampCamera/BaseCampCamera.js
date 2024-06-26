import { AnimationMixer } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class BaseCampCamera extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()

    // Get elements from experience
    this.resources = this.experience.resources
    this.scrollManager = this.experience.scrollManager

    // New elements
    this.name = null
    this.model = null
    this.position = null
    this.rotation = null
    this.scale = null
    this.mixer = null
    this.animationAction = null
    this.baseCamRot = null
    this.camRotTarget = {
      x: 0,
      y: 0,
    }
  }

  /**
   * Set Mixer
   */
  setMixer() {
    // Set mixer
    this.mixer = new AnimationMixer(this.model.scene)

    // Set action
    this.animationAction = this.mixer.clipAction(this.model.animations[0])
  }

  /**
   * Set Model
   * @param {Object} _model
   * @param {Object} _model.geometry
   * @param {Object} _model.material
   */
  setModel(_model) {
    if (!_model) return

    this.model = _model
  }

  /**
   * Set item
   */
  setItem() {
    this.setModel(this.resources.items.BCAnimCam)
    this.setMixer()

    // Set item
    this.item = this.model.scene

    // Set item name
    this.item.name = this.name

    // Set item position
    this.position &&
      this.item.position.set(this.position.x, this.position.y, this.position.z)

    // Set item rotation
    this.rotation &&
      this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)

    // Set item scale
    this.scale && this.item.scale.copy(this.scale)

    // Set item visibility
    this.item.children[0].visible = false
  }

  /**
   * Play animation on scroll
   * @param {Number} position scroll value
   * @param {Boolean} force force play
   */
  playAnimation(position, force = false) {
    if (!this.mixer || !this.item || !this.parentScene.camera.instance) return

    if (!this.scrollManager.disabled || force) {
      const animDuration = this.animationAction.getClip().duration

      this.mixer.setTime((position * animDuration) / (100 / 2))
      this.animationAction.play()
      this.mixer.update(1 / 60)
    }

    this.parentScene.camera.instance.position.copy(
      this.item.children[0].position
    )

    const rotation = this.item.children[0].rotation.clone()
    this.parentScene.camera.instance.rotation.set(
      rotation.x - Math.PI / 2,
      -rotation.z,
      rotation.y
    )

    if (this.camRotTarget) {
      this.parentScene.camera.instance.rotation.x += this.camRotTarget.x
      this.parentScene.camera.instance.rotation.y += this.camRotTarget.y
    }
  }

  /**
   * On mouse move in the window
   * @param {*} centered Centered mouse position
   */
  onMouseMove(centered) {
    this.camRotTarget = {
      x: centered.y * 0.0025,
      y: -centered.x * 0.0025,
    }
  }

  /**
   * Init
   */
  init() {
    // Set item
    this.setItem()
    this.baseCamRot = this.parentScene.camera.instance.rotation.clone()
    this.playAnimation(0, true)
  }

  /**
   * Update
   */
  update() {
    this.parentScene?.playing && this.playAnimation(this.scrollManager.current)
  }
}

import { UIIntroData } from '#components'
import { MeshNormalMaterial, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class BaseCampItem extends BasicItem {
  /**
   * Constructor
   */
  constructor(_options = {}) {
    super()
    this.options = _options
    this.$bus = this.experience.$bus

    // New elements
    this.name = null
    this.model = null
    this.position = null
    this.rotation = null
    this.scale = null
    this.visibility = null

    // Store
    this.currentScroll = computed(
      () => Math.round(useScrollStore().getCurrent * 10000) / 10000
    )

    // Watch
    this.scope.run(() => {
      watch(this.currentScroll, (v) => this.updateVisibility())
    })
  }

  /**
   * Set Name
   */
  setName() {
    this.name = this.options.name
  }

  /**
   * Set Visibility
   * @param {Array} _visibility
   */
  setVisibility(_visibility) {
    this.visibility = _visibility
  }

  /**
   * Set Model
   * @param {Object} _model
   * @param {Object} _model.geometry
   * @param {Object} _model.material
   */
  setModel(_model) {
    if (!_model) return

    this.model = _model.scene.clone()
  }

  /**
   * Set Position
   * @param {Object} _position
   * @param {Number} _position.x
   * @param {Number} _position.y
   * @param {Number} _position.z
   */
  setPosition(_position) {
    this.position = _position
  }

  /**
   * Set Rotation
   * @param {Object} _rotation
   * @param {Number} _rotation.x
   * @param {Number} _rotation.y
   * @param {Number} _rotation.z
   */
  setRotation(_rotation) {
    this.rotation = _rotation
  }

  /**
   * Set Scale
   * @param {Object} _scale
   * @param {Number} _scale.x
   * @param {Number} _scale.y
   * @param {Number} _scale.z
   */
  setScale(_scale) {
    this.scale = _scale
  }

  /**
   * Set item
   */
  setItem() {
    this.setName()
    this.setVisibility(this.options.visibility)
    this.setModel(this.options.model)
    this.setPosition(this.options.position)
    this.setRotation(this.options.rotation)
    this.setScale(this.options.scale)

    // Set item
    this.item = this.model

    // Set item material
    this.item.children[0].material = new MeshNormalMaterial()

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
    if (this.visibility[0] > this.currentScroll.value) {
      this.item.children[0].visible = false
    }
  }

  /**
   * Update item visibility
   */
  updateVisibility() {
    if (!this.visibility?.length) return

    // if current scroll is between visibility values
    if (
      this.visibility[0] <= this.currentScroll.value &&
      this.currentScroll.value <= this.visibility[1]
    ) {
      this.item.children[0].visible = true
    } else {
      this.item.children[0].visible = false
    }
  }

  /**
   * On init complete
   */
  onInitComplete() {
    if (this.name == 'Tent_Primative_main') {
      this.addCSS2D({
        id: 'tent-primative-main',
        template: UIIntroData,
        data: {
          value: 'This is a tent dialog',
        },
        parent: this.item,
        sprite: true,
        position: new Vector3(0, 1, 0),
      })
    }
  }

  /**
   * Init
   */
  init() {
    // Set item
    this.setItem()
  }
}

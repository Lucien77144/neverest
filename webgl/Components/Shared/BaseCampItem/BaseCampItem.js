import { MeshNormalMaterial, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class BaseCampItem extends BasicItem {
  /**
   * Constructor
   */
  constructor(_options = {}) {
    super()

    this.options = _options

    // New elements
    this.name = null
    this.model = null
    this.position = null
    this.rotation = null
    this.scale = null
    this.holdDuration = 2000
  }

  /**
   * Set Name
   */
  setName() {
    this.name = this.options.name
  }

  /**
   * Set Model
   * @param {Object} _model
   * @param {Object} _model.geometry
   * @param {Object} _model.material
   */
  setModel(_model) {
    this.model = _model.clone()
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
    this.setModel(this.options.model)
    this.setPosition(this.options.position)
    this.setRotation(this.options.rotation)
    this.setScale(this.options.scale)

    this.item = this.model
    this.item.children[0].material = new MeshNormalMaterial()
    this.item.name = this.name
    this.position &&
      this.item.position.set(this.position.x, this.position.y, this.position.z)
    this.rotation &&
      this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.scale && this.item.scale.copy(this.scale)
  }

  /**P
   * Init
   */
  init() {
    // Set item
    this.setItem()
  }
}

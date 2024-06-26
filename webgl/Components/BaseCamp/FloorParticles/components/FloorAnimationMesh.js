import { Mesh, PlaneGeometry } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class FloorAnimationMesh extends BasicItem {
  /**
   * Constructor
   */
  constructor({ position, size }) {
    super()

    // Get from parent
    this.animEffect = null

    // Elements
    this.position = position
    this.size = size
  }

  /**
   * On mouse hover
   * @param {*} target
   */
  onMouseHover({ target }) {
    this.animEffect?.setTarget(target.point)
  }

  /**
   * Set the mesh to focus the cursor
   */
  setMesh() {
    this.geometry = new PlaneGeometry(this.size.x, this.size.y)
    this.item = new Mesh(this.geometry)
    this.item.position.z = -45
    this.item.rotation.x = -Math.PI / 2
    this.item.visible = false
  }

  /**
   * Init
   */
  init() {
    this.setMesh()
  }

  /**
   * After scene init
   */
  afterSceneInit() {
    this.animEffect = this.parentComponent.components.effect
  }
}

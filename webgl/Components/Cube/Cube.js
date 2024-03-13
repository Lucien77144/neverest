import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import BaseItem from '~/webgl/Modules/Bases/BaseItem'

export default class Cube extends BaseItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // New elements
    this.geometry = null
    this.material = null
    this.item = null

    // Init
    this.init()
  }

  /**
   * Get geometry
   */
  setGeometry() {
    this.geometry = new BoxGeometry(4, 4, 17)
  }

  /**
   * Get material
   */
  setMaterial() {
    this.material = new MeshBasicMaterial({ color: 0x0000ff })
  }

  /**
   * Get mesh
   */
  setMesh() {
    this.item = new Mesh(this.geometry, this.material)

    this.item.rotation.x = -Math.PI / 2
    this.item.position.y = -3
  }

  /**
   * Init the floor
   */
  init() {
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }
}

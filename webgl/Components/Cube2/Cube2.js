import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three'
import BaseItem from '~/webgl/Modules/Basics/BasicItem'

export default class Cube2 extends BaseItem {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.geometry = null
    this.material = null

    // Init
    this.init()
  }

  /**
   * Get geometry
   */
  setGeometry() {
    this.geometry = new BoxGeometry(4, 4, 4)
  }

  /**
   * Get material
   */
  setMaterial() {
    this.material = new MeshNormalMaterial()
  }

  /**
   * Get mesh
   */
  setMesh() {
    this.item = new Mesh(this.geometry, this.material)

    this.item.rotation.x = 0.5
    this.item.rotation.y = Math.PI*0.25
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
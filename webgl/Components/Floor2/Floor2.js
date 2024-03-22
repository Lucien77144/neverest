import { Mesh, MeshNormalMaterial, PlaneGeometry } from 'three'
import BaseItem from '~/webgl/Modules/Basics/BasicItem'

export default class Floor2 extends BaseItem {
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
    this.geometry = new PlaneGeometry(50, 20)
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

    this.item.position.z = -3
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

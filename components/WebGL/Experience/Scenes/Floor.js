import * as THREE from 'three'
import Experience from '../Experience'

export default class Floor {
  /**
   * Constructor
   */
  constructor() {
    // Get elements from experience
    this.experience = new Experience()
    this.scene = this.experience.scene

    // New elements
    this.geometry = null
    this.material = null
    this.mesh = null

    // Init
    this._init()
  }

  /**
   * Get geometry
   */
  _setGeometry() {
    this.geometry = new THREE.PlaneGeometry(10, 10)
  }

  /**
   * Get material
   */
  _setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  }

  /**
   * Get mesh
   */
  _setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.mesh.rotation.x = -Math.PI / 2
    this.mesh.position.y = -3
  }

  /**
   * Init the floor
   */
  _init() {
    this._setGeometry()
    this._setMaterial()
    this._setMesh()

    this.scene.add(this.mesh)
  }

  /**
   * Update the floor
   */
  update() {}

  /**
   * Destroy the floor
   */
  destroy() {}
}

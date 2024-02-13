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
  _getGeometry() {
    return new THREE.PlaneGeometry(3, 3)
  }

  /**
   * Get material
   */
  _getMaterial() {
    return new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  }

  /**
   * Get mesh
   */
  _getMesh() {
    return new THREE.Mesh(this.geometry, this.material)
  }

  /**
   * Init the floor
   */
  _init() {
    this.geometry = this._getGeometry()
    this.material = this._getMaterial()
    this.mesh = this._getMesh()
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

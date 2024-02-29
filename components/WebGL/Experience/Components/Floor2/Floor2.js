import * as THREE from 'three'

export default class Floor2 {
  /**
   * Constructor
   */
  constructor() {
    // New elements
    this.geometry = null
    this.material = null
    this.item = null

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
    this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
  }

  /**
   * Get mesh
   */
  _setMesh() {
    this.item = new THREE.Mesh(this.geometry, this.material)

    this.item.rotation.x = -Math.PI / 2
    this.item.position.y = -3
  }

  /**
   * Init the floor
   */
  _init() {
    this._setGeometry()
    this._setMaterial()
    this._setMesh()
  }

  /**
   * Update the floor
   */
  update() {}

  /**
   * Dispose the floor
   */
  dispose() {
    this.geometry.dispose()
    this.material.dispose()
  }
}

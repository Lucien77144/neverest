import { DoubleSide, InstancedMesh, MeshNormalMaterial, Object3D } from 'three'
import { BCMEDIUMBOX_1953 } from '~/const/blocking/baseCamp.const'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'

export default class BCMediumBox_1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCMediumBox_1953',
    visibility = [0, 100],
    isInstances = true,
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility
    this.isInstances = isInstances

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Set Instances
   */
  setInstances() {
    const instance = this.resources.BCMediumBox_1953.scene.children[0]
    // const material = new TextureCraieMaterial({
    //   side:0,
    //   color:'#FF0000',
    //   bgColor:'#F8ECE8',
    //   texture:this.resources.BCMediumBox_1953Texture
    // }).instance
    const dummy = new Object3D()
    this.item = new InstancedMesh(instance.geometry, instance.material, BCMEDIUMBOX_1953.length)

    BCMEDIUMBOX_1953.forEach((el, i) => {
      dummy.position.set(el.position.x, el.position.y, el.position.z)
      dummy.rotation.set(el.rotation.x, el.rotation.y, el.rotation.z)
      dummy.updateMatrix()
      this.item.setMatrixAt(i, dummy.matrix)
    })

    this.item.instanceMatrix.needsUpdate = true
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCMediumBox_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    this.item.children[0].material = new MeshNormalMaterial()
    this.item.children[0].material.side = DoubleSide
  }

  /**
   * Init
   */
  init() {
    this.isInstances && this.setInstances()
    !this.isInstances && this.setItem()
    // !this.isInstances && this.setMaterial()
  }
}

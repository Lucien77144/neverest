import { InstancedMesh, Object3D, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { BCSMALLBOX_2024 } from '~/const/blocking/baseCamp.const'

export default class SmallBox2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'SmallBox2024',
    isInstances = true,
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.isInstances = isInstances

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Set Instances
   */
  setInstances() {
    const instance = this.resources.BCSmallBox_2024.scene.children[0]
    const dummy = new Object3D()
    this.item = new InstancedMesh(
      instance.geometry,
      instance.material,
      BCSMALLBOX_2024.length
    )

    BCSMALLBOX_2024.forEach((el, i) => {
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
    this.item = this.resources.BCSmallBox_2024.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Init the box
   */
  init() {
    this.isInstances && this.setInstances()
    !this.isInstances && this.setItem()
  }
}

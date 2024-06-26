import { InstancedMesh, Object3D, Vector3 } from 'three'
import { BCBIGBOX_1953 } from '~/const/blocking/baseCamp.const'
import AudioBtn from '~/webgl/Components/Shared/AudioBtn/AudioBtn'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class BigBox1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BigBox1953',
    isInstances = true,
  }) {
    super()
    // Get elements from Experience
    this.resources = this.experience.resources.items

    // New elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.isInstances = isInstances
    this.components = {
      audioBtnBox53: new AudioBtn({
        position: new Vector3(-4.647, 1, -35.246),
        source: this.resources.box_1953,
        name: this.name + '_audio',
      }),
    }
  }

  /**
   * Set Instances
   */
  setInstances() {
    const instance = this.resources.BCBigBox_1953.scene.clone().children[0]

    const dummy = new Object3D()
    this.item = new InstancedMesh(
      instance.geometry,
      instance.material,
      BCBIGBOX_1953.length
    )

    BCBIGBOX_1953.forEach((el, i) => {
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
    this.item = this.resources.BCBigBox_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Init
   */
  init() {
    this.isInstances && this.setInstances()
    !this.isInstances && this.setItem()
  }
}

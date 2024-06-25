import { InstancedMesh, Object3D, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { BCTENT_3_2050 } from '~/const/blocking/baseCamp.const'
import { UIAudioPlayer } from '#components'

export default class TentD2050 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'TentD2050',
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
    const instance = this.resources.BCTent_3_2050.scene.children[0]
    const dummy = new Object3D()
    this.item = new InstancedMesh(
      instance.geometry,
      instance.material,
      BCTENT_3_2050.length
    )

    BCTENT_3_2050.forEach((el, i) => {
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
    this.item = this.resources.BCTent_3_2050.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Init the tent
   */
  init() {
    this.isInstances && this.setInstances()
    !this.isInstances && this.setItem()

    this.addCSS2D({
      id: this.name + '_audio',
      template: UIAudioPlayer,
      data: {
        source: this.resources.tent_box_2050,
        id: this.name + '_audio',
        tempo: '2050',
      },
      parent: this.item,
      position: new Vector3(-10, 1, -35),
    })
  }
}

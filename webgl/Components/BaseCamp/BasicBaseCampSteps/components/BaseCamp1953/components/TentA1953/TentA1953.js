import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { MeshNormalMaterial, MeshStandardMaterial, Vector3 } from 'three'
import ModalBtn from '~/webgl/Components/Shared/ModalBtn/ModalBtn'

export default class TentA1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'TentA1953',
    modal,
  }) {
    super()
    this.debug = this.experience.debug

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.modal = modal

    // New elements
    this.resources = this.experience.resources.items

    this.components = {
      modal1953: new ModalBtn({
        position: this.position.clone().add(new Vector3(0, 1, 0)),
        data: {
          template: this.modal,
          title: 'TITLE_1953',
          values: {
            archives1953: this.resources.archives1953,
            return1953: this.resources.return1953,
          },
          date: '1953',
        },
        name: 'modal1953',
      }),
    }
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_1_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
    console.log(this.item)
    const texture1953 = this.resources.mainTent1953
    const texture2024 = this.resources.mainTent2024
    texture1953.flipY = false
    texture2024.flipY = false
    this.item.children[0].material = new MeshStandardMaterial({map:texture2024})
  }

  /**
   * Set sprite
   */
  setSprite() {
    const mat = this.item.children[0]
    const boundings = mat.geometry.boundingBox

    const position = new Vector3()
    mat.getWorldPosition(position)
    position.y = boundings.min.y + 1
    position.z += 3.3
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setSprite()
  }
}

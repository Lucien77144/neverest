import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'
import { UIAudioPlayer } from '#components'
import { MeshNormalMaterial, Vector3 } from 'three'
import ModalSprite from '../../Shared/ModalSprite/ModalSprite'

export default class BCTent_1_1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCTent_1_1953',
    visibility = [0, 100],
    modal,
  }) {
    super()
    this.debug = this.experience.debug

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility
    this.modal = modal

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_1_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    const params = {
      side: 2,
      color: '#FFD500',
      bgColor: '#F8ECE8',
      texture: this.resources.BCTent1_1953Texture,
    }
    this.item.children[0].material = new TextureCraieMaterial(params).instance

    if (this.debug) {
      this.debugFolder = this.debug.panel.addFolder({
        expanded: false,
        title: this.name,
      })
      this.debugFolder
        .addBinding(params, 'color', { view: 'color' })
        .on('change', () => {
          this.item.children[0].material = new TextureCraieMaterial(
            params
          ).instance
        })

      this.debugFolder
        .addBinding(params, 'bgColor', { view: 'color' })
        .on('change', () => {
          this.item.children[0].material = new TextureCraieMaterial(
            params
          ).instance
        })
    }
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
    // + (boundings.max.y - boundings.min.y)

    this.components.modalSprite1953 = new ModalSprite({
      visibility: this.visibility,
      position,
      data: {
        template: this.modal,
        values: {
          archives1953: this.resources.archives1953,
          return1953: this.resources.return1953,
        },
      },
    })
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setSprite()
    // this.setMaterial()
  }

  /**
   * On init complete
   */
  onInitComplete() {
    // this.addCSS2D({
    //   id: this.name + '_audio',
    //   template: UIAudioPlayer,
    //   data: {
    //     source: this.resources.tedTalk,
    //   },
    //   parent: this.item,
    //   position: new Vector3(0, 1, 0),
    // })
  }

  /**
   *
   */
  dispose() {
    super.dispose()
    // this.removeCSS2D(this.name + '_audio')
    this.item = null
  }
}

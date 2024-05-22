import { Modal } from '#components'
import { DoubleSide, Mesh, MeshNormalMaterial, PlaneGeometry, ShaderMaterial, Uniform, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import ModalSprite from '../../Shared/ModalSprite/ModalSprite'
import flagVert from './FlagShader/FlagShader.vert?raw'
import flagFrag from './FlagShader/FlagShader.frag?raw'

export default class BCFlag extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCFlag',
    visibility = [0, 100],
    modal,
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility
    this.modal = modal
    this.flag = null
    

    // New elements
    this.resources = this.experience.resources.items
    this.time = this.experience.time
  }

  /**
   * Set item
   */
  setBCFlag() {
    this.item = this.resources.BCFlag.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name

    this.item.children[0].material = new MeshNormalMaterial()
    this.item.children[0].material.side = DoubleSide
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
    position.x += 0.4
    position.z += 0.2
    // + (boundings.max.y - boundings.min.y)

    this.components.modalSprite = new ModalSprite({
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

  setFlag(){
    const flagGeometry = new PlaneGeometry(3,2,32,32)
    const flagMaterial = new ShaderMaterial({
      vertexShader:flagVert,
      fragmentShader:flagFrag,
      uniforms:{
        uTime:new Uniform(this.time.elapsed*0.001)
      }
    })
    this.flag = new Mesh(flagGeometry,flagMaterial)
    this.flag.position.x+=1.5
    this.flag.position.y+=6.8
    
    this.item.add(this.flag)
  }

  /**
   * Init
   */
  init() {
    this.setBCFlag()
    this.setSprite()
    this.setFlag()
  }

  update(){
    this.item.children[0].children[1].material.uniforms.uTime.value = this.time.elapsed * 0.001
  }
}

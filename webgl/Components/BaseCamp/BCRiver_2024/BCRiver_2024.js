import {

  RepeatWrapping,
  ShaderMaterial,
  Uniform,
} from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import vertexShader from '~/webgl/Components/Shared/RiverMaterial/RiverMaterial.vert?raw'
import fragmentShader from '~/webgl/Components/Shared/RiverMaterial/RiverMaterial.frag?raw'


export default class BCRiver_2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCRiver_2024',
    visibility = [0, 100],
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Get geometry
   */
  setItem() {
    this.item = this.resources.BCRiver_2024.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Get material
   */
  setMaterial() {
    const texture = this.resources.riverRepeat
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    this.item.children[0].material = new ShaderMaterial({
      uniforms:{
        uTime:new Uniform(0),
        uTexture:new Uniform(texture)
      },
      side:2,
      vertexShader,
      fragmentShader
    })
  }

  /**
   * Init
   */
  init() {
    this.setItem()
     
    this.setMaterial()
  }

  update(){
    this.item.children[0].material.uniforms.uTime.value += this.experience.time.delta * 0.001
  
  }
}

import { MeshBasicMaterial, MeshNormalMaterial, ShaderMaterial, Uniform, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import vertexShader from '~/webgl/Components/Shared/RiverMaterial/RiverMaterial.vert?raw'
import fragmentShader from '~/webgl/Components/Shared/RiverMaterial/RiverMaterial.frag?raw'

export default class River2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'River2024',
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name

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
    const riverTexture2024_1 = this.resources.river2024_1
    const riverTexture2024_2 = this.resources.river2024_2
    const riverTexture2024_3 = this.resources.river2024_3
    riverTexture2024_1.flipY = false
    riverTexture2024_2.flipY = false
    riverTexture2024_3.flipY = false
    
    this.item.children[0].material = new ShaderMaterial({
      uniforms:{
        uFTexture:new Uniform(riverTexture2024_1),
        uSTexture:new Uniform(riverTexture2024_2),
        uTTexture:new Uniform(riverTexture2024_3),
        uTime:new Uniform(0)
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
  }

  update(){
    this.item.children[0].material.uniforms.uTime.value = this.experience.time.elapsed * 0.0005
  }
}

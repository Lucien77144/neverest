import {
  DoubleSide,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Uniform,
  Vector3,
} from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import vertexShader from './shaders/vertexShader.vert?raw'
import fragmentShader from './shaders/fragmentShader.frag?raw'

export default class TentC1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'TentC1953',
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name

    // New elements
    this.resources = this.experience.resources.items
    this.time = this.experience.time
    this.flag = null
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_3_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set flag
   */
  setFlag() {
    const geometry = new PlaneGeometry(3, 1.5, 32, 32)
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: DoubleSide,
      uniforms: {
        uTime: new Uniform(this.time.elapsed * 0.001),
        uTexture: new Uniform(this.resources.flagTexture),
      },
    })
    this.flag = new Mesh(geometry, material)

    this.flag.scale.set(0.3, 0.3, 0.3)

    this.flag.position.x -= 2.2
    this.flag.position.y += 3.2
    this.flag.position.z -= 1.25

    this.flag.rotation.y = -Math.PI / 2
    this.flag.rotation.x = -Math.PI / 20
    this.flag.rotation.z = Math.PI / 20

    this.item.add(this.flag)
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setFlag()
  }

  /**
   * Update
   */
  update() {
    this.item.children[1].material.uniforms.uTime.value =
      this.time.elapsed * 0.001
  }
}

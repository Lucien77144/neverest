import { Mesh, PlaneGeometry, ShaderMaterial, Uniform, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import fragmentShader from './shaders/fragmentShader.frag?raw'
import vertexShader from './shaders/vertexShader.vert?raw'
import AudioBtn from '~/webgl/Components/Shared/AudioBtn/AudioBtn'

export default class Flag1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'Flag1953',
  }) {
    super()
    // Get elements from Experience
    this.resources = this.experience.resources.items
    this.time = this.experience.time

    // New elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.flag = null
    this.components = {
      audioBtnFlag53: new AudioBtn({
        position: this.position.clone().add(new Vector3(0, 1, 0)),
        source: this.resources.flag_1953,
        name: this.name + '_audio',
      }),
    }
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.ENFlag.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  $
  /**
   * Set flag
   */
  setFlag() {
    const geometry = new PlaneGeometry(3, 2, 32, 32)

    const material = new ShaderMaterial({
      uniforms: {
        uTime: new Uniform(this.time.elapsed * 0.001),
        uTexture: new Uniform(this.resources.flagTexture),
      },
      vertexShader,
      fragmentShader,
    })

    this.flag = new Mesh(geometry, material)
    this.flag.position.x += 1.5
    this.flag.position.y += 5.4

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
    this.item.children[0].children[1].material.uniforms.uTime.value =
      this.time.elapsed * 0.001
  }
}

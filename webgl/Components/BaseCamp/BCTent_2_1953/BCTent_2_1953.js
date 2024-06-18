import { Object3D, ShaderMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import vertexShader from './shaders/vertexShader.vert?raw'
import fragmentShader from './shaders/fragmentShader.frag?raw'
import { BCTENT_2_1953 } from '~/const/blocking/baseCamp.const'
import { InstancedUniformsMesh } from 'three-instanced-uniforms-mesh'

export default class BCTent_2_1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCTent_2_1953',
    visibility = [0, 100],
    isInstances = true,
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility
    this.isInstances = isInstances
    this.frag = null
    this.vert = null

    // New elements
    this.resources = this.experience.resources.items
    this.time = this.experience.time
  }

  /**
   * Set Instances
   */
  setInstances() {
    const dummy = new Object3D()

    const instance = this.resources.BCTent_2_1953.scene.children[0].clone()
    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 1.0 },
        uTexture: { value: instance.material.map },
        uIndex: { value: 0 },
        uRandom: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })

    this.item = new InstancedUniformsMesh(
      instance.geometry,
      material,
      BCTENT_2_1953.length
    )

    BCTENT_2_1953.forEach((el, i) => {
      dummy.position.set(el.position.x, el.position.y, el.position.z)
      dummy.rotation.set(el.rotation.x, el.rotation.y, el.rotation.z)
      dummy.updateMatrix()

      this.item.setMatrixAt(i, dummy.matrix)
      this.item.setUniformAt('uIndex', i, i)
    })

    this.item.instanceMatrix.needsUpdate = true
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_2_1953.scene.clone()
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

  /**
   * Update
   */
  update() {
    this.item.material.uniforms.uTime.value = this.time.elapsed * 0.001
  }
}

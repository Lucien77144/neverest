import { Object3D, ShaderMaterial, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { BCTENT_2_2050 } from '~/const/blocking/baseCamp.const'
import { InstancedUniformsMesh } from 'three-instanced-uniforms-mesh'
import vertexShader from '~/webgl/Components/Shared/WindyTenteShader/WindyTenteShader.vert?raw'
import fragmentShader from '~/webgl/Components/Shared/WindyTenteShader/WindyTenteShader.frag?raw'
import Experience from '~/webgl/Experience'
import AudioBtn from '~/webgl/Components/Shared/AudioBtn/AudioBtn'

export default class TentC2050 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'TentC2050',
    isInstances = true,
  }) {
    super()

    this.experience = new Experience()

    // Get elements from Experience
    this.resources = this.experience.resources.items
    this.time = this.experience.time

    // New elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.isInstances = isInstances
    this.components = {
      audioBtnTentC50: new AudioBtn({
        position: new Vector3(0, 1, -8),
        source: this.resources.tent_green_2050,
        name: this.name + '_audio',
      }),
    }
  }

  /**
   * Set Instances
   */
  setInstances() {
    const textureTenteC2050 = this.resources.VentTente3_2050
    const instance = this.resources.BCTent_2_2050.scene.children[0]
    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 1.0 },
        uTexture: { value: instance.material.map },
        uVentTexture: { value: textureTenteC2050 },
        uRot: { value: 0.0 },
        uDec: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })
    const dummy = new Object3D()
    this.item = new InstancedUniformsMesh(
      instance.geometry,
      material,
      BCTENT_2_2050.length
    )

    BCTENT_2_2050.forEach((el, i) => {
      dummy.position.set(el.position.x, el.position.y, el.position.z)
      dummy.rotation.set(el.rotation.x, el.rotation.y, el.rotation.z)
      dummy.updateMatrix()
      this.item.setMatrixAt(i, dummy.matrix)
      this.item.setUniformAt('uRot', i, el.rotation.y)
    })

    this.item.instanceMatrix.needsUpdate = true
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_2_2050.scene.clone()
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
  }

  update() {
    this.item.children[0].material.uniforms.uTime.value =
      this.time.elapsed * 0.001
  }
}

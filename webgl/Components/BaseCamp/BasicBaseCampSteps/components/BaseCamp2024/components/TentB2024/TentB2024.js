import { InstancedMesh, Object3D, ShaderMaterial, Vector3 } from 'three'
import { BCTENT_2_2024 } from '~/const/blocking/baseCamp.const'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { InstancedUniformsMesh } from 'three-instanced-uniforms-mesh'

import vertexShader from '~/webgl/Components/Shared/WindyTenteShader/WindyTenteShader.vert?raw'
import fragmentShader from '~/webgl/Components/Shared/WindyTenteShader/WindyTenteShader.frag?raw'
import Experience from '~/webgl/Experience'

export default class TentB2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'TentB2024',
    isInstances = true,
  }) {
    super()

    this.experience = new Experience()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.isInstances = isInstances

    // New elements
    this.resources = this.experience.resources.items

    this.time = this.experience.time
  }

  /**
   * Set Instances
   */
  setInstances() {

    const textureTenteB2024 = this.resources.VentTente2_2024

    

    const instance = this.resources.BCTent_2_2024.scene.children[0]

    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 1.0 },
        uTexture: { value: instance.material.map },
        uVentTexture: { value: textureTenteB2024 },
        uRot: { value: 0.0 },
        uDec:{ value: 0 }
      },
      vertexShader,
      fragmentShader,
    })

    const dummy = new Object3D()
    this.item = new InstancedUniformsMesh(
      instance.geometry,
      material,
      BCTENT_2_2024.length
    )

    BCTENT_2_2024.forEach((el, i) => {
      dummy.position.set(el.position.x, el.position.y, el.position.z)
      dummy.rotation.set(el.rotation.x, el.rotation.y, el.rotation.z)
      dummy.updateMatrix()
      this.item.setMatrixAt(i, dummy.matrix)
      this.item.setUniformAt('uRot', i, el.rotation.y)
      this.item.setUniformAt('uDec', i, Math.round(Math.random()*100)*0.01)
    })

    this.item.instanceMatrix.needsUpdate = true
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_2_2024.scene.clone()
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

  update(){
    this.item.material.uniforms.uTime.value = this.time.elapsed * 0.001
  }
}

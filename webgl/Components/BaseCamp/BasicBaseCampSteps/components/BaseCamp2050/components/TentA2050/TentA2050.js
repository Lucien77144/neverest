import { MeshStandardMaterial, Vector3 } from 'three'
import ModalBtn from '~/webgl/Components/Shared/ModalBtn/ModalBtn'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class TentA2050 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'TentA2050',
    modal,
  }) {
    super()
    // Get elements from Experience
    this.resources = this.experience.resources.items

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.modal = modal
    this.components = {
      modal2050: new ModalBtn({
        position: this.position.clone().add(new Vector3(0, 1, 0)),
        data: {
          title: 'TITLE_2050',
          template: this.modal,
          date: '2050',
        },
        name: 'modal2050',
      }),
    }
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_Main_2050.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
    
    const textureVent = this.resources.VentTente1_1953
    const texture2050 = this.resources.mainTent2050
    const texture2024 = this.resources.mainTent2024
    textureVent.flipY = false
    texture2050.flipY = false
    texture2024.flipY = false
    const material = new MeshStandardMaterial({side:2})
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uProgress = { value: 0 };
      shader.uniforms.uTime = { value:0 }
      shader.uniforms.uVentTexture = { value: textureVent }
      shader.uniforms.uFTexture = { value: texture2024 }
      shader.uniforms.uSTexture = { value: texture2050 }
      shader.vertexShader = `
      varying vec2 vUv;

      uniform float uTime;
      uniform sampler2D uVentTexture;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) +
          (c - a) * u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
      }
      ${shader.vertexShader}
    `.replace(
      `#include <begin_vertex>`,
      `
      #include <begin_vertex>
      float ventTexture = texture2D(uVentTexture, uv).r;
      vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
      vec3 nrml = normalize(modelNormal.xyz);
      vec3 windDirection = normalize(vec3(1.0,-0.7,0.0));
      float dotProduct = dot(nrml,windDirection);
      dotProduct=-dotProduct;
      dotProduct = pow(dotProduct,3.0);
      transformed.x += dotProduct*noise(uv+uTime*0.5)*0.5*ventTexture;
      transformed.x += pow(min(1.0,position.y*0.3),2.0) * noise(vec2(uTime*0.5)) * 0.2;
      vUv = uv;
      `
    );

        shader.fragmentShader = `
          uniform float uProgress;
          uniform sampler2D uFTexture;
          uniform sampler2D uSTexture;
          varying vec2 vUv;
          ${shader.fragmentShader}
        `.replace(
          `vec4 diffuseColor = vec4( diffuse, opacity );`,
          `
            vec3 firstTexture = texture2D(uFTexture, vUv).rgb;
            firstTexture.r*=0.7;
            firstTexture.gb*=0.4;
            vec3 secondTexture = texture2D(uSTexture, vUv).rgb;
            secondTexture.gb*=0.4;
            secondTexture.r*=0.5;
            vec3 currentMix = mix(firstTexture,secondTexture,uProgress);
            vec4 diffuseColor = vec4(currentMix,1.0);
          `
        )
        
        
        material.userData.shader = shader;
    }
    this.item.children[0].material = material
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
    position.z += 3.3
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setSprite()
  }

  update(){
    this.item.children[0].children[0].material.userData.shader.uniforms.uProgress.value = Math.max(Math.min((this.experience.scrollManager.current - 73) * 0.2,1),0)
    this.item.children[0].children[0].material.userData.shader.uniforms.uTime.value = this.experience.time.elapsed * 0.001
  }
}

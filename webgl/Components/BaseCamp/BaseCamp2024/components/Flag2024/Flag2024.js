import { UIAudioPlayer } from '#components'
import { ShaderMaterial, Uniform, Vector3 } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'


export default class Flag2024 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'Flag2024',
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name

    // New elements
    this.resources = this.experience.resources.items
    this.time = this.experience.time
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.Flag_2024.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
    const texture = this.resources.flag2024Displacement
    texture.flipY = false

    this.item.children[0].material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = new Uniform(0)
      shader.uniforms.uDisplacementMap = new Uniform(texture)

      shader.vertexShader = `
          uniform float uTime;
          uniform sampler2D uDisplacementMap;

          float random (in vec2 st) {
          return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
          }


          float noise (in vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);

            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));

            vec2 u = f*f*(3.0-2.0*f);

            return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
          }
          ${shader.vertexShader}
        `.replace(
          `#include <begin_vertex>`,
          `
          #include <begin_vertex>
          float noiseUv = noise(uv - uTime) - 0.5;
          transformed.z += texture2D(uDisplacementMap, uv).r * noiseUv;
          `
        );
        this.item.children[0].material.userData.shader = shader;
    }

  }

  /**
   * Init
   */
  init() {
    this.setItem()

    this.addCSS2D({
      id: this.name + '_audio',
      template: UIAudioPlayer,
      data: {
        source: this.resources.drapeau_priere_2024,
        id: this.name + '_audio',
        tempo: '2024',
      },
      parent: this.item,
      position: new Vector3(0, 0.2, 0),
    })
  }

  update(){
    this.item.children[0].material.userData.shader.uniforms.uTime.value = this.time.elapsed * 0.001
  }
}

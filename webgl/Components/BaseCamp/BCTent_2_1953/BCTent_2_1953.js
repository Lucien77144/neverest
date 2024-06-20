import { InstancedMesh, Object3D, ShaderMaterial } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import { BCTENT_2_1953 } from '~/const/blocking/baseCamp.const'
import { InstancedUniformsMesh } from 'three-instanced-uniforms-mesh'

import vertexShader from './shaders/vertexShader.vert?raw'
import fragmentShader from './shaders/fragmentShader.frag?raw'

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

    // New elements
    this.resources = this.experience.resources.items
    this.time = this.experience.time
  }

  /**
   * Set Instances
   */
  setInstances() {
    const dummy = new Object3D()

    // Vertex Shader
    this.vert = `
    varying vec2 vUv;
    varying vec3 vNormal; 
    uniform float uRot;
    uniform float uTime;
    uniform sampler2D uVentTexture;

    mat3 rotationY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        c, 0.0, s,
        0.0, 1.0, 0.0,
        -s, 0.0, c
    );
    }
    
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
  

    void main() {
      vUv = uv;
      float ventTexture = texture2D(uVentTexture, uv).r;
      vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
      vec3 nrml = normalize(modelNormal.xyz);
      vec3 windDirection = normalize(vec3(1.0,0.0,0.0));
      windDirection = rotationY(uRot) * windDirection;
      float dotProduct = dot(nrml,windDirection);
      dotProduct=-dotProduct;
      dotProduct = pow(dotProduct,3.0);
      vec4 modelPosition =  instanceMatrix * vec4(position, 1.0);
      modelPosition.x+=dotProduct*noise(uv+uTime*0.5)*0.5*ventTexture;
      gl_Position = projectionMatrix * modelViewMatrix * modelPosition;
    }
    `

    // Fragment Shader
    this.frag = `
    uniform sampler2D uTexture;
    varying vec2 vUv;


    void main() {
      vec2 uv = vUv;
      vec4 color = texture2D(uTexture, uv);
      gl_FragColor = color;
    }
    `;
    
    const instance = this.resources.BCTent_2_1953.scene.children[0].clone()
    const testVenttexture = this.resources.testVent
    testVenttexture.flipY = false
    //console.log(instance.geometry)
    instance.geometry.computeVertexNormals()
    const material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 1.0 },
        uTexture: { value: instance.material.map },
        uVentTexture:{value:testVenttexture},
        uRot:{value:0.0}
      },
      vertexShader:this.vert,
      fragmentShader:this.frag,
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
      this.item.setUniformAt('uRot', i, el.rotation.y)
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

  update() {
    this.item.material.uniforms.uTime.value = this.time.elapsed * 0.001
  }
}

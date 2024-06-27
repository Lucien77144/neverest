import { AmbientLight, Mesh, MeshStandardMaterial, PlaneGeometry, PointLight, ShaderMaterial, Uniform } from "three"
import Experience from "~/webgl/Experience"
import BasicItem from "~/webgl/Modules/Basics/BasicItem"
import flagVert from './FlagShader/FlagShader.vert?raw'
import flagFrag from './FlagShader/FlagShader.frag?raw'

export default class IntroFlag extends BasicItem {
    /**
     * Constructor
     */
    constructor() {
      super()

      this.experience = new Experience()
  
      
      this.flag = null
  
      // New elements
      this.resources = this.experience.resources.items
      this.time = this.experience.time
    }
  
    /**
     * Set item
     */
    setIntroFlag() {
        
      this.item = this.resources.ENFlag.scene.clone()
      
      //this.item.scale.set(0.2,0.2,0.2)
      this.item.children[0].position.set(0.3,-5.4,3)
      //this.item.position.z+=3
      //this.item.position.y += 4
      
      this.item.position.set(0,0,1)
      //this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
      //this.item.name = 'IntroFlag'
    }
  
    /**
     * Set sprite
     */
    
  
    setFlag() {
      const flagGeometry = new PlaneGeometry(1.5, 1, 64, 64)
      flagGeometry.computeVertexNormals()
      //const flagMaterial = new ShaderMaterial({
      //  vertexShader: flagVert,
      //  fragmentShader: flagFrag,
      //  uniforms: {
      //    uTime: new Uniform(this.time.elapsed * 0.001),
      //    uTexture: new Uniform(this.resources.flagTexture),
      //  },
      //})

      const flagMaterial = new MeshStandardMaterial({map:this.resources.flagTextureIntro,transparent:true})
      flagMaterial.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = { value: 0 }; // Ajout de l'uniforme uTime
        shader.vertexShader = `
          uniform float uTime;
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
          transformed.z += noise(uv * 4.0 - uTime) * uv.x;
          `
        );
        
        // Stockage de la référence du shader
        flagMaterial.userData.shader = shader;
      };
      this.flag = new Mesh(flagGeometry, flagMaterial)
      this.flag.position.set(1.8,0,3)
      this.flag.scale.set(1.8,1.8,1.8)
      const light = new AmbientLight(0xFFFFFF,4)
      this.item.add(light)
  
      this.item.add(this.flag)
    }
  
    /**
     * Init
     */
    init() {
      this.setIntroFlag()
      this.setFlag()
  

    }
  
    update() {
      this.item.children[2].material.userData.shader.uniforms.uTime.value = this.time.elapsed * 0.001
  
    }
  }
import { Mesh, PlaneGeometry, ShaderMaterial, Uniform } from "three"
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
        
      this.item = this.resources.BCFlag.scene.clone()
      this.item.scale.set(0.2,0.2,0.2)
      this.item.children[0].rotation.set(0,Math.PI,0)
      this.item.position.z+=3
      this.item.position.y -= 1.1
      //this.item.position.set(0,0,1)
      //this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
      //this.item.name = 'IntroFlag'
    }
  
    /**
     * Set sprite
     */
    
  
    setFlag() {
      const flagGeometry = new PlaneGeometry(0.9, 0.6, 32, 32)
      const flagMaterial = new ShaderMaterial({
        vertexShader: flagVert,
        fragmentShader: flagFrag,
        uniforms: {
          uTime: new Uniform(this.time.elapsed * 0.001),
          uTexture: new Uniform(this.resources.flagTexture),
        },
      })
      this.flag = new Mesh(flagGeometry, flagMaterial)
      this.flag.position.x += 0.5
      this.flag.position.y += 6
  
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
      this.item.children[1].material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
  }
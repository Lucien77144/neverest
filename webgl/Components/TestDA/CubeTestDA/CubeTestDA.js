import { BoxGeometry, Color, Mesh, PlaneGeometry, ShaderMaterial, SphereGeometry, Uniform } from 'three'
import Experience from '~/webgl/Experience'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import ShaderTestDAVert from '../PlaneTestDA/ShaderTestDA/ShaderTestDAVert.vert?raw'
import ShaderTestDAFrag from '../PlaneTestDA/ShaderTestDA/ShaderTestDAFrag.frag?raw'

export default class CubeTestDA extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()
    // Get elements from experience
    this.experience = new Experience()
    this.resources = this.experience.resources.items

    this.$bus = this.experience.$bus

    // New elements
    this.geometry = null
    this.material = null
  }

  setGeometry(){
    this.geometry = new SphereGeometry(2,64,64)
  }


  setMaterial() {
    this.material = new ShaderMaterial(
        {
            side:0, 
            vertexShader:ShaderTestDAVert,
            fragmentShader:ShaderTestDAFrag,
            uniforms:{
                uTexture:new Uniform(this.resources.testDA4),
                uColor:new Uniform(new Color(0x636717)),
                uMaskThickness: new Uniform(0.1)
            },
            transparent:true
        }
    )
  }


  setItem() {
    this.item = new Mesh(this.geometry,this.material)
    this.item.position.x = 3
  }

  init() {
    this.setGeometry()
    this.setMaterial()
    this.setItem()
  }
}
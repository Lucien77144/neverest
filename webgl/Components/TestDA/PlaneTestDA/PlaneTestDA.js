
import { CanvasTexture, Color, Mesh, MeshBasicMaterial, PlaneGeometry, ShaderMaterial, Uniform } from 'three'
import Experience from '~/webgl/Experience'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import ShaderTestDAVert from './ShaderTestDA/ShaderTestDAVert.vert?raw'
import ShaderTestDAFrag from './ShaderTestDA/ShaderTestDAFrag.frag?raw'

export default class PlaneTestDA extends BasicItem {
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

  createTexture(){
    const canvas = document.createElement('canvas')
    canvas.style.width = "100px"
    canvas.style.height = "100px"
    const ctx = canvas.getContext("2d")
    ctx.beginPath()
    ctx.moveTo(1000, 0)
    ctx.lineTo(0, 0)
    ctx.lineWidth = 10
    ctx.strokeStyle = "red"
    ctx.stroke()

    this.canvasTexture = new CanvasTexture(canvas)
    console.log(this.canvasTexture)
  }

  setGeometry(){
    this.geometry = new PlaneGeometry(5,5,256,256)
  }


  setMaterial() {
    this.material = new ShaderMaterial(
        {
            side:2, 
            vertexShader:ShaderTestDAVert,
            fragmentShader:ShaderTestDAFrag,
            uniforms:{
                uTexture:new Uniform(this.canvasTexture),
                uColor:new Uniform(new Color(0x9cf6ec))
            },
            transparent:true
        }
    )
  }


  setItem() {
    this.item = new Mesh(this.geometry,this.material)
    this.item.position.x = 4
  }

  init() {
    this.createTexture()
    this.setGeometry()
    this.setMaterial()
    this.setItem()
  }
}
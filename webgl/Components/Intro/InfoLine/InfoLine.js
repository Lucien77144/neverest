import {
  BufferGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshNormalMaterial,
  Object3D,
  RawShaderMaterial,
  ShaderMaterial,
  Uniform,
  Vector3,
} from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import InfoLineVert from './InfoLineShader/InfoLineShader.vert?raw'
import InfoLineFrag from './InfoLineShader/InfoLineShader.frag?raw'
import Experience from '~/webgl/Experience'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import gsap from 'gsap'

export default class InfoLine extends BasicItem {
  constructor(points, inputText) {
    super()

    // New elements

    this.rootObj = null
    this.lineGeometry = null
    this.lineMaterial = null
    this.line = null
    this.textGeometry = null
    this.textMaterial = null
    this.text = null
    this.points = points
    this.inputText = inputText
    this.isVisible = Math.sin(this.points[0].z) > 0

    // Init
    this.init()
  }

  setRootGeometry(){
    this.rootObj = new Object3D()
    this.rootObj.position.set(this.points[0].x,this.points[0].y,this.points[0].z)
  }

  setLineGeometry() {
    this.lineGeometry = new BufferGeometry().setFromPoints(this.points)
  }

  setLineMaterial() {
    this.lineMaterial = new RawShaderMaterial({
      vertexShader: InfoLineVert,
      fragmentShader: InfoLineFrag,
      uniforms: {
        uLineHeight: new Uniform(
          this.points[this.points.length - 1].y - this.points[0].y
        ),
        uLowestpoint: new Uniform(this.points[0].y),
        uHighestPoint: new Uniform(this.points[this.points.length - 1].y),
        uProgress: new Uniform(this.isVisible ? 1: 0),
      },
      transparent: true,
    })
  }

  setLine() {
    this.line = new Line(this.lineGeometry, this.lineMaterial)
  }

  setTextGeometry() {
    this.textGeometry = new TextGeometry(this.inputText,{
      font: this.experience.resources.items.roboto,
      size: 1,
      depth: 1,
      curveSegments: 1,
    })


  }

  setTextMaterial() {

  }

  setText() {
    this.text = new Mesh(this.textGeometry,new MeshNormalMaterial())
  }

  setGroup() {
    this.item = new Group()
    this.item.add(this.rootObj)
    this.item.add(this.line)
    //this.item.add(this.text)
  }

  changeVisibility(visibility){
    this.isVisible = visibility 
    gsap.to(this.lineMaterial.uniforms.uProgress, {
      value:visibility ? 1 : 0,
      duration:0.6
    })
  }

  init() {
    this.setRootGeometry()
    this.setLineGeometry()
    this.setLineMaterial()
    this.setLine()
    this.setTextGeometry()
    this.setTextMaterial()
    this.setText()
    this.setGroup()
  }

  update() {
    

    const rootObjPosition = new Vector3()
    this.rootObj.getWorldPosition(rootObjPosition)

    
    if(this.isVisible && Math.sin(rootObjPosition.normalize().z) < 0){
      this.changeVisibility(false)
    }
    if(!this.isVisible && Math.sin(rootObjPosition.normalize().z) > 0){
      this.changeVisibility(true)
    }
    

     
    
  }
}

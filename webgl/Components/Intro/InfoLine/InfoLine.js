import {
  BufferGeometry,
  Group,
  Line,
  Object3D,
  ShaderMaterial,
  Uniform,
  Vector3,
} from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import InfoLineVert from './InfoLineShader/InfoLineShader.vert?raw'
import InfoLineFrag from './InfoLineShader/InfoLineShader.frag?raw'
import gsap from 'gsap'

export default class InfoLine extends BasicItem {
  constructor(points, position, inputText, textposition, labelId) {
    super()

    // New elements

    this.rootObj = null
    this.lineGeometry = null
    this.lineMaterial = null
    this.line = null
    this.textGeometry = null
    this.textMaterial = null
    this.text = null
    this.textRef = null
    this.textposition = textposition
    this.points = points
    this.position = position
    this.inputText = inputText
    this.isVisible = Math.sin(this.points[0].z) > 0
    this.labelId = labelId
  }

  setRootGeometry() {
    this.rootObj = new Object3D()
  }

  setLineGeometry() {
    this.lineGeometry = new BufferGeometry().setFromPoints(this.points)
  }

  setLineMaterial() {
    this.lineMaterial = new ShaderMaterial({
      vertexShader: InfoLineVert,
      fragmentShader: InfoLineFrag,
      uniforms: {
        uLineHeight: new Uniform(
          this.points[this.points.length - 1].y - this.points[0].y
        ),
        uLowestpoint: new Uniform(this.points[0].y),
        uHighestPoint: new Uniform(this.points[this.points.length - 1].y),
        uProgress: new Uniform(this.isVisible ? 1 : 0),
      },
      transparent: true,
    })
  }

  setLine() {
    this.line = new Line(this.lineGeometry, this.lineMaterial)
  }

  setTextRef() {
    this.textRef = new Object3D()
    this.textRef.position.set(
      this.textposition.x,
      this.textposition.y,
      this.textposition.z
    )
  }

  setGroup() {
    this.item = new Group()
    this.item.layers.enableAll()
    this.item.position.set(this.position.x, this.position.y, this.position.z)
    this.item.add(this.rootObj)
    this.item.add(this.line)
    this.item.add(this.textRef)
  }

  changeVisibility(visibility) {
    this.isVisible = visibility
    gsap.to(this.lineMaterial.uniforms.uProgress, {
      value: visibility ? 1 : 0,
      duration: 0.6,
      onStart:()=>{
        if(!visibility)document.getElementById(this.labelId)?.style.setProperty('opacity', 0)
      },
      onComplete:()=>{
        if(visibility)document.getElementById(this.labelId)?.style.setProperty('opacity', 1)
      }
    })
  }

  init() {
    this.setRootGeometry()
    this.setLineGeometry()
    this.setLineMaterial()
    this.setLine()
    this.setTextRef()
    this.setGroup()
  }

  update() {
    if (!this.rootObj) return
    if(!document.getElementById("labelRendererDiv")) return

    const rootObjPosition = new Vector3()
    this.rootObj.getWorldPosition(rootObjPosition)

    if (this.isVisible && Math.sin(rootObjPosition.normalize().z) < 0.2) {
      this.changeVisibility(false)
    }
    if (!this.isVisible && Math.sin(rootObjPosition.normalize().z) > 0.2) {
      this.changeVisibility(true)
    }

    if (this.isVisible) {
      if (rootObjPosition.normalize().x <= 0.2) {
        this.item.rotation.y = -Math.asin(rootObjPosition.normalize().z)
      } else if (rootObjPosition.normalize().x > 0.2) {
        this.item.rotation.y = 2 * Math.PI + Math.asin(rootObjPosition.normalize().z)
      }
    }
  }
}

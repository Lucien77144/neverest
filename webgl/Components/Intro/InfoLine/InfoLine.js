import {
  BufferGeometry,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshNormalMaterial,
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

export default class InfoLine extends BasicItem {
  constructor(points, inputText) {
    super()

    // New elements

    this.lineGeometry = null
    this.lineMaterial = null
    this.line = null
    this.textGeometry = null
    this.textMaterial = null
    this.text = null
    this.points = points
    this.inputText = inputText

    // Init
    this.init()
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
        uProgress: new Uniform(0.9),
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
      depth: 10,
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
    this.item.add(this.line)
    //this.item.add(this.text)
  }

  init() {
    this.setLineGeometry()
    this.setLineMaterial()
    this.setLine()
    this.setTextGeometry()
    this.setTextMaterial()
    this.setText()
    this.setGroup()
  }

  update() {
    this.lineMaterial.uniforms.uProgress.value =
      Math.sin(this.experience.time.current * 0.002) * 0.5 + 0.5
  }
}

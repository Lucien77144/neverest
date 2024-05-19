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
import vertexShader from './shaders/vertexShader.vert?raw'
import fragmentShader from './shaders/fragmentShader.frag?raw'
import gsap from 'gsap'
import { UIIntroData } from '#components'

export default class InfoLine extends BasicItem {
  constructor(points, position, cssItem) {
    super()

    // New elements
    this.rootObj = null
    this.lineGeometry = null
    this.lineMaterial = null
    this.line = null
    this.textGeometry = null
    this.textMaterial = null
    this.text = null
    this.position = position
    this.points = points
    this.cssItem = cssItem
    this.isVisible = Math.sin(this.points[0].z) > 0
  }

  /**
   * Set root geometry
   */
  setRootGeometry() {
    this.rootObj = new Object3D()
  }

  /**
   * Set line geometry
   */
  setLineGeometry() {
    this.lineGeometry = new BufferGeometry().setFromPoints(this.points)
  }

  /**
   * Set line material
   */
  setLineMaterial() {
    this.lineMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader,
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

  /**
   * Set line
   */
  setLine() {
    this.line = new Line(this.lineGeometry, this.lineMaterial)
  }

  /**
   * Set group
   */
  setGroup() {
    this.item = new Group()
    this.item.layers.enableAll()
    this.item.position.set(this.position.x, this.position.y, this.position.z)
    this.item.add(this.rootObj)
    this.item.add(this.line)
  }

  /**
   * Change visibility
   * @param {boolean} visibility Visibility
   */
  changeVisibility(visibility) {
    this.isVisible = visibility
    gsap.to(this.lineMaterial.uniforms.uProgress, {
      value: visibility ? 1 : 0,
      duration: 0.6,
      onStart: () => {
        !visibility &&
          document
            .querySelector(`#${this.cssItem.id} > .introData`)
            ?.style.setProperty('opacity', 0)
      },
      onComplete: () => {
        visibility &&
          document
            .querySelector(`#${this.cssItem.id} > .introData`)
            ?.style.setProperty('opacity', 1)
      },
    })
  }

  /**
   * Set the 2D Renderer value
   */
  set2DText() {
    this.addCSS2D({
      id: this.cssItem.id,
      template: UIIntroData,
      parent: this.item,
      position: this.cssItem.position,
      data: this.cssItem.data,
    })
  }

  /**
   * Init
   */
  init() {
    this.setRootGeometry()
    this.setLineGeometry()
    this.setLineMaterial()
    this.setLine()
    this.setGroup()
    this.set2DText()
  }

  /**
   * Update
   */
  update() {
    if (!this.rootObj) return

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
        this.item.rotation.y =
          2 * Math.PI + Math.asin(rootObjPosition.normalize().z)
      }
    }
  }
}

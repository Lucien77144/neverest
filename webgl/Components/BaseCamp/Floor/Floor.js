import {
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'

export default class Floor extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.resources = this.experience.resources
    this.geometry = null
    this.material = null
  }

  /**
   * Get geometry
   */
  setGeometry() {
    this.geometry = new PlaneGeometry(300, 400, 256, 256)
  }

  /**
   * Get material
   */
  setMaterial() {
    this.material = new MeshStandardMaterial({ color: 0x99c1ff })
    this.material.displacementMap = this.resources.items.ground1953
    this.material.displacementScale = 10

    /*
    new CraieMaterial({
      textureParams:{
        textureSize:2048,
        nbOfColumns:1,
        borderSize:0.05,
        columnsOffset:0,
        nbOfCurvePerColumns:50,
        areCurveOnSameDirection:true,
        curveDirection:'up',
        curveDirectionAmountFactor:0.4,
        maxCurveHorizontalDecalage:0.3,
        maxHeightCurve:1,
        maxThicknessCurve:1,
        nbOfPointsPerCurve:2
      },
      side:0,
      color:'#93AAF2',
      bgColor:'#F8ECE8'
    }).instance
    */
  }

  /**
   * Get mesh
   */
  setMesh() {
    this.item = new Mesh(this.geometry, this.material)
    this.item.position.z = -100
    this.item.position.y = -2.8
    this.item.rotation.x = -Math.PI / 2
  }

  /**
   * Init the floor
   */
  init() {
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }
}

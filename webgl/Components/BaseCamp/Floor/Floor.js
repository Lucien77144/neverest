import {
  Mesh,
  MeshNormalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
} from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'

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
    this.geometry = new PlaneGeometry(60, 60, 512, 512)
  }

  /**
   * Get material
   */
  setMaterial() {
    this.material = new MeshNormalMaterial({})
    this.material.displacementMap = this.resources.items.ground1953
    this.material.displacementScale = 10

    //this.material = new CraieMaterial({
    //  textureParams:{
    //    textureSize:2048,
    //    nbOfColumns:7,
    //    borderSize:0.05,
    //    columnsOffset:-0.01,
    //    nbOfCurvePerColumns:15,
    //    areCurveOnSameDirection:true,
    //    curveDirection:'up',
    //    curveDirectionAmountFactor:0.4,
    //    maxCurveHorizontalDecalage:0.3,
    //    maxHeightCurve:1,
    //    maxThicknessCurve:3,
    //    nbOfPointsPerCurve:10,
    //    maxBorderSideDecalage:0.5
    //  },
    //  side:0,
    //  color:'#93AAF2',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.items.ground2024,
    //  isMapEnable:1,
    //  displacementMapIntensity:2,
    //}).instance
    
  }

  

  /**
   * Get mesh
   */
  setMesh() {
    this.item = new Mesh(this.geometry, this.material)
    this.item.position.z = -25
    this.item.position.y = -3
    this.item.rotation.x = -Math.PI / 2
  }

  /**
   * Init
   */
  init() {
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }
}

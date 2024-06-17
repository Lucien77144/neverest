import {
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
} from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'

export default class Floor extends BasicItem {
  /**
   * Constructor
   */
  constructor() {
    super()

    // New elements
    this.resources = this.experience.resources.items
    this.geometry = null
    this.material = null
  }

  /**
   * Get geometry
   */
  setGeometry() {
    this.geometry = new PlaneGeometry(100, 100, 512, 512)
  }

  /**
   * Get material
   */
  setMaterial() {
    //this.material = new MeshNormalMaterial({})
    //this.material.displacementMap = this.resources.items.ground1953
    //this.material.displacementScale = 10
//
    //this.material = new CraieMaterial({
    //  textureParams:{
    //    textureSize:1024,
    //    nbOfColumns:3,
    //    borderSize:0.1,
    //    columnsOffset:0.04,
    //    nbOfCurvePerColumns:4,
    //    areCurveOnSameDirection:true,
    //    curveDirection:'up',
    //    curveDirectionAmountFactor:0.4,
    //    maxCurveHorizontalDecalage:0.3,
    //    maxHeightCurve:1,
    //    maxThicknessCurve:4,
    //    nbOfPointsPerCurve:20,
    //    maxBorderSideDecalage:0.1
    //  },
    //  side:0,
    //  color:'#b1c4d8',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.items.ground2024,
    //  isMapEnable:0,
    //  displacementMapIntensity:0,
    //}).instance

    // this.material = new TextureCraieMaterial({
    //   side:0,
    //   color:'#b1c4d8',
    //   bgColor:'#F8ECE8',
    //   texture:this.resources.BCFloorTexture
    // }).instance
    
    this.material = new MeshBasicMaterial({
      color: 0xffffff,
      side: 2,
    })
  }
  

  /**
   * Get mesh
   */
  setMesh() {
    this.item = new Mesh(this.geometry, this.material)
    this.item.position.z = -45
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

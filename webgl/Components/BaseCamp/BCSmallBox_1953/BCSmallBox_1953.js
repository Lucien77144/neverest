import { DoubleSide, InstancedMesh, MeshNormalMaterial, Object3D } from 'three'
import { BCSMALLBOX_1953 } from '~/const/blocking/baseCamp.const'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'

export default class BCSmallBox_1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCSmallBox_1953',
    visibility = [0, 100],
    isInstances = true,
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility
    this.isInstances = isInstances

    // New elements
    this.resources = this.experience.resources.items
  }

  /**
   * Set Instances
   */
  setInstances() {
    const instance = this.resources.BCSmallBox_1953.scene.children[0]
    //const material = new CraieMaterial({
    //  textureParams:{
    //    textureSize:1024,
    //    nbOfColumns:1,
    //    borderSize:0.1,
    //    columnsOffset:0.01,
    //    nbOfCurvePerColumns:6,
    //    areCurveOnSameDirection:true,
    //    curveDirection:'down',
    //    curveDirectionAmountFactor:0.5,
    //    maxCurveHorizontalDecalage:0.5,
    //    maxHeightCurve:1.5,
    //    maxThicknessCurve:10,
    //    nbOfPointsPerCurve:5,
    //    maxBorderSideDecalage:0.03
    //  },
    //  side:0,
    //  color:'#0000FF',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.ground2024,
    //  isMapEnable:1,
    //  displacementMapIntensity:0,
    //}).instance
    // const material = new TextureCraieMaterial({
    //   side:0,
    //   color:'#371F76',
    //   bgColor:'#F8ECE8',
    //   texture:this.resources.BCSmallBox_1953Texture
    // }).instance
    const dummy = new Object3D()
    this.item = new InstancedMesh(instance.geometry, instance.material, BCSMALLBOX_1953.length)

    BCSMALLBOX_1953.forEach((el, i) => {
      dummy.position.set(el.position.x, el.position.y, el.position.z)
      dummy.rotation.set(el.rotation.x, el.rotation.y, el.rotation.z)
      dummy.updateMatrix()
      this.item.setMatrixAt(i, dummy.matrix)
    })

    this.item.instanceMatrix.needsUpdate = true
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCSmallBox_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    this.item.children[0].material = new MeshNormalMaterial()
    this.item.children[0].material.side = DoubleSide
  }

  /**
   * Init
   */
  init() {
    this.isInstances && this.setInstances()
    !this.isInstances && this.setItem()
    // !this.isInstances && this.setMaterial()
  }
}

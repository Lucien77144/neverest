import { DoubleSide, Mesh, MeshNormalMaterial, PlaneGeometry, ShaderMaterial, Uniform } from 'three'
import BasicItem from '~/webgl/Modules/Basics/BasicItem'
import CraieMaterial from '../../Shared/CraieMaterial/CraieMaterial'
import TextureCraieMaterial from '../../Shared/TextureCraieMaterial/TextureCraieMaterial'
import flagVert from './FlagShader/FlagShader.vert?raw'
import flagFrag from './FlagShader/FlagShader.frag?raw'

export default class BCTent_3_1953 extends BasicItem {
  /**
   * Constructor
   */
  constructor({
    position = new Vector3(0, 0, 0),
    rotation = new Vector3(0, 0, 0),
    name = 'BCTent_3_1953',
    visibility = [0, 100],
  }) {
    super()

    // Elements
    this.position = position
    this.rotation = rotation
    this.name = name
    this.visibility = visibility
    this.flag = null

    // New elements
    this.resources = this.experience.resources.items
    this.time = this.experience.time
  }

  /**
   * Set item
   */
  setItem() {
    this.item = this.resources.BCTent_3_1953.scene.clone()
    this.item.position.copy(this.position)
    this.item.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
    this.item.name = this.name
  }

  /**
   * Set material
   */
  setMaterial() {
    this.item.children[0].material = 
    //new CraieMaterial({
    //  textureParams:{
    //    textureSize:1024,
    //    nbOfColumns:2,
    //    borderSize:0,
    //    columnsOffset:-0.02,
    //    nbOfCurvePerColumns:60,
    //    areCurveOnSameDirection:false,
    //    curveDirection:'down',
    //    curveDirectionAmountFactor:0.4,
    //    maxCurveHorizontalDecalage:0.3,
    //    maxHeightCurve:4,
    //    maxThicknessCurve:1,
    //    nbOfPointsPerCurve:13,
    //    maxBorderSideDecalage:0.5
    //  },
    //  side:2,
    //  color:'#0F2310',
    //  bgColor:'#F8ECE8',
    //  displacementMap:this.resources.ground2024,
    //  isMapEnable:0,
    //  displacementMapIntensity:0
    //}).instance
    new TextureCraieMaterial({
      side:2,
      color:'#03AC13',
      bgColor:'#F8ECE8',
      texture:this.resources.BCTent3_1953Texture
    }).instance
  }

  setFlag() {
    const flagGeometry = new PlaneGeometry(3, 1.5, 32, 32)
    const flagMaterial = new ShaderMaterial({
      vertexShader: flagVert,
      fragmentShader: flagFrag,
      side: DoubleSide,
      uniforms: {
        uTime: new Uniform(this.time.elapsed * 0.001),
        uTexture: new Uniform(this.resources.flagTexture),
      },
    })
    this.flag = new Mesh(flagGeometry, flagMaterial)

    this.flag.scale.set(0.3, 0.3, 0.3)

    this.flag.position.x -= 2.2
    this.flag.position.y += 3.2
    this.flag.position.z -= 1.25

    this.flag.rotation.y = -Math.PI / 2
    this.flag.rotation.x = -Math.PI / 20
    this.flag.rotation.z = Math.PI / 20

    this.item.add(this.flag)
  }

  /**
   * Init
   */
  init() {
    this.setItem()
    this.setMaterial()
    this.setFlag()
  }

  update() {
    this.item.children[1].material.uniforms.uTime.value =
      this.time.elapsed * 0.001
  }
}

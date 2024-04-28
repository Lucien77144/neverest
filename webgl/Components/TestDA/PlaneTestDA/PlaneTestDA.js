import {
  CanvasTexture,
  Color,
  Mesh,
  MeshNormalMaterial,
  PlaneGeometry,
  QuadraticBezierCurve,
  ShaderMaterial,
  Uniform,
  Vector2,
} from 'three'
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
    this.debug = this.experience.debug

    this.color = {
      value: '#93AAF2',
    }
    this.backgroundColor = {
      value: '#F8ECE8',
    }
    this.curvesParam = {
      maxCurveHorizontalDecalage: 0.5,
      maxHeightCurve: 0.4,
      maxThicknessCurve: 15,
      numberOfCurve: 75,
      areCurveOnSameDirection: true,
      curveDirection: 'up',
      curveDirectionAmountFactor: 0.5,
    }
  }

  //createTexture(){
  //  const canvas = document.createElement('canvas')
  //  canvas.width = 1000
  //  canvas.height = 1000
  //  const ctx = canvas.getContext("2d")
  //
  //  ctx.fillStyle = "black"
  //  ctx.fillRect(0, 0, canvas.width, canvas.height)
  //
  //  const leftToRightGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  //  leftToRightGradient.addColorStop(0, '#FF3300')
  //  leftToRightGradient.addColorStop(1, '#FFFF00')
  //
  //  const rightToLeftGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  //  rightToLeftGradient.addColorStop(1, '#FF3300')
  //  rightToLeftGradient.addColorStop(0, '#FFFF00')
  //
  //  for(let i = 0; i<=this.curvesParam.numberOfCurve;i ++){
  //    ctx.beginPath()
  //
  //    const curveVerticalDirection = this.curvesParam.areCurveOnSameDirection ? (this.curvesParam.curveDirection === "up" ? -1 : 1) : (Math.random() > this.curvesParam.curveDirectionAmountFactor ? 1 : -1)
  //    const decalageCurvePointIndicator = (Math.random()*2 - 1) * this.curvesParam.maxCurveHorizontalDecalage * canvas.width
  //    const curveHeight = this.curvesParam.maxHeightCurve * canvas.height * Math.random()
  //    const thicknessCurve = this.curvesParam.maxThicknessCurve * Math.random()
  //    ctx.moveTo(0,i*canvas.height/(this.curvesParam.numberOfCurve-1))
  //    ctx.quadraticCurveTo(
  //      canvas.width*0.5 + decalageCurvePointIndicator,
  //      (i*canvas.height/(this.curvesParam.numberOfCurve-1)) + curveHeight  * curveVerticalDirection,
  //      canvas.width,
  //      i*canvas.height/(this.curvesParam.numberOfCurve-1)
  //    )
  //    ctx.lineTo(canvas.width,i*canvas.height/(this.curvesParam.numberOfCurve-1) + thicknessCurve)
  //    ctx.quadraticCurveTo(
  //      canvas.width*0.5 + decalageCurvePointIndicator,
  //      (i*canvas.height/(this.curvesParam.numberOfCurve-1)) + curveHeight  * curveVerticalDirection + thicknessCurve,
  //      0,
  //      i*canvas.height/(this.curvesParam.numberOfCurve-1) + thicknessCurve
  //    )
  //    ctx.lineTo(0,i*canvas.height/(this.curvesParam.numberOfCurve-1))
  //    ctx.closePath()
  //    ctx.fillStyle = i%2 === 1 ? leftToRightGradient : rightToLeftGradient
  //    ctx.fill()
  //  }
  //
  //  for(let i = 0; i<10000;i++){
  //    ctx.beginPath()
  //    ctx.arc(Math.random()*canvas.width,Math.random()*canvas.height,Math.random()*5,0,Math.PI*2)
  //
  //    ctx.fillStyle = 'black'
  //    ctx.fill()
  //    ctx.closePath()
  //  }
  //
  //  this.canvasTexture = new CanvasTexture(canvas)
  //  if(this.material){
  //    this.material.uniforms.uTexture.value = this.canvasTexture
  //  }
  //  canvas.remove()
  //
  //}

  createPointsTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1000
    canvas.height = 1000
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i <= this.curvesParam.numberOfCurve; i++) {
      const isComingFromLeft = i % 2 === 1

      const curveVerticalDirection = this.curvesParam.areCurveOnSameDirection
        ? this.curvesParam.curveDirection === 'up'
          ? -1
          : 1
        : Math.random() > this.curvesParam.curveDirectionAmountFactor
        ? 1
        : -1
      const decalageCurvePointIndicator =
        (Math.random() * 2 - 1) *
        this.curvesParam.maxCurveHorizontalDecalage *
        canvas.width
      const curveHeight =
        this.curvesParam.maxHeightCurve * canvas.height * Math.random()
      const thicknessCurve = this.curvesParam.maxThicknessCurve * Math.random()

      const curve = new QuadraticBezierCurve(
        new Vector2(0, (i * canvas.height) / this.curvesParam.numberOfCurve),
        new Vector2(
          canvas.width * 0.5 + decalageCurvePointIndicator,
          (i * canvas.height) / this.curvesParam.numberOfCurve +
            curveHeight * curveVerticalDirection
        ),
        new Vector2(
          canvas.width,
          (i * canvas.height) / this.curvesParam.numberOfCurve
        )
      )

      const curvePoints = curve.getPoints(canvas.width * 0.5)

      curvePoints.forEach((point) => {
        let greenChannel

        const isRandomPoint = Math.random() < 0

        if (!isRandomPoint) {
          if (isComingFromLeft) {
            greenChannel = Math.min(
              1,
              Math.max(point.x / canvas.width + (Math.random() * 0.4 - 0.2), 0)
            )
          } else {
            greenChannel = Math.min(
              1,
              Math.max(
                -(point.x / canvas.width) + 1 + (Math.random() * 0.4 - 0.2),
                0
              )
            )
          }
        } else {
          greenChannel = Math.random()
        }

        ctx.beginPath()
        ctx.arc(
          point.x,
          point.y+Math.random()*10,
          Math.random() * thicknessCurve,
          0,
          Math.PI * 2
        )

        ctx.fillStyle = `rgba(255,${greenChannel * 255},0,1)`
        ctx.fill()
        ctx.closePath()
      })
    }

    this.canvasTexture = new CanvasTexture(canvas)
    if (this.material) {
      this.material.uniforms.uTexture.value = this.canvasTexture
    }
    canvas.remove()
  }

  setGeometry() {
    this.geometry = new PlaneGeometry(3, 3, 256, 256)
  }

  setMaterial() {
    this.material = new ShaderMaterial({
      side: 0,
      vertexShader: ShaderTestDAVert,
      fragmentShader: ShaderTestDAFrag,
      uniforms: {
        uTexture: new Uniform(this.canvasTexture),
        uColor: new Uniform(new Color(this.color.value)),
        uBackgroundColor: new Uniform(new Color(this.backgroundColor.value)),
        uMaskThickness: new Uniform(0.1),
        uMaskNoiseIntensity: new Uniform(50.0),
        uMaskNoiseWidth: new Uniform(0.1),
        uDecalageBorderLeftRight: new Uniform(0),
      },
      transparent: false,
    })
  }

  setItem() {
    this.item = new Mesh(this.geometry, this.material)
    //this.item = this.resources.TentMain.scene.clone()
    //this.item.rotation.y = Math.PI*0.5
    //this.item.children[0].material = this.material
  }

  addTextureParamsIntoDebuger() {
    this.debugFolder = this.debug.addFolder({
      title: 'Shader DA',
    })

    const textureFolder = this.debugFolder.addFolder({
      title: 'Texture drawing params',
    })

    textureFolder
      .addButton({ title: 'Redraw Texture' })
      .on('click', () => this.createPointsTexture())

    const curveFolder = textureFolder.addFolder({
      title: 'Curves',
    })

    curveFolder.addBinding(this.curvesParam, 'numberOfCurve', {
      min: 3,
      max: 150,
      step: 1,
      label: 'Curve Amount',
    })

    curveFolder
      .addBinding(this.curvesParam, 'areCurveOnSameDirection', {
        label: 'Curve on same direction ?',
      })
      .on('change', () => {
        curveFolder.children.forEach((child) => {
          if (child.key === 'curveDirection')
            child.disabled = !this.curvesParam.areCurveOnSameDirection
          if (child.key === 'curveDirectionAmountFactor')
            child.disabled = this.curvesParam.areCurveOnSameDirection
        })
      })

    curveFolder.addBinding(this.curvesParam, 'curveDirection', {
      options: { Up: 'up', Down: 'down' },
      label: 'Curve direction',
      disabled: !this.curvesParam.areCurveOnSameDirection,
    })

    curveFolder.addBinding(this.curvesParam, 'curveDirectionAmountFactor', {
      min: 0,
      max: 1,
      step: 0.01,
      label: 'Number of curves going up / down factor',
      disabled: this.curvesParam.areCurveOnSameDirection,
    })

    curveFolder.addBinding(this.curvesParam, 'maxHeightCurve', {
      min: 0,
      max: 1,
      step: 0.01,
      label: 'Curves max height',
    })

    curveFolder.addBinding(this.curvesParam, 'maxThicknessCurve', {
      min: 1,
      max: 50,
      step: 1,
      label: 'Max Curves Thickness',
    })

    curveFolder.addBinding(this.curvesParam, 'maxCurveHorizontalDecalage', {
      min: 0,
      max: 0.5,
      step: 0.01,
      label: 'Max Curves Horizontal Offset',
    })
  }

  addUniformsIntoDebuger() {
    const maskFolder = this.debugFolder.addFolder({
      title: 'Horizontal Border',
      expanded: false,
    })

    maskFolder.addBinding(this.material.uniforms.uMaskThickness, 'value', {
      min: 0,
      max: 0.5,
      step: 0.01,
      label: 'Mask Thickness',
    })

    maskFolder.addBinding(this.material.uniforms.uMaskNoiseIntensity, 'value', {
      min: 0,
      max: 200,
      step: 1,
      label: 'Mask Noise Intensity',
    })

    maskFolder.addBinding(this.material.uniforms.uMaskNoiseWidth, 'value', {
      min: 0,
      max: 0.2,
      step: 0.01,
      label: 'Mask Noise Width',
    })

    maskFolder.addBinding(
      this.material.uniforms.uDecalageBorderLeftRight,
      'value',
      {
        min: -0.5,
        max: 0.5,
        step: 0.01,
        label: 'Decalage Border Left / Right',
      }
    )

    this.debugFolder
      .addBinding(this.color, 'value', {
        label: 'Color',
        view: 'color',
      })
      .on('change', () => {
        this.material.uniforms.uColor.value = new Color(this.color.value)
      })

    this.debugFolder
      .addBinding(this.backgroundColor, 'value', {
        label: 'Background Color',
        view: 'color',
      })
      .on('change', () => {
        this.material.uniforms.uBackgroundColor.value = new Color(
          this.backgroundColor.value
        )
      })
  }

  init() {
    this.createPointsTexture()
    this.setGeometry()
    this.setMaterial()
    this.setItem()
    this.addTextureParamsIntoDebuger()
    this.addUniformsIntoDebuger()
  }
}

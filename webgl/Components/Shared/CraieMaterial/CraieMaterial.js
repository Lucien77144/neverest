import { CanvasTexture, Color, QuadraticBezierCurve, ShaderMaterial, Uniform, Vector2 } from "three"
import ShaderCraieVert from './ShaderCraie/ShaderCraie.vert?raw'
import ShaderCraieFrag from './ShaderCraie/ShaderCraie.frag?raw'

export default class CraieMaterial {

    constructor({textureParams, side, color, bgColor, displacementMap, displacementMapIntensity, isMapEnable}){

        this.texture = null
        this.instance = null


        this.generateTexture(textureParams)
        this.createMaterial(side, color, bgColor, displacementMap, displacementMapIntensity)
    }


    generateTexture(textureParams){

        const {
            textureSize,
            nbOfColumns,
            borderSize,
            columnsOffset,
            nbOfCurvePerColumns,
            areCurveOnSameDirection,
            curveDirection,
            curveDirectionAmountFactor,
            maxCurveHorizontalDecalage,
            maxHeightCurve,
            maxThicknessCurve,
            nbOfPointsPerCurve,
            maxBorderSideDecalage
        } = textureParams


        const canvas = document.createElement('canvas')
        canvas.width = textureSize
        canvas.height = textureSize
        const ctx = canvas.getContext('2d')

        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'rgba(255,255,0,1)'
        ctx.fillRect(0,0,canvas.width,canvas.height*0.01)
        ctx.fillRect(0,0,canvas.width*0.01,canvas.height)
        ctx.fillRect(canvas.width*0.99,0,canvas.width*0.01,canvas.height)
        ctx.fillRect(0,canvas.height*0.99,canvas.width,canvas.height*0.01)

        const nbOfGouttieres = nbOfColumns - 1
        const columnsWidth = canvas.width - (borderSize * canvas.width * 2)
        const gouttieresSize = nbOfGouttieres * columnsOffset * columnsWidth
        const singleColumnWidth = ( columnsWidth / nbOfColumns) - ( gouttieresSize / nbOfColumns)

        for(let i = 0; i< nbOfColumns; i++){
            const columnXStartPos = borderSize * canvas.width + (i * (singleColumnWidth + columnsOffset * columnsWidth))
            const columnXEndPos = columnXStartPos + singleColumnWidth

            for(let i = 0; i<nbOfCurvePerColumns; i++){

                const curveVerticalDirection = areCurveOnSameDirection 
                ?
                    curveDirection === 'up'
                    ?
                        -1
                    :
                        1
                :
                    Math.random() > curveDirectionAmountFactor
                    ?
                        1
                    :
                        -1

                const curveHorizontalDecalage = maxCurveHorizontalDecalage * (Math.random()*2-1) * singleColumnWidth
                const thicknessCurve = maxThicknessCurve * Math.random()

                const curve = new QuadraticBezierCurve(
                    new Vector2(
                        columnXStartPos+((Math.random()-0.5)*singleColumnWidth*maxBorderSideDecalage),
                        borderSize * canvas.height + (canvas.height-2*borderSize*canvas.height )*i/nbOfCurvePerColumns
                    ),
                    new Vector2(
                        columnXStartPos + singleColumnWidth * 0.5 + curveHorizontalDecalage,
                        borderSize * canvas.height + (canvas.height-2*borderSize*canvas.height ) * ( i + 0.25 + (curveVerticalDirection * Math.random() * maxHeightCurve))/nbOfCurvePerColumns
                    ),
                    new Vector2(
                        columnXEndPos+((Math.random()-0.5)*singleColumnWidth*maxBorderSideDecalage),
                        borderSize * canvas.height + (canvas.height-2*borderSize*canvas.height) * (i + 0.5) / nbOfCurvePerColumns
                    )
                )

                const curveLeft = new QuadraticBezierCurve(
                    new Vector2(
                        columnXEndPos+((Math.random()-0.5)*singleColumnWidth*maxBorderSideDecalage),
                        borderSize * canvas.height + (canvas.height-2*borderSize*canvas.height) * (i + 0.5) / nbOfCurvePerColumns
                    ),
                    new Vector2(
                        columnXStartPos + singleColumnWidth * 0.5 + curveHorizontalDecalage,
                        borderSize * canvas.height + (canvas.height-2*borderSize*canvas.height) * (i + 0.75 + (curveVerticalDirection * Math.random() * maxHeightCurve)) / nbOfCurvePerColumns
                    ),
                    new Vector2(
                        columnXStartPos+((Math.random()-0.5)*singleColumnWidth*maxBorderSideDecalage),
                        borderSize * canvas.height + (canvas.height-2*borderSize*canvas.height) * (i + 1) / nbOfCurvePerColumns
                    )
                )

                const curvePoints = curve.getPoints(singleColumnWidth * nbOfPointsPerCurve)
                const curveLeftPoints = curveLeft.getPoints(singleColumnWidth * nbOfPointsPerCurve)

                curvePoints.forEach(point => {
                    let greenChannel

                    const isRandomPoint = Math.random() < 0.1

                    if(!isRandomPoint){
                        greenChannel = ((-point.x + columnXStartPos + columnXEndPos) - columnXStartPos) / (columnXEndPos - columnXStartPos)
                    }else{
                        greenChannel = Math.random()
                    }

                    ctx.beginPath()
                    ctx.arc(
                        point.x,
                        point.y+Math.random()*4,
                        thicknessCurve*Math.random(),
                        0,
                        Math.PI * 2
                    )
                
                    ctx.fillStyle = `rgba(255,${greenChannel * 255},0,1)`
                    ctx.fill()
                    ctx.closePath()
                })

                curveLeftPoints.forEach(point=>{

                    let greenChannel
          
                    const isRandomPoint = Math.random() < 0.1
          
                    if(!isRandomPoint){
                      greenChannel = (point.x - columnXStartPos) / (columnXEndPos - columnXStartPos)
                    }else{
                      greenChannel = Math.random()
                    }
          
                    ctx.beginPath()
                    ctx.arc(
                      point.x,
                      point.y+Math.random()*4,
                      thicknessCurve*Math.random(),
                      0,
                      Math.PI * 2
                    )
          
                    ctx.fillStyle = `rgba(255,${greenChannel * 255},0,1)`
                    ctx.fill()
                    ctx.closePath()
                  })
            }

        }

        var imageDataURL = canvas.toDataURL();
        var link = document.createElement('a');
        link.href = imageDataURL;
        link.download = 'canvas_texture.jpg';
        link.click();

        this.texture = new CanvasTexture(canvas)

        if(this.instance){
            this.instance.uniforms.uTexture.value = this.texture
        }
        canvas.remove()

    }

    createMaterial(side, color, bgColor, displacementMap, displacementMapIntensity, isMapEnable){
        this.instance = new ShaderMaterial({
            side,
            vertexShader:ShaderCraieVert,
            fragmentShader:ShaderCraieFrag,
            uniforms:{
                uTexture: new Uniform(this.texture),
                uColor: new Uniform(new Color(color)),
                uBackgroundColor: new Uniform(new Color(bgColor)),
                uMaskThickness: new Uniform(0),
                uMaskNoiseIntensity: new Uniform(0),
                uMaskNoiseWidth: new Uniform(0),
                uDecalageBorderLeftRight: new Uniform(0),
                uTextureRepetitions : new Uniform(0),
                uDisplacementMap: new Uniform(displacementMap),
                uIsMapEnable:new Uniform(isMapEnable),
                uDisplacementMapIntensity: new Uniform(displacementMapIntensity)
            },
            transparent:false
        })
    }

}
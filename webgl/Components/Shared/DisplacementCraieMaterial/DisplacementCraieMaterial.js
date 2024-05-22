import { Color, ShaderMaterial, Uniform } from "three"
import DisplacementCraieMaterialVert from './DisplacementCraieMaterialShader/DisplacementCraieMaterialShader.vert?raw'
import DisplacementCraieMaterialFrag from './DisplacementCraieMaterialShader/DisplacementCraieMaterialShader.frag?raw'

export default class DisplacementCraieMaterial {

    constructor({side, color, bgColor, texture, displacementTexture, displacementIntensity}){
        this.instance = null
        this.createMaterial(side, color, bgColor, texture, displacementTexture, displacementIntensity)
    }



    createMaterial(side, color, bgColor, texture, displacementTexture, displacementIntensity){
        this.instance = new ShaderMaterial({
            side,
            vertexShader:DisplacementCraieMaterialVert,
            fragmentShader:DisplacementCraieMaterialFrag,
            uniforms:{
                uTexture: new Uniform(texture),
                uColor: new Uniform(new Color(color)),
                uBgColor: new Uniform(new Color(bgColor)),
                uDisplacementTexture: new Uniform(displacementTexture),
                uDisplacementIntensity:new Uniform(displacementIntensity)
            },
            transparent:false
        })
    }

}
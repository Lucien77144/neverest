import { Color, ShaderMaterial, Uniform } from "three"
import TextureCraieMaterialVert from './TextureCraieMaterialShader/TextureCraieMaterialShader.vert?raw'
import TextureCraieMaterialFrag from './TextureCraieMaterialShader/TextureCraieMaterialShader.frag?raw'

export default class TextureCraieMaterial {

    constructor({side, color, bgColor, texture}){
        this.instance = null
        this.createMaterial(side, color, bgColor, texture)
    }



    createMaterial(side, color, bgColor, texture){
        this.instance = new ShaderMaterial({
            side,
            vertexShader:TextureCraieMaterialVert,
            fragmentShader:TextureCraieMaterialFrag,
            uniforms:{
                uTexture: new Uniform(texture),
                uColor: new Uniform(new Color(color)),
                uBgColor: new Uniform(new Color(bgColor)),
            },
            transparent:false
        })
    }

}
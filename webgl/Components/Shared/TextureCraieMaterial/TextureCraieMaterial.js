import { Color, MeshBasicMaterial, ShaderMaterial, Uniform } from "three"
import TextureCraieMaterialVert from './TextureCraieMaterialShader/TextureCraieMaterialShader.vert?raw'
import TextureCraieMaterialFrag from './TextureCraieMaterialShader/TextureCraieMaterialShader.frag?raw'

export default class TextureCraieMaterial {

    constructor({side, color, bgColor, texture}){
        this.instance = null
        this.createMaterial(side, color, bgColor, texture)
    }



    createMaterial(side, color, bgColor, texture){
        //this.instance = new ShaderMaterial({
        //    side,
        //    vertexShader:TextureCraieMaterialVert,
        //    fragmentShader:TextureCraieMaterialFrag,
        //    uniforms:{
        //        uTexture: new Uniform(texture),
        //        uColor: new Uniform(new Color(color)),
        //        uBgColor: new Uniform(new Color(bgColor)),
        //    },
        //    transparent:false
        //})
        const material = new MeshBasicMaterial({map:texture})
        material.onBeforeCompile = (shader)=>{
            shader.uniforms.uColor = new Uniform(new Color(color))
            shader.uniforms.uTexture = new Uniform(texture)
            shader.uniforms.uBgColor = new Uniform(new Color(bgColor))
            shader.vertexShader = shader.vertexShader.replace(
                'void main() {',
                `
                    varying vec2 vUv;
                    void main() {
                    vUv = uv;
                `
            )
            shader.fragmentShader = 
            `
                varying vec2 vUv;

                uniform sampler2D uTexture;
                uniform vec3 uBgColor;
                uniform vec3 uColor;

                void main()
                {
                    vec4 texture = texture2D(uTexture, vUv);
                    vec3 isColoried = step(0.1,texture.r) * mix(uBgColor,uColor,texture.g);
                    vec3 isBackground = (-step(0.1,texture.r) + 1.0) * uBgColor;
                    gl_FragColor = vec4(isColoried+isBackground,1.0);
                }
            `
            
            console.log(shader)
        }
        this.instance = material
    }

}
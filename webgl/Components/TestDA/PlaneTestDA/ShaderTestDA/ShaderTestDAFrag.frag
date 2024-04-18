varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec3 uColor;
uniform vec3 uBackgroundColor;
uniform float uMaskThickness;
uniform float uMaskNoiseIntensity;
uniform float uMaskNoiseWidth;
uniform float uDecalageBorderLeftRight;


float random (float yPos) {
    return fract(sin(yPos) * 43758.5453123);
}

float noise(float p){
	float fl = floor(p);
  float fc = fract(p);
	return mix(random(fl), random(fl + 1.0), fc);
}

void main()
{


    //Random Color Variation on lines
    
    //vec4 texture = texture2D(uTexture, vUv);
    //float textureOpacity = step(0.7,texture.x);
    //float stairCase = floor(vUv.y*15.0)*0.0666;
    //float randomStair = random(stairCase);
    //gl_FragColor = vec4(uColor + (randomStair*0.3-0.15),textureOpacity);

    //Contour en X Mask

    vec4 texture = texture2D(uTexture, vUv);
    float border = step(uMaskThickness,vUv.x+noise(vUv.y*uMaskNoiseIntensity)*uMaskNoiseWidth-uMaskNoiseWidth*0.5) * step(vUv.x+noise((vUv.y+uDecalageBorderLeftRight)*uMaskNoiseIntensity)*uMaskNoiseWidth-uMaskNoiseWidth*0.5,1.0-uMaskThickness);
    float borderWithSmooth = smoothstep(0.0, uMaskThickness+uMaskNoiseWidth*0.5,vUv.x) * smoothstep(1.0, 1.0 - (uMaskThickness+uMaskNoiseWidth*0.5), vUv.x);
    //border = mix(border, 1.0, borderWithSmooth);
    vec3 isColoried = step(0.1,texture.r) * border  * mix(uBackgroundColor,uColor,texture.g );
    vec3 isBackground = (-(step(0.1,texture.r) * border) + 1.0) * uBackgroundColor;

    gl_FragColor = vec4(isColoried+isBackground,1.0);

    //Test Canvas Texture

    //gl_FragColor = vec4(border,0.0,0.0,1.0);

   //gl_FragColor = texture;

}
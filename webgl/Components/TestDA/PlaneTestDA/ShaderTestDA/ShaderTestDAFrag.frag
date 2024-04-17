varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec3 uColor;


float random (float yPos) {
    return fract(sin(yPos)*100.0);
}

void main()
{


    //Random Color Variation on lines
    
    //vec4 texture = texture2D(uTexture, vUv);
    //float textureOpacity = step(0.7,texture.x);
    //float stairCase = floor(vUv.y*15.0)*0.0666;
    //float randomStair = random(stairCase);
    //gl_FragColor = vec4(uColor + (randomStair*0.3-0.15),textureOpacity);

    gl_FragColor = vec4(1.0,1.0,1.0,1.0)
}
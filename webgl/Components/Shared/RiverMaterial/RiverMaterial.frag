uniform sampler2D uFTexture;
uniform sampler2D uSTexture;
uniform sampler2D uTTexture;
uniform float uTime;
varying vec2 vUv;


void main() {
    vec3 firstTexture = texture2D(uFTexture,vUv).rgb;
    vec3 secondTexture = texture2D(uSTexture,vUv).rgb;
    vec3 thirdTexture = texture2D(uTTexture,vUv).rgb;
    float currentTextureFactor = step(mod(uTime,1.0),0.333);
    float secondCurrentTextureFactor = step(0.666,mod(uTime,1.0));
    vec3 currentTexture = mix(firstTexture, secondTexture, currentTextureFactor);
    currentTexture = mix(currentTexture, thirdTexture, secondCurrentTextureFactor);
    currentTexture.rg*=0.8;
    currentTexture.b*=1.2;
    gl_FragColor = vec4(currentTexture,1.0);
}
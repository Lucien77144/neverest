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
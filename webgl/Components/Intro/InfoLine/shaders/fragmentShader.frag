precision mediump float;
varying vec2 vUv;
varying vec3 vPos;

uniform float uLineHeight;
uniform float uProgress;
uniform float uHighestPoint;
uniform float uLowestPoint;

void main()
{
    float posValue = (vPos.y - uLowestPoint)  / uLineHeight;
    gl_FragColor = vec4(0.2549019607843137, 0.32941176470588235, 0.35294117647058826, step(posValue, uProgress) );
}
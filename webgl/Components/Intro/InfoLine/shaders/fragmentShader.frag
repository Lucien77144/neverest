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
    gl_FragColor = vec4(0.592156862745098, 0.3137254901960784, 0.3843137254901961, step(posValue, uProgress) );
}
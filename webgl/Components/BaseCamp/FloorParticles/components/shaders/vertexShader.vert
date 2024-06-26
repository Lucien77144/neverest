varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 uDirection;
uniform float uSpeedDelta;
uniform float uTime;

void main() {
    vUv = uv;

    vUv -= 0.5;
    float circle = 1. - length(vUv * 2.);
    vUv += 0.5;

    vPosition = position;
    vPosition.z += max(circle, 0.1);
    vPosition.y -= .37;
    vPosition.x += (.5 * (-uDirection.x * (uSpeedDelta * .1))) * vPosition.z;
    
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);
}
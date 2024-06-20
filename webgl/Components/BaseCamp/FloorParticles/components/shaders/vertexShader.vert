varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;

void main() {
    vUv = uv;

    vUv -= 0.5;
    float circle = 1. - length(vUv * 2.);
    vUv += 0.5;

    vPosition = position;
    vPosition.z += max(circle, 0.);
    vPosition.z = max(vPosition.z - 0.05, 0.);

    vPosition.x *= 1. + abs(sin(vPosition.z));
    
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);
}
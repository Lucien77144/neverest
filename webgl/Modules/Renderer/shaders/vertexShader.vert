varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vUv = uv;
    vec3 pos = position;

    gl_Position = vec4( pos, 1.0 );
}
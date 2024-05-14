varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec3 uColor;

void main()
{
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
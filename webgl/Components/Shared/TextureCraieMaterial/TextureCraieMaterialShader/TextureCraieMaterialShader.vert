varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec3 uBgColor;
uniform vec3 uColor;

void main()
{
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 clipPosition = projectionMatrix * viewPosition;
    gl_Position = clipPosition;
}
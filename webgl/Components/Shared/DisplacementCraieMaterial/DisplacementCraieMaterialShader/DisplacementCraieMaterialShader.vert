varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec3 uBgColor;
uniform vec3 uColor;
uniform sampler2D uDisplacementTexture;
uniform float uDisplacementInstensity;

void main()
{
    vUv = uv;

    vec4 dTexture = texture2D(uDisplacementTexture,vUv);
    float decalageY = (dTexture.r + dTexture.g + dTexture.b) / 3.0 - 1.0;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += decalageY * uDisplacementInstensity;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 clipPosition = projectionMatrix * viewPosition;
    gl_Position = clipPosition;
}
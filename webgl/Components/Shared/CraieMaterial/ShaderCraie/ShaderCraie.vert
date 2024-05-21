varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uDisplacementMap;
uniform float uDisplacementMapIntensity;
uniform float uIsMapEnable;
uniform vec3 uColor;

void main()
{
    vUv = uv;
    vec4 dMap = texture2D(uDisplacementMap,vUv);
    float decalageY = ((dMap.r + dMap.g + dMap.b) / 3.0 - 1.0) * uDisplacementMapIntensity;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y+= decalageY * uIsMapEnable;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 clipPosition = projectionMatrix * viewPosition;
    gl_Position = clipPosition;
}
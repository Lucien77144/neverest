varying vec2 vUv;
uniform float uRot;
uniform float uDec;
uniform float uTime;
uniform sampler2D uVentTexture;

mat3 rotationY(float angle) {

    float s = sin(angle);
    float c = cos(angle);

    return mat3(
        c, 0.0, s,
        0.0, 1.0, 0.0,
        -s, 0.0, c
    );
}
    
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}
  

void main() {
  vUv = uv;
  float ventTexture = texture2D(uVentTexture, uv).r;
  vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
  vec3 nrml = normalize(modelNormal.xyz);
  vec3 windDirection = normalize(vec3(1.0,-0.7,0.0));
  windDirection = rotationY(uRot) * windDirection;
  float dotProduct = dot(nrml,windDirection);
  dotProduct=-dotProduct;
  dotProduct = pow(dotProduct,3.0);
  vec4 modelPosition =  instanceMatrix * vec4(position, 1.0);
  modelPosition.x+=dotProduct*noise(uv+uTime*0.5)*0.5*ventTexture;
  modelPosition.x += pow(min(1.0,position.y*0.3),2.0) * noise(vec2(uTime*0.5+uDec)) * 0.2;
  gl_Position = projectionMatrix * modelViewMatrix * modelPosition;
}
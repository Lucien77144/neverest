varying vec2 vUv;
varying vec3 vNormal;
varying float vPos;
uniform float uTime;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}


float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f*f*(3.0-2.0*f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
  vUv = uv;
  

  
  float shift = 0.01;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec3 modelPositionA = modelPosition.xyz + vec3(shift, 0.0, 0.0);
  vec3 modelPositionB = modelPosition.xyz + vec3(0.0, 0.0, - shift);

  modelPosition.y += noise(uv * 4.0 - uTime) * uv.x * 0.2;
  modelPositionA.y += noise(vec2(uv.x+shift,uv.y) * 4.0 - uTime) * (uv.x+shift) * 0.2;
  modelPositionB.y += noise(vec2(uv.x,uv.y-shift) * 4.0 - uTime) * uv.x * 0.2;


  //modelPosition.y += (noise(modelPosition.xz*6.0-uTime)) * (modelPosition.x / 0.9 + 0.5) * 0.2;
  //modelPositionA.y += (noise(modelPositionA.xz*6.0-uTime)) *  (modelPositionA.x / 0.9 + 0.5) * 0.2;
  //modelPositionB.y += (noise(modelPositionB.xz*6.0-uTime)) *  (modelPositionB.x / 0.9 + 0.5) * 0.2;
//
  vec3 toA = normalize(modelPositionA - modelPosition.xyz);
  vec3 toB = normalize(modelPositionB - modelPosition.xyz);
  vec3 computedNormal = cross(toA, toB);
  vNormal = computedNormal;
  //vPos = modelPosition.x / 0.9 + 0.5;

  

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 clipPosition = projectionMatrix * viewPosition;
  
  gl_Position = clipPosition;
}
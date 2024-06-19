uniform float uTime;
uniform sampler2D uTexture;
varying vec2 vUv;
varying vec3 vNormal;

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
    vec2 uv = vUv;
    vec3 nrml = normalize(vNormal);
    vec3 windDirection = vec3(1.0,0.0,0.0);
    //uv.x += noise(vUv + uTime * 0.1) * 0.1;
    //uv.y += noise(vUv + uTime * 0.1) * 0.1;
    vec4 color = texture2D(uTexture, uv);
    float dotProduct = dot(nrml,windDirection);
    // color = vec4(vec3(nrml),1.0);

    gl_FragColor = color;
    #include <colorspace_fragment> // To fix colors problems when using render targets
}
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uSpeed;
uniform float uSpeedDelta;
uniform vec3 uColor;

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

float getProgress() {
    float progress = 1. - (vPosition.z * 2.);

    if (progress > 0.7) { progress = 0.; }
    return progress;
}

void main() {
    vec2 uv = vUv;
    
    float progress = getProgress();

    // vec3 wind = vec3(noise(uv * 10. + cos(uTime * .001)) * 0.5 + 0.5);

    vec2 snowUv = uv * 100.;
    snowUv.y -= uSpeed;
    float snow = round(noise(snowUv) * .65);

    vec3 color = vec3(0., 0., 0.);

    float opacity = max(progress - (1. - snow), 0.);
    opacity += getProgress() * noise(uv * 25. - (uTime * .001));
    opacity = clamp(opacity, 0., 1.);

    opacity *= min(uSpeedDelta * 2., 1.);
    opacity *= smoothstep(.1, .3, vPosition.z);

    gl_FragColor = vec4(uColor, opacity);
}
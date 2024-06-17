uniform float uTime;
uniform float uIndex;
uniform float uRandom;
uniform sampler2D uTexture;
varying vec2 vUv;

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
    vec4 color = texture2D(uTexture, uv);

    float dist = 1.25;
    float minV = 1.;
    float speed = 1.75;

    float rdm = ((1. + uRandom) / 2.);
    float maxColor = max(color.r, max(color.g, color.b));
    float clamped = sin(uTime + round(rdm * 10.) * speed) + 1.;
    float rounded = round(clamped * rdm * 2.5) * .2;
    float diff = dist * rounded + minV;
    float mask = abs(1. - round(clamp(maxColor * diff, 0., 1.)));
    
    vec3 bgColor = clamp(color.rgb * .5, .5, 1.);
    gl_FragColor.rgb = mix(bgColor, color.rgb, mask);
    gl_FragColor.a = 1.;
}

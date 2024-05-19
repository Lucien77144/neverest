uniform sampler2D uScene0;
uniform sampler2D uScene1;
uniform float uTime;
uniform float uTransition;
uniform float uModalProgress;
uniform float uFocProgress;
uniform sampler2D uBlob;
uniform vec3 uModalColor;
uniform vec3 uFocColor;
uniform vec2 uResolution;
uniform vec2 uCursor;
uniform vec2 uRatio;
varying vec2 vUv;

// Renvoie un nombre entre 0 et 1, la magnitude multiplie ce nombre
float clampedSine(float t, float magnitude) {
    return (1. + cos(t)) / 2. * magnitude; 
}

void applySpine(inout vec2 uv, float s) {
    uv -= .5;
    float l = 1.-length(uv);
    float a = atan(uv.y, uv.x);

    a += l*s;
    uv = vec2(cos(a), sin(a)) * length(uv);
    uv += .5;
}

void applyRotation(inout vec2 uv, float r) {
    uv -= .5;

    float a = atan(uv.y, uv.x);
    a -= r;
    uv = vec2(cos(a), sin(a)) * length(uv);
    uv += .5;
}

vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

float luminance(vec3 rgb, vec3 color) {
    return dot(rgb, color);
}

vec3 applyBlackAndWhite(vec3 c) {
    return vec3(luminance(c, vec3(.299, .587, .114)));
}

void applyFishEye(inout vec2 uv, float z) {
    uv -= .5;
    float l = length(uv);
    uv *= smoothstep(0., z * .5, l);
    uv += .5;
}

vec2 getMaskUv(vec2 uv) {
    vec2 maskUv = uv - .5;
         maskUv *= (uModalProgress * min(uResolution.x, uResolution.y));
         maskUv += .5;
         maskUv *= uRatio;
         maskUv -= (uRatio * .5 - .5);
    return maskUv;
}

void main() {
    vec2 uv = vUv;
    vec4 frag = vec4(0.);

    vec2 scene0UV = vec2(uv.x,uv.y+uTransition);
    vec4 scene0 = texture2D(uScene0, scene0UV);

    vec2 focUV = uv;
    focUV -= .5;
    float focNoise = smoothstep(0., 1., cnoise(focUV * 15.));
    float circle = length(focUV - .35 * focNoise);
    focUV += .5;
    
    float focVal = 1. - smoothstep(circle, 0.0, uFocProgress);
    float focVal2 = 1. - smoothstep(circle, 0.0, uFocProgress - .35);

    vec3 sceneRGB = scene0.rgb; 
    vec3 coveredScene = mix(sceneRGB, vec3(luminance(sceneRGB, uFocColor)), focVal);
    scene0.rgb = mix(sceneRGB, coveredScene, focVal);
    scene0.rgb = mix(scene0.rgb, mix(sceneRGB, coveredScene, .5), focVal2 + .25);

    vec2 scene1UV = vec2(uv.x,uv.y-(1.0-uTransition));
    vec4 scene1 = texture2D(uScene1, scene1UV);

    // -------------------- //
    //     Transition       //
    // -------------------- //
    float inverseuTransi = -uTransition + 1.;
    float cloudSizeMultiplicator = pow((inverseuTransi-0.5) * 2., 8.) * -.35 + .35;
    vec4 transiWithColor = vec4(step(inverseuTransi,uv.y),step(uv.y,inverseuTransi),0.0,1.0);

    //vec4 test = vec4(step(uTransition,uv.y)*topImage.x+step(uv.y,uTransition)*bottomImage.x,step(uTransition,uv.y)*topImage.y+step(uv.y,uTransition)*bottomImage.y,step(uTransition,uv.y)*topImage.z+step(uv.y,uTransition)*bottomImage.z,1.0);
    vec4 cloud = step(cnoise(uv*30.0),0.1) * vec4(0.81,0.87,0.96,1.0) + step(0.1,cnoise(uv*30.0)) * vec4(1.0);
    frag = scene0 * step(uv.y,inverseuTransi) + step(inverseuTransi,uv.y) * scene1;

    float isInCloudBand = max(sign(uv.y-(inverseuTransi-(cloudSizeMultiplicator+sin(uv.x*40.0)*cloudSizeMultiplicator*0.05))),0.0) * max(sign((inverseuTransi+cloudSizeMultiplicator+sin(uv.x*40.0)*cloudSizeMultiplicator*0.05)-uv.y),0.0);
    frag *= (-isInCloudBand+1.0);
    frag += isInCloudBand * cloud;

    // -------------------- //
    //        Modal         //
    // -------------------- //

    vec2 maskUv = getMaskUv(uv);
    applyRotation(maskUv, uTime * .001);

    float play = 1. - (uModalProgress == 0. ? 0. : 1.);
    vec4 blob = texture2D(uBlob, maskUv);
    
    float m = min(blob.r + blob.g + blob.b, 1.) - (play);
    float mask = 1. - min(m, 1.);

    frag = mix(frag, vec4(uModalColor, 1.), 1. - mask);

    gl_FragColor = frag;
}
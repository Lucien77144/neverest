uniform sampler2D uScene0;
uniform sampler2D uScene1;
uniform float uTime;
uniform float uTransition;
uniform float uModalProgress;
uniform float uFocProgress;
uniform sampler2D uBlob;
uniform vec3 uModalColor;
uniform vec3 uFocColor;
uniform vec3 uFocTransitionColor;
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

    // -------------------- //
    //       Scene 0        //
    // -------------------- //
    float zoomInTransiTiming = clamp(abs(pow(uTransition/0.6,3.0)),0.0,1.0);
    float fadeOutTransiTiming = clamp(-(uTransition-1.0)*5.0,0.0,1.0);
    
    vec2 centeredUv = uv - 0.5;
    vec2 zoomedUv = centeredUv * (1.0 - zoomInTransiTiming); // Appliquer le zoom
    zoomedUv += 0.5; // Recentrer les coordonnées UV

    vec4 scene0 = texture2D(uScene0, zoomedUv);
    vec4 scene0BW = vec4(applyBlackAndWhite(scene0.rgb), 1.);
    float sceneMask = smoothstep(.8, 1., (1. - scene0BW.r) * 5.);

    // -------------------- //
    //        Focus         //
    // -------------------- //
    vec2 focTime = vec2(cos(uTime * .001) * .1, sin(uTime * .001) * .1);
    vec2 focUV = uv + focTime;
    focUV -= (.5 + focTime * .5);

    float focNoise = smoothstep(0., 1., cnoise(focUV * uFocProgress));
    float circle = length((focUV - .35 * focNoise));

    float bwTime = (cos(uTime * .001) + uTime * .5) * -.001;
    vec2 bwUv = vec2(focUV.x * cos(bwTime) - focUV.y * sin(bwTime), focUV.x * sin(bwTime) + focUV.y * cos(bwTime));
    float bwNoise = smoothstep(0., 1., cnoise(focUV * 4. + bwTime)) * .6;

    scene0BW = mix(vec4(0.), scene0BW, (1. - bwNoise));
    scene0BW.a = bwNoise;
    scene0.rgb = mix(scene0.rgb, scene0BW.rgb, uFocProgress * .5);
    
    // float sceneMask = scene0.r * length(focUV);
    // float circle = sceneMask;

    focUV += (.5 + focTime * .5);
    
    // float focVal = 1. - smoothstep(circle, 0.0, uFocProgress);
    // float focVal2 = 1. - smoothstep(circle, 0.0, uFocProgress - .35);
    
    float focVal = 1. - smoothstep(circle, 0.0, 1. - uFocProgress - sceneMask);
    float focVal2 = 1. - smoothstep(circle, 0.0, 1. - uFocProgress + .35 - (sceneMask * .5));

    vec3 sceneRGB = scene0.rgb; 
    vec3 coveredScene = mix(sceneRGB, uFocTransitionColor, uFocProgress);
    scene0.rgb = mix(sceneRGB, coveredScene, focVal * uFocProgress);
    scene0.rgb = mix(scene0.rgb, mix(sceneRGB, coveredScene, .5), focVal2 * uFocProgress);

    // scene0.rgb = mix(sceneRGB, coveredScene, focVal * uFocProgress);
    // scene0.rgb = mix(scene0.rgb, mix(sceneRGB, coveredScene, .35), uFocProgress);

    // scene0.rgb = mix(sceneRGB, coveredScene, focVal * uFocProgress);
    // scene0.rgb = mix(scene0.rgb, mix(sceneRGB, coveredScene, .5), (focVal2 + .25) * uFocProgress);

    // -------------------- //
    //       Scene 1        //
    // -------------------- //
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

    // Obtenir la couleur de la texture à la nouvelle position UV
    vec4 scene0Texture = texture2D(uScene0, zoomedUv);
    vec4 scene1Texture = texture2D(uScene1,uv);
    

    scene0 = mix(scene0, vec4(1.0), zoomInTransiTiming);
    frag = mix(scene1,scene0,fadeOutTransiTiming);

    // -------------------- //
    //        Modal         //
    // -------------------- //

    float play = uModalProgress == 0. ? 0. : 1.;

    vec2 maskUv = getMaskUv(uv);
    applyRotation(maskUv, uTime * .001);

    vec4 blob = texture2D(uBlob, maskUv);
    
    float m = min(blob.r + blob.g + blob.b, 1.);
    float mask = 1. - min(m, 1.);

    frag = mix(frag, mix(frag, vec4(uModalColor, 1.), (1. - mask) * play), .995);

    gl_FragColor = frag;
   
    #include <colorspace_fragment> // To fix colors problems when using render targets
    // #include <tonemapping_fragment> // To fix tonemapping problems when using render targets (only if tone mapping is enabled)
}
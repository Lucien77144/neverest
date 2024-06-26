varying vec2 vUv;
varying vec3 vNormal;
varying float vPos;
uniform sampler2D uTexture;

void main() { 
    vec3 lightDirection = normalize(vec3(-1.0,0.0,0.0));
    vec3 shadowDirection = normalize(vec3(1.0,0.0,0.0));
    
    vec3 nrml = normalize(vNormal);

    float lightfactor = dot(lightDirection, nrml);
    lightfactor =  -lightfactor;
    lightfactor = pow(lightfactor,2.0);

    float shadowFactor = dot(shadowDirection, nrml);
    shadowFactor = - shadowFactor;
    shadowFactor = pow(shadowFactor,2.0);

    vec3 color = mix(vec3(1.0,0.0,0.0),vec3(1.0),lightfactor);
    //color = mix(color, vec3(0.0), shadowFactor);
    
    gl_FragColor = vec4(color,1.0);
}
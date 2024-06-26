uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  //vec2 remappingUv = vUv;
  //remappingUv*=6.0;
  //remappingUv = mod(remappingUv,1.0);
  //remappingUv.y += abs(mod(remappingUv.x*10.0,1.0)-0.5) * 0.05 *  (step(mod(uTime, 2.),1.0)) + uTime * 0.01;
  //remappingUv.x += uTime * 0.01;
  //vec4 color = texture2D(uTexture, remappingUv);
  //vec3 color = vec3(1.0-remappingUv.x,0.0,0.0);
  //gl_FragColor = vec4(color,1.0);

  float howManyLineInTenSecond = 150.0;
  float lineThickness = 0.002;
  float lineWidth = 0.3;
  float lineAnimProgress = mod(uTime, 1.0/(howManyLineInTenSecond/10.0)) / (1.0/(howManyLineInTenSecond/10.0));
  float randomYPosition = random(vec2(floor(uTime*howManyLineInTenSecond/10.0)));
  float isInLine = step(randomYPosition-lineThickness, vUv.y) * step(vUv.y, randomYPosition+lineThickness); 
  isInLine *= step(lineAnimProgress-lineWidth*0.5,vUv.x) * step(vUv.x,lineAnimProgress+lineWidth*0.5);
  gl_FragColor = mix(vec4(0.0,0.0,1.0,1.0),vec4(1.0,1.0,1.0,1.0),isInLine);
}
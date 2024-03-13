uniform sampler2D uScene0;
uniform sampler2D uScene1;
uniform float uTime;
uniform float uTransition;
uniform float uTemplate;
varying vec2 vUv;

// ------------------------------

void main() {
    float inverseuTransi = -uTransition+1.0; 
    vec2 uv = vUv;
    vec4 scene0 = texture2D(uScene0,vec2(uv.x,uv.y+uTransition)) ;
    vec4 scene1 = texture2D(uScene1, vec2(uv.x,uv.y-(1.0-uTransition)));


    vec4 transiWithColor = vec4(step(inverseuTransi,uv.y),step(uv.y,inverseuTransi),0.0,1.0);

    //vec4 test = vec4(step(uTransition,uv.y)*topImage.x+step(uv.y,uTransition)*bottomImage.x,step(uTransition,uv.y)*topImage.y+step(uv.y,uTransition)*bottomImage.y,step(uTransition,uv.y)*topImage.z+step(uv.y,uTransition)*bottomImage.z,1.0);


    
    
    

    gl_FragColor = scene0 * step(uv.y,inverseuTransi) + step(inverseuTransi,uv.y) * scene1;
    //gl_FragColor = transiWithColor;
}
varying vec2 vUv;
uniform sampler2D uTexture;

void main() { 
    gl_FragColor = texture2D(uTexture, vUv);
    #include <colorspace_fragment> // To fix colors problems when using render targets
}
uniform sampler2D uScene0;
uniform sampler2D uScene1;
uniform float uTime;
uniform float uTransition;
varying vec2 vUv;
/** [imports_main] **/
/** [/imports_main] **/

/** [imports_scene0] **/
/** [/imports_scene0] **/

/** [imports_scene1] **/
/** [/imports_scene1] **/

void main() {
    vec2 uv = vUv;
    vec2 scene0UV = vUv;
    vec2 scene1UV = vUv;
    vec4 scene = vec4(0.);
    /** [start_main] **/
    /** [/start_main] **/

    /** [start_scene0] **/
    /** [/start_scene0] **/
    scene = texture2D(uScene0, scene0UV);
    /** [end_scene0] **/
    /** [/end_scene0] **/

    /** [start_scene1] **/
    /** [/start_scene1] **/
    vec4 scene0 = scene;
    scene = texture2D(uScene1, scene1UV);
    /** [end_scene1] **/
    /** [/end_scene1] **/

    vec4 scene1 = scene;
    gl_FragColor = mix(scene0, scene1, uTransition);
    /** [end_main] **/
    /** [/end_main] **/
}
precision mediump float;
varying vec2 vUv;
varying vec3 vPos;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, vPos.y/7., 1.0);
        }
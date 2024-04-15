varying vec2 vUv;
varying vec3 vPos;
uniform float uLineHeight;
uniform float uProgress;
uniform float uHighestPoint;
uniform float uLowestPoint;

        void main()
        {
            vUv = uv;
            vPos = position;
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        }
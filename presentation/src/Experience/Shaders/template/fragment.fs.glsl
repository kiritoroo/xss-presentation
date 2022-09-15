precision highp float;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec3 color = vec3(1., 1., 1.);

  gl_FragColor = vec4(color, 1.);
}
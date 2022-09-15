uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

attribute vec2 uv;
attribute vec3 position;

varying vec2 vUv;
varying vec3 vPos;

void main() {
  vec3 pos = position;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = 500. * (4. / -mvPosition.z);
  // gl_PointSize = 2.0;

  vUv = uv;
  vPos = pos;
}
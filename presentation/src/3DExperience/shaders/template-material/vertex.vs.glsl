uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

attribute vec2 uv;
attribute vec3 position;

varying vec2 vUv;

void main() {
  vec3 pos = position;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = 1000. * (1. / -mvPosition.z);
  vUv = uv;
}
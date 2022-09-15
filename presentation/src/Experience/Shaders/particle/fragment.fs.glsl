precision highp float;

uniform sampler2D uMark;

varying vec2 vUv;
varying vec3 vPos;

void main() {
  vec4 mark = texture2D(uMark, gl_PointCoord);

  vec3 color = vec3(1., 1., 1.);

  float alpha = 1. - clamp(0., 1., abs(vPos.z/900.));

  gl_FragColor = vec4(color, 1.);
  gl_FragColor.a *= mark.a*alpha;
}
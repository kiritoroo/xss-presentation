import { 
  RawShaderMaterial,
  AdditiveBlending
} from "three";
import vertex from './vertex.vs.glsl'
import fragment from './fragment.fs.glsl'

export default class ParticleMaterial extends RawShaderMaterial {
  constructor(uniforms = {}) {
    super({
      vertexShader: vertex,
      fragmentShader: fragment,
      blending: AdditiveBlending,
      depthWrite: false,
      transparent: true
    })

    this.uniforms = uniforms
  }

  bindEvents() {
    document.addEventListener('scene:update', () => this.onUpdate())
  }

  onUpdate() {
    this.uniformsNeedUpdate = true
  }
}
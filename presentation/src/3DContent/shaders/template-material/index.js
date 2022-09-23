import { RawShaderMaterial } from "three";
import vertex from './vertex.vs.glsl'
import fragment from './fragment.fs.glsl'

export default class TemplateMaterial extends RawShaderMaterial {
  constructor(uniforms = {}) {
    super({
      vertexShader: vertex,
      fragmentShader: fragment
    })

    this.uniforms = uniforms
  }
}
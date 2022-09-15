import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()

const loaderModel = (url) => {
  return new Promise((resolve, reject) => {
    loader.load(url, (gltf) => {
      const result = gltf.scene
      resolve(result)
    })
  })
}

export default loaderModel
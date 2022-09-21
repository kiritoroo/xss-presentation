// import _3DLayout from "./3DExperience/Layout"
// import _3DStage from './3DExperience/Stage'

import Experience from "./Experience/Experience";
import Stage from "./2DContent/Stage";
import Layout from "./Layout";

const App = () => {
  window.Layout = new Layout()
  // const _3DStage = new Experience(document.getElementById("stage"))
  const _2DStage = new Stage()
}

if (document.readyState === 'complete') {
  App()
} else {
  // document.addEventListener('DOMContentLoaded', App())
  App()
}

//----- Singleton



// const stage = new Experience(document.getElementById("stage"))
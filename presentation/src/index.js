// import _3DLayout from "./3DExperience/Layout"
// import _3DStage from './3DExperience/Stage'

import Experience from "./Experience/Experience";

// const App = () => {
//   window._3DLayout = new _3DLayout()
//   window._3DStage = new _3DStage()
// }

// if (document.readyState === 'complete') {
//   App()
// } else {
//   document.addEventListener('DOMContentLoaded', App())
// }

//----- Singleton

const stage = new Experience(document.getElementById("stage"))
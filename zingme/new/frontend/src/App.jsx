import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Me from './pages/Me'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/me' element={<Me/>}></Route>
        </Routes>
      </Router>
    {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/> */}
    </QueryClientProvider>
  )
}

export default App

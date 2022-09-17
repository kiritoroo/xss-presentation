import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Login from './pages/Login'
import Signup from './pages/Signup'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>Header</div>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
        <div>Footer</div>
      </Router>
    {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/> */}
    </QueryClientProvider>
  )
}

export default App

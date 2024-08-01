import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import './App.css'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home></Home>} />
          <Route path='/home' element={<Home></Home>} />
          <Route path='*' element={<NoPage></NoPage>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

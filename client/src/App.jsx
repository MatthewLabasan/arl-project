import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Unsubscribe from './pages/Unsubscribe'
import './App.css'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home></Home>} />
          <Route path='/home' element={<Home></Home>} />
          <Route path='*' element={<NoPage></NoPage>} />
          <Route path='/unsubscribe' element={<Unsubscribe></Unsubscribe>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

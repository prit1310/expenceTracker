import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NoPage from './pages/NoPage'

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route index Component={Home}></Route>
            <Route path='/register' Component={Register}></Route>
            <Route path='/login' Component={Login}></Route>
            <Route path='*' Component={NoPage}></Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App

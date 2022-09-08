import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './views/home'
import Variable from './views/variable'
import Registration from './views/registration'
import QueriesIncidents from './views/queriesIncidents'
import BitacoraIncidents from './views/bitacoraIncidents'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>          
        <Route path='/' element={<Home/>}>
          <Route path='/variables' element={<Variable/>}></Route>
          <Route path='/registro' element={<Registration/>}></Route>
          <Route path='/consultas' element={<QueriesIncidents/>}></Route>
          <Route path='/consultas-bitacora' element={<BitacoraIncidents/>}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App

import React from 'react'
import { Routes,Route} from "react-router-dom"
import Trellomain from './Trellomain'
import Login from './Login'
import Signup from './Signup'
function App() {
  return (
    <div>
        <Routes>
           <Route path='/trello' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/' element={<Trellomain/>} />
            
        </Routes>

    </div>
  )
}

export default App
import React from 'react'
import { Routes,Route} from "react-router-dom"
import Trellomain from './Trellomain'
import Login from './Login'
import Signup from './Signup'
function App() {
  return (
    <div>
        <Routes>
           <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/trello' element={<Trellomain/>} />
            
        </Routes>

    </div>
  )
}

export default App
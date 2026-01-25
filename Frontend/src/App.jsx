import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Signup from './Pages/Signup.jsx'
import Signin from './Pages/Signin.jsx'
function App() {
 
  return (
    <>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
   </Routes>         
    </>
  )
}
export default App

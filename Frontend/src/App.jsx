import React from 'react'
import {Navigate, Route,Routes} from 'react-router-dom'
import Signup from './Pages/Signup.jsx'
import Signin from './Pages/Signin.jsx'
import Home from './Pages/Home.jsx'
import Customize from './Pages/Customize.jsx'
import Customize2 from './Pages/Customize2.jsx'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext.jsx'

function App() {
  const {userData,setUserData} = useContext(userDataContext);
  
  return ( 
    <>
    <Routes>
      <Route path='/' element={(userData ?.assistantImage && userData?.assistantName) ? <Home/> : <Navigate to="/customize" />}/>
      <Route path='/signup' element={!userData ? <Signup/> : <Navigate to="/" />}/>
      <Route path='/signin' element={!userData ? <Signin/> : <Navigate to="/" />}/>
      <Route path='/customize' element={userData ? <Customize/> : <Navigate to="/signin" />}/>
      <Route path='/customize2' element={userData ? <Customize2/> : <Navigate to="/signin" />}/>
   </Routes>        
  </>
  )
}
export default App;

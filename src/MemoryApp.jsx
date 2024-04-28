import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchValidateToken } from './index'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

import { ThemeApp } from './Mui/ThemeApp'
import { EditPassw, EditUser,  Login, 
RecoveryPassword, Register,  UserPage, Resultpage } from './pages'

export const MemoryApp = () => {
  
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchData = async () =>{
      const response = await dispatch(fetchValidateToken())
    }
    fetchData()
  },[])

  return ( 
    <ThemeApp>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/RecoveryPassword/:id' element={<RecoveryPassword/>}/>

          <Route path='/results' element={<Resultpage/>}/>
          
          <Route path='/Userpage' element={<UserPage/>}/>
          <Route path='/EditUser' element={<EditUser/>}/>
          <Route path='/EditPassword' element={<EditPassw/>}/>
        </Routes>
      </Router>
    </ThemeApp>
  )
}
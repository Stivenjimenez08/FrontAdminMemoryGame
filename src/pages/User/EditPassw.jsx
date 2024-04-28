import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { EditPassword } from '../../components/index'
import { LayoutPages } from '../Layout/LayoutPages'

export const EditPassw= () => {

  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  if(!user){
    navigate("/")
  }
  
  return (
    <LayoutPages>
      <EditPassword/>
    </LayoutPages>
  )
}
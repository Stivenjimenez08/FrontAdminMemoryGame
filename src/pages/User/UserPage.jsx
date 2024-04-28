import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ShowProfile } from '../../components/index'
import { LayoutPages } from '../Layout/LayoutPages'

export const UserPage = () => {

  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  if(!user){
    navigate("/")
  }

  return (
    <LayoutPages>
      <ShowProfile />
    </LayoutPages>
  )
}

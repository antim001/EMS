import React from 'react'
import {Navigate} from 'react-router-dom'
const PrivateRoutes = ({children}) => {
  const {user,loading} =useAuth()
  if(loading){
    <div>Loading....</div>
  }
  return user? children:<Navigate to='/login'/>
}

export default PrivateRoutes

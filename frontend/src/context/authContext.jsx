import React ,{useState,createContext,useContext}from 'react'

const userContext=createContext()

function authContext({children}) {
    const [user,setUser]=useState(null)
    const login=(user)=>
    {
setuser(user)
    }
    const logout=()=>{
      setUser(null)
      localStorage.removeItem('token')
    }
  return (
    <userContext.Provider value={{user,login,logout}}>

{children}
    </userContext.Provider>
  )
}
export const useAuth =()=>useContext(userContext)

export default authContext

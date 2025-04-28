import React, { useState, createContext, useContext,useEffect ,useNavigate} from 'react';

const UserContext = createContext(); // Capitalized as convention for contexts

function AuthContext({ children }) { // Capitalized component name
  const [user, setUser] = useState(null);
  const navigate= useNavigate()
  useEffect(()=>{
   const verifyUser = async() =>{
     try{
  const response= await axios.get('/http://localhost:5000/api/auth/verify')
  if(response.data.success){
    setUser(response.data.user)
  }
     }catch(error){
       if(error.response && !error.response.data.error){
        navigate('/login')
       }
     }
   }
   verifyUser()
  },[])
  
  const login = (userData) => {
    setUser(userData); // Corrected from 'setuser' to 'setUser'
    localStorage.setItem('token', userData.token); // Assuming you want to store token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);
export default AuthContext; // Capitalized export to match component name
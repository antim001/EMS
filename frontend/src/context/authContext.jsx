import React, { useState, createContext, useContext } from 'react';

const UserContext = createContext(); // Capitalized as convention for contexts

function AuthContext({ children }) { // Capitalized component name
  const [user, setUser] = useState(null);
  
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
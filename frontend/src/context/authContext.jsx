import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);
export default AuthContext;

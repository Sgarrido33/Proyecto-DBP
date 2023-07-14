import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  const loginUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("user")
    setUser(null);
  };

  useEffect(() => {
    const getUserFromLocalStorage =  () => {
      const userData  = localStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null)
      setLoading(false)

    }

    getUserFromLocalStorage()
  }, [])

 

  if(loading) return null
  

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

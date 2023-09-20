import { createContext, useContext, useState } from 'react';

const userProvider = createContext(null);
export const useAuth = () => useContext(userProvider);
export const UserContextProvider = ({ children }) => {
  const [loginStatus, setloginStatus] = useState(false);
  return (
    <>
      <userProvider.Provider value={{ loginStatus, setloginStatus }}>{children}</userProvider.Provider>
    </>
  );
};

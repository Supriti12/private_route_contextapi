import { createContext, useContext, useState } from 'react';

const userProvider = createContext(null);
export const useAuth = () => useContext(userProvider);
export const UserContextProvider = ({ children }) => {
  // const [loginStatus, setloginStatus] = useState(false);
  const [data, setData] = useState([]);
  const [contactUser,setContactUser]=useState([]);
  const [textContent,setTextContent]=useState([])
  return (
    <>
      {/* <userProvider.Provider 
      value={{ loginStatus, setloginStatus }}> */}
      <userProvider.Provider value={{ data, setData,contactUser,setContactUser,textContent,setTextContent}}>{children}</userProvider.Provider>
    </>
  );
};

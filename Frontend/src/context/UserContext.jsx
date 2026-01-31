
import { useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const serverUrl = "http://localhost:8000";
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
      setUserData(result.data);
      console.log(result.data);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    handleCurrentUser
  }



  return (
       <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
  )
}
export default UserContext;


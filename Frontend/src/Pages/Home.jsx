import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const { userData,serverUrl,setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    const result=await axios.post(`${serverUrl}/api/auth/logout`, { withCredentials: true });
    setUserData(null);
    navigate("/signin");
  } catch (error) {
    setUserData(null);
    console.log(error);
    
  }
};


  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020236] flex justify-center items-center  flex-col p-[20px] gap-[15px]'>

<button className="min-w-[150px] mt-[25px] h-[50px] text-black font-semibold absolute top-[20px] right-[20px]  bg-white rounded-full text-[17px] cursor-pointer" onClick={handleLogout} >Logout </button>

<button className="min-w-[150px] mt-[25px] h-[50px] text-black font-semibold absolute top-[100px] right-[20px] bg-white rounded-full text-[17px] cursor-pointer px-[20px] py-[10px]" onClick={()=>navigate("/customize")}>Customize Your Assistant</button>

      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>

        <img src={userData?.assistantImage} alt="" className='h-full object-cover' />
      </div>
      <h1 className='text-white text-[30px] font-semibold'>{userData?.assistantName}</h1>
    </div>
  )
}

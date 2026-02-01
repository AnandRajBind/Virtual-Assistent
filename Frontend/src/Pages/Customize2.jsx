import React from 'react'
import { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext.jsx'

export default function Customize2() {

    const {userData}=useContext(userDataContext);
const [assistantName, setAssistantName]=useState(userData?.AssistantName || "");

    return (

        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020236] flex justify-center items-center  flex-col'>
            <h1 className='text-white mb-[30px] text-[30px] text-center'>Enter Your <span className='text-blue-300'>Assistant Name</span> </h1>
            <input type="text" placeholder="eg. Sifra" className=" w-full max-w-[600px] h-[40px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-400 px-[10px] py-[10px] rounded-2xl text-[18px]" value={assistantName} onChange={(e) => setAssistantName(e.target.value)} />

            {
                assistantName && <button className="min-w-[300px] mt-[25px] h-[50px] text-black font-semibold bg-white rounded-full text-[17px] cursor-pointer" onClick={() => navigate('/customize2')}>Create Your Assistant</button>
            }
        </div>
    )
}

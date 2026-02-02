import React from 'react'
import { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext.jsx'
import { IoArrowBack } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Customize2() {
    const { userData, serverUrl, backendImage, selectedImage, setUserData } = useContext(userDataContext);
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdateAssistant = async () => {
        
        setLoading(true);
        try {
            let formData = new FormData();
            formData.append("assistantName", assistantName);
            if (backendImage) {
                formData.append("assistantImage", backendImage);
            }
            else {
                formData.append("assistantImageUrl", selectedImage);
            }
            const result = await axios.post(`${serverUrl}/api/user/update`, formData, { withCredentials: true })
            console.log(result.data);
            setUserData(result.data);
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020236] flex justify-center items-center  flex-col p-[20px]'>
            <IoArrowBack  className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=> navigate("/customize")}/>

            <h1 className='text-white mb-[30px] text-[30px] text-center'>Enter Your <span className='text-blue-300'>Assistant Name</span> </h1>
            <input type="text" placeholder="eg. Sifra" className=" w-full max-w-[600px] h-[40px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-400 px-[10px] py-[10px] rounded-2xl text-[18px]" value={assistantName} onChange={(e) => setAssistantName(e.target.value)} />
            {
                assistantName && <button className="min-w-[300px] mt-[25px] h-[50px] text-black font-semibold bg-white rounded-full text-[17px] cursor-pointer" disabled={loading} onClick={() => {
                    handleUpdateAssistant()
                }}>{!loading ? "Create Your Assistant" : "Loading..."}</button>
            }
        </div>
    )
}

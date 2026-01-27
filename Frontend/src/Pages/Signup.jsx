import React from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";


function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const { serverUrl } = useContext(userDataContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
const [error, setError]=useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setEmail("");
        setName("");
        setPassword("");
        setError("");
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`, {
                name,
                email,
                password
            }, { withCredentials: true });
            console.log(result);

        } catch (error) {
            console.log(error);
            setError(error.response.data.message);

        }
    }
    return (
        <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center" style={{ backgroundImage: `url('/authBg.png')` }}>
            <form onSubmit={handleSignup} className="w-[90%] h-[550px] max-w-[450px] bg-[#0000062] backdrop-blur-2xl shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]">
                <h1 className="text-white text-[30px] font-semibold mb-[30px]">Register to
                    <span className="text-blue-400 ">
                        Virtual Assistant
                    </span>
                </h1>
                <input type="text" placeholder="Enter Your Name" className=" w-full h-[40px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-400 px-[10px] py-[10px] rounded-2xl text-[18px]" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Enter Your Email" className=" w-full h-[40px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-400 px-[10px] py-[10px] rounded-2xl text-[18px]" required value={email} onChange={(e) => setEmail(e.target.value)} />

                <div className="w-full h-[40px] border-2 border-white bg-transparent text-white rounded-2xl text-[18px] relative">
                    <input type={showPassword ? "text" : "password"} placeholder="Enter Your Password" className="w-full h-full rounded-2xl outline-none bg-transparent placeholder-gray-400 px-[10px] py-[10px] pr-[45px]" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {showPassword ? (
                        <IoEyeOff className="absolute top-1/2 -translate-y-1/2 right-[10px] w-[25px] h-[25px] text-white cursor-pointer" onClick={() => setShowPassword(false)} />
                    ) : (
                        <IoEye className="absolute top-1/2 -translate-y-1/2 right-[10px] w-[25px] h-[25px] text-white cursor-pointer" onClick={() => setShowPassword(true)} />
                    )}
                </div>
                {
                    error && <p className="text-red-500 font-bold">*{error}</p>
                }
                <button className="min-w-[150px] mt-[25px] h-[50px] text-black font-semibold bg-white rounded-full text-[17px] cursor-pointer">Sign Up</button>

                <p className="text-[white] text-[18px] "> Already have an account ? <span className="text-blue-400 cursor-pointer" onClick={() => navigate("/login")}>Sign In</span> </p>
            </form>
        </div>
    );
}

export default Signup;
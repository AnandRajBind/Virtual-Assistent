import React from "react";

function Signup() {
    return (
        <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center" style={{ backgroundImage: `url('/authBg.png')` }}>
            <form className="w-[90%] h-[550px] max-w-[450px] bg-[#0000062] backdrop-blur-2xl shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]">
                <h1 className="text-white text-[30px] font-semibold mb-[30px]">Register to
                    <span className="text-blue-400 ">
                        Virtual Assistant
                    </span>
                </h1>
                <input type="text" placeholder="Enter Your Name" className=" w-full h-[40px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-400 px-[10px] py-[10px] rounded-2xl text-[18px]" />
                <input type="email" placeholder="Enter Your Email" className=" w-full h-[40px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-400 px-[10px] py-[10px] rounded-2xl text-[18px]" />

                <div className="w-full h-[40px] border-2 border-white bg-transparent text-white rounded-2xl text-[18px]">
                    <input type="password " placeholder="Enter Your Password" className="w-full h-full rounded-2xl outline-none bg-transparent placeholder-gray-400 px-[10px] py-[10px]" />
                </div>
            </form>
        </div>
    );
}

export default Signup;
import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext.jsx'

 function Card({image}) {
   const {   serverUrl,
      userData,
      setUserData,
      handleCurrentUser,
      backendImage, setBackendImage,
      frontendImage, setFrontendImage,
      selectedImage, setSelectedImage
    }=useContext(userDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff23] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${selectedImage === image ? "border-4 border-white shadow-2xl shadow-blue-950" : null}`} onClick={()=>setSelectedImage(image)}>
        <img src={image} alt="" className='h-full object-cover' />
    </div>
  )
}
export default Card;
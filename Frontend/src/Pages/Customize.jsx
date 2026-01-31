import React from 'react'
import image1 from '../assets/image1.png'
import image2 from '../assets/authBg.png'
import image3 from '../assets/image2.jpg'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'
import Card from '../component/Card.jsx'




function Customize() {
    return (
        <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#020236] flex justify-center items-center  flex-col'>
            <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-[20px]'>
                <Card image={image1} />
                <Card image={image2} />
                <Card image={image3} />
                <Card image={image4} />
                <Card image={image5} />
                <Card image={image6} />
                <Card image={image7} />
            </div>
        </div>
    )
}

export default Customize;
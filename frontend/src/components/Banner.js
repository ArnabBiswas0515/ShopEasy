import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'


import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md'


const Banner = () => {

    const [currentImage,setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () =>{
        if(desktopImages.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () =>{
        if(currentImage !== 0){
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded'>
        <div className='w-full h-56 md:h-72 bg-sky-200 relative'>

            {/* Button div  */}

            <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                <div className='w-full flex justify-between text-3xl'>
                    <button onClick={preveImage} className='shadow-md rounded-full hover:bg-sky-100'><MdOutlineNavigateBefore/></button>
                    <button onClick={nextImage} className='shadow-md rounded-full hover:bg-sky-100'><MdOutlineNavigateNext /></button>
                </div>
            </div>

            {/* Banner div  */}
            {/* Medium to large screen version */}
            <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                    desktopImages.map((img,index) => {
                        return(
                            <div 
                                className='w-full h-full min-w-full max-h-full transition-all' 
                                key={img} style={{transform : `translateX(-${currentImage * 100}%)`}}
                            >
                                <img src={img} className='w-full h-full'/>   
                            </div>
                        )
                    })
                }
            </div>

            {/* mobile screen version   */}
            <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                    mobileImages.map((img,index) => {
                        return(
                            <div 
                                className='w-full h-full min-w-full max-h-full transition-all' 
                                key={img} style={{transform : `translateX(-${currentImage * 100}%)`}}
                            >
                                <img src={img} className='w-full h-full object-cover'/>   
                            </div>
                        )
                    })
                }
            </div>

        </div>
    </div>
  )
}

export default Banner
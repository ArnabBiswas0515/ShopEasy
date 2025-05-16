import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const DisplayProduct = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
            <div className='w-fit ml-auto text-xl hover:bg-sky-200 rounded-full cursor-pointer'onClick={onClose}>
                <IoCloseOutline />
            </div>
            <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src={imgUrl} className='w-full h-full justify-center items-center'/>
            </div>
        </div>
    </div>
  )
}

export default DisplayProduct
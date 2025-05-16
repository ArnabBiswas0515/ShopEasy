import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import productCategory from '../Helpers/productCategory'
import { AiOutlineCloudUpload } from "react-icons/ai";
import uploadImage from '../Helpers/uploadImage';
import DisplayProduct from './DisplayProduct';
import { MdDeleteSweep } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({
    onClose,
    fetchData
}) => {

    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
    })

    const [openFullScreenView,setOpenFullScreenView] = useState(false)
    const [fullScreenView,setFullScreenView] = useState("")

    const handleOnChange = (e) => {
        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]

        const uploadImageCloudinary = await uploadImage(file)

        setData((preve)=>{
            return{
                ...preve,
                productImage : [...preve.productImage,uploadImageCloudinary.url]
            }
        })

    }

    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage]
        newProductImage.splice(index,1)

        setData((preve)=>{
            return{
                ...preve,
                productImage : [...newProductImage]
            }
        })
    }

    // handling final submit 

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(SummaryApi.uploadProduct.url,{
            method : SummaryApi.uploadProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }

        if (responseData.error) {
            toast.error(responseData?.message)
        }
    }

  return (
    <div className='fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-50'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[75%] overflow-hidden'>
            <div className='flex justify-between items-center'>
                <h2 className='font-semibold text-lg'>Upload Product</h2>
                <div className='w-fit ml-auto text-xl hover:bg-sky-200 rounded-full cursor-pointer'onClick={onClose}><IoCloseOutline /></div>
            </div>

            {/* form start */}

            <form className='grid p-4 gap-2 overflow-y-scroll h-full' onSubmit={handleSubmit}>
                
                {/* Product Name Section */}
                
                <label htmlFor='productName'>Product Name : </label>
                <input 
                    type='text' 
                    id='productName' 
                    placeholder='Enter the Product Name'
                    name='productName' 
                    value={data.productName} 
                    onChange={handleOnChange}
                    className='p-1 bg-sky-100 border rounded '
                    required
                />

                {/* Brand Name Section */}

                <label htmlFor='brandName'>Brand Name : </label>
                <input 
                    type='text' 
                    id='brandName' 
                    placeholder='Enter the Brand Name'
                    name='brandName' 
                    value={data.brandName} 
                    onChange={handleOnChange}
                    className='p-1 bg-sky-100 border rounded'
                    required
                />

                {/* Category Section  */}

                <label htmlFor='category'>Category : </label>
                <select 
                    value={data.category} 
                    name='category' 
                    onChange={handleOnChange} 
                    className='p-1 bg-sky-100 border rounded'
                    required
                >
                    <option value={""}>Select Category</option>
                    {
                        productCategory.map((el,index)=>{
                            return(
                                <option value={el.value} key={el.value+index}>{el.label}</option>
                            )
                        })
                    }
                </select>
                
                {/* Product Image Section  */}

                <label htmlFor='productImage'>Product Image : </label>
                <label htmlFor='uploadImageInput'>
                    <div className='p-2  bg-sky-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>           
                        <div className='text-sky-400 flex justify-center items-center flex-col gap-2'>
                            <span className='text-5xl'><AiOutlineCloudUpload /></span>
                            <p className='text-sm italic'>Upload Product Image</p>
                            <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                        </div>
                    </div>
                </label>

                {/* Image view of product  */}

                <div>
                    {
                        data?.productImage[0] ? (
                            <div className='flex items-center gap-2'>
                                {
                                    data.productImage.map((el,index)=>{
                                        return(
                                            <div className='relative group'>
                                                <img src={el} 
                                                    alt={el} 
                                                    width={80} 
                                                    height={80} 
                                                    className='bg-slate-100 border cursor-pointer'
                                                    onClick={()=>{
                                                        setOpenFullScreenView(true)
                                                        setFullScreenView(el)
                                                    }}
                                                />

                                                    {/* Deleting the uploaded image  */}

                                                <div className='absolute bottom-0 right-0 p-1 bg-red-300 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                                    <MdDeleteSweep />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ):(
                            <p className='italic text-sky-600 text-xs'>*Please Upload Product Image</p>
                        )
                    }
                </div>

{/* Pricing Section Start  */}

                {/* Product Pric part  */}
                
                <label htmlFor='price'>Product Price : </label>
                <input 
                    type='number' 
                    id='price' 
                    placeholder='Enter the Price of the Product'
                    name='price' 
                    value={data.price} 
                    onChange={handleOnChange}
                    className='p-1 bg-sky-100 border rounded'
                    required
                />

                {/* Selling Price part  */}

                <label htmlFor='sellingPrice'>Selling Price : </label>
                <input 
                    type='number' 
                    id='sellingPrice' 
                    placeholder='Enter the Selling Price of the Product'
                    name='sellingPrice' 
                    value={data.sellingPrice} 
                    onChange={handleOnChange}
                    className='p-1 bg-sky-100 border rounded'
                    required
                />

                {/* Description of the Product */}

                <label htmlFor='description'>Product Description : </label>
                <textarea 
                    className='h-28 bg-sky-100 border resize-none p-2' 
                    placeholder='Enter Product Description'
                    name='description'
                    value={data.description}
                    rows={3}
                    onChange={handleOnChange}
                >
                </textarea>

                {/* Submit button  */}

                <button className='px-3 py-2 bg-sky-300 mb-6 rounded hover:bg-sky-400 hover:italic transition-all'>Upload Product</button>
            </form>
        </div>

        {/* Image fukk view */}
        {
            openFullScreenView && (
                <DisplayProduct onClose={()=>setOpenFullScreenView(false)} imgUrl={fullScreenView}/>
            )
        }

    </div>
  )
}

export default UploadProduct
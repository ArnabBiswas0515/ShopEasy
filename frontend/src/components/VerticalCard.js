import React, { useContext } from 'react'
import scrollTop from '../Helpers/scrollTop'
import displayINRCurrency from '../Helpers/currencyDisplay'
import Context from '../context'
import addToCart from '../Helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading,data = []}) => {

    const loadingList = new Array(15).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e,id) => {
        await addToCart(e,id)
        fetchUserAddToCart()
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center md:justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>

        {   
            loading ? (
                loadingList.map((product,index)=>{
                    return(
                    <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-sky-100 rounded-sm shadow-md'>
                        <div className='bg-sky-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
                        <div className='p-4 grid gap-3'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 p-1 py-2 animate-pulse rounded-md bg-sky-200'></h2>
                        <p className='capitalize text-slate-500 p-1 animate-pulse rounded-md bg-sky-200 py-2'></p>
                        <div className='flex gap-3 '>
                            <p className='text-red-600 font-medium p-1 animate-pulse rounded-md bg-sky-200 w-full py-2'></p>
                            <p className='text-slate-500 line-through p-1 animate-pulse rounded-md bg-sky-200 w-full py-2'></p>
                        </div>
                        <button className='text-sm text-white px-2 rounded-md p-1 bg-sky-200 animate-pulse py-2'></button>
                        </div>
                    </div>
                    )
                })
            ):(
            data.map((product,index)=>{
                return(
                <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-sky-100 rounded-sm shadow-md' onClick={scrollTop}>
                    <div className='bg-sky-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                    <img src={product?.productImage[0]} className='objext-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                    </div>
                    <div className='p-4 grid gap-3'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                    <p className='capitalize text-slate-500'>{product?.category}</p>
                    <div className='flex gap-3 '>
                        <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                    </div>
                    <button className='text-sm bg-sky-400 hover:bg-sky-500 text-white px-2 py-0.5 rounded-md' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                    </div>
                </Link>
                )
            })
            )
        }
      </div>
  )
}

export default VerticalCard
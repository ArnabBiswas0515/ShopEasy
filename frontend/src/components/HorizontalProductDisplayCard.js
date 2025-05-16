import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../Helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../Helpers/currencyDisplay'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md'
import { Link } from 'react-router-dom'
import addToCart from '../Helpers/addToCart'
import Context from '../context'

const HorizontalProductDisplayCard = ({category, heading}) => {

  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)

  const loadingList = new Array(15).fill(null)

  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef()

  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e,id) => {
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)

    console.log("product data",categoryProduct.data)
    setData(categoryProduct?.data)
  }

  useEffect(()=>{
    fetchData()
  },[])

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }

  return (
    <div className='container  mx-auto px-4 my-6 relative'>

      {/* heading  */}
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

      {/* Product display  */}
      <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

        <button className='bg-sky-100 shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><MdOutlineNavigateBefore/></button>
        <button className='bg-sky-100 shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><MdOutlineNavigateNext /></button>

        { loading ? (
          loadingList.map((product,index)=>{
            return(
              <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-sky-100 rounded-sm shadow-md flex'>
                <div className='bg-sky-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse rounded-md'></div>
                <div className='p-4 grid w-full gap-2'>
                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 p-1 bg-sky-200 animate-pulse rounded-md'></h2>
                  <p className='capitalize text-slate-500 p-1 bg-sky-200 animate-pulse rounded-md'></p>
                  <div className='flex gap-3 w-full'>
                    <p className='text-red-600 font-medium p-1 bg-sky-200 w-full animate-pulse rounded-md'></p>
                    <p className='text-slate-500 line-through p-1 bg-sky-200 w-full animate-pulse rounded-md'></p>
                  </div>
                  <button className='text-sm text-white px-2 py-0.5 rounded-md w-full bg-sky-200 animate-pulse'></button>
                </div>
              </div>
            )
          })
        ) : (
            data.map((product,index)=>{
              return(
                <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-sky-100 rounded-sm shadow-md flex'>
                  <div className='bg-sky-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                    <img src={product.productImage[0]} className='objext-scale-down h-full hover:scale-110 transition-all'/>
                  </div>
                  <div className='p-4 grid'>
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
      
    </div>
  )
}

export default HorizontalProductDisplayCard
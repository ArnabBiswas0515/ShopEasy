import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import displayINRCurrency from '../Helpers/currencyDisplay';
import VerticalProductDisplayCard from '../components/VerticalProductDisplayCard';
import DisplayProductByCategory from '../components/DisplayProductByCategory';
import addToCart from '../Helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })

  const params = useParams()
  const { fetchUserAddToCart } = useContext(Context)
  const navigate = useNavigate()

  const [loading,setloading] = useState(true)
  const [activeImage,setActiveImage] = useState("")
  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage,setZoomImage] = useState(false)

  const productImageListLoading = new Array(4).fill(null)

  const fetchProductDetails = async () => {
    setloading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setloading(false)

    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  console.log("data",data)

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseSelectProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const {left, top, width, height} = e.target.getBoundingClientRect()
    console.log("coordinate",left,top,width,height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleAddToCart = async (e,id) => {
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async (e,id) => {
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container p-6 mx-auto'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>

        {/* Product Image Display */}

        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[300px] lg:w-96 lg:h-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
          </div>

          {/* Product Zoom Feature */}
          {
            zoomImage && (
              <div className='hidden lg:block absolute min-w-[400px] min-h-[400px] overflow-hidden bg-slate-200  p-1 right-[620px]'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-125'
                  style={{
                    backgroundImage : `url(${activeImage})`,
                    backgroundRepeat : 'no-repeat',
                    backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
                  }}
                >
                </div>
              </div>
            )
          }
          

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full '>
                  {
                    productImageListLoading?.map((el,index) => {
                      return(
                        <div className='h-20 w-20 bg-sky-200 rounded animate-pulse' key={"loadingImage"+index}>
                          
                        </div>
                      )
                    })
                  }
                </div>

              ):(

                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  { 
                    data?.productImage?.map((imageURL,index) => {
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imageURL}>
                          <img src={imageURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseSelectProduct(imageURL)} onClick={()=>handleMouseSelectProduct(imageURL)}/>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/* Product Details Display */}

        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-sky-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium bg-sky-200 animate-pulse h-6 w-full lg:h-8'></h2>
              <p className='capitalize text-slate-400 bg-sky-200 animate-pulse m-w-[100px] h-6 lg:h-8'></p>
              <div className='flex text-emerald-400 text-lg gap-1 bg-sky-200 animate-pulse h-6 w-full lg:h-8'>
              </div>
              <div className='flex items-center gap-2 my-2 '>
                <p className='text-black-600 text-xl font-medium p-4 bg-sky-200 w-full lg:h-8'></p>
                <p className='text-slate-400 line-through italic p-4 bg-sky-200 w-full lg:h-8'></p>
              </div>
              <div className='flex items-center gap-3 my-2'>
                <button className='bg-sky-200 animate-pulse h-6 w-full lg:h-8'></button>
                <button className='bg-sky-200 animate-pulse h-6 w-full lg:h-8'></button>
              </div>
              <div>
                <p className='text-slate-500 font-medium my-1 bg-sky-200 animate-pulse h-6 w-full lg:h-8'></p>
                <p className='bg-sky-200 animate-pulse h-10 w-full lg:h-8'></p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-slate-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>
              <div className='flex text-emerald-400 text-lg gap-1'>
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStarHalf />
              </div>
              <div className='flex items-center gap-2 my-2'>
                <p className='text-black-600 text-xl font-medium'>{displayINRCurrency(data.sellingPrice)}</p>
                <p className='text-slate-400 line-through italic'>{displayINRCurrency(data.price)}</p>
              </div>
              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-yellow-400 rounded px-3 py-1 min-w-[120px] font-medium bg-yellow-400 hover:italic hover:shadow-sm transition-all' onClick={(e)=>handleAddToCart(e,data?._id)}>Add To Cart</button>
                <button className='border-2 border-green-400 rounded px-3 py-1 min-w-[120px] font-medium bg-green-400 hover:italic hover:shadow-sm transition-all' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy Now</button>
              </div>
              <div>
                <p className='text-slate-500 font-medium my-1'>Description : </p>
                <p className='mx-1'>{data?.description}</p>
              </div>
            </div>
          )
        }

      </div>

        {
          data.category && (
            <DisplayProductByCategory category={data.category} heading={"Recommended Products"}/>
          )
        }
      
    </div>
  )
}

export default ProductDetails
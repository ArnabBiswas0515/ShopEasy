import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const Products = () => {

  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("data",dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>
      <div className='bg-sky-200 py-2 px-4 flex justify-between items-center'>

        <h2 className='font-semibold italic text-lg'>
          Available Products
        </h2>

        <button className='border-2 py-1 px-3 hover:italic transition-all rounded-full border-black bg-sky-300 hover:bg-sky-200' onClick={()=>setOpenUploadProduct(true)}>
          Upload Product
        </button>

      </div>

      {/* all products  */}

      <div className='flex flex-wrap gap-7 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct} />
            )
          })
        }
      </div>

      {/* Product Upload Component  */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }
      
    </div>
  )
}

export default Products
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {

    const [categoryProduct,setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const categoryLoading = new Array(15).fill(null)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
            {

                loading ? (
                    categoryLoading.map((el,index)=>{
                        return(
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-sky-200 animate-pulse'
                            key={"categoryLoading"+index}
                            ></div>
                        )
                    })
                ):(
                    categoryProduct.map((product,index)=>{
                        return(
                            <Link to={"/product-category?category="+product?.category} className='cursor-pointer hover:italic transition-all' key={product?.category}>
                                {/* category inside pic view */}
                                <div className='w-16 h-16 md:w-20 md:h-20 flex rounded-full overflow-hidden p-4 bg-sky-200 items-center justify-center'>
                                    <img src={product?.productImage[0]} 
                                    alt={product?.category}
                                    className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
                                    />
                                </div>
                                {/* Item List view */}
                                <p className='flex justify-center text-sm md:text-base capitalize'>
                                    {product?.category}
                                </p>
                            </Link>
                        )
                    })
                )
            }
        </div>
    </div>
  )
}

export default CategoryList
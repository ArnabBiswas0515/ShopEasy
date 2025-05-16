import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../Helpers/currencyDisplay'
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)

    const fetchData = async () => {
        const response = await fetch(SummaryApi.cartProductView.url,{
            method : SummaryApi.cartProductView.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            }
        })

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }
    }

    const handleLoading = async () => {
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[])

    // Increase Quantity 
    const increaseQty = async(id,qty) =>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                    quantity : qty + 1
                }
            )
        })

        const responseData = await response.json()


        if(responseData.success){
            fetchData()
        }
    }

// Decrease Quantity 
    const decraseQty = async(id,qty) =>{
       if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(
                    {   
                        _id : id,
                        quantity : qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if(responseData.success){
                fetchData()
            }
        }
    }

    // Delete Product From Cart 
    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                }
            )
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousValue,currentValue) => previousValue + currentValue.quantity ,0)

    const totalPrice = data.reduce((prev,curr) => prev + (curr.quantity * curr?.productId?.sellingPrice) ,0)

  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg py-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-sky-100 py-5'>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/* View Products in Cart  */}
            <div className='w-full max-w-5xl pl-8'>
                {
                    loading ? (
                        loadingCart.map((el,index) => {
                            return(
                                <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                            )
                        })
                        
                    ):(
                        data.map((product,index)=>{
                            return(
                                <div key={product?._id+"Add To Cart Loading"} className='w-full bg-sky-100 h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-300'>
                                        <img src={product?.productId?.productImage[0]} className=' w-full h-full object-scale-down mix-blend-multiply'/>
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        <div className='absolute  right-2 rounded-full text-red-500 p-2 hover:bg-red-600 hover:text-white transition-all cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}><MdDelete/></div>
                                        <h2 className='txt-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-500 font-medium text-lg italic'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-500 font-semibold text-lg italic'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-2'>
                                            <button className=' border border-slate-600 hover:bg-emerald-400 rounded w-6 h-6 flex justify-center items-center pb-1' onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
                                            <span>{product?.quantity}</span>
                                            <button className=' border border-slate-600 hover:bg-emerald-400 rounded w-6 h-6 flex justify-center items-center pb-1' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>

            {/* total price calculation */}
            <div className='mt-5 lg:mt-0 w-full py-2 max-w-sm mr-8'>
                {
                    loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse rounded'>
                            
                        </div>
                    ):(
                        <div className='flex flex-col h-36 bg-slate-200  rounded-sm'>
                            <h2 className='text-black bg-sky-400 px-4 p-2 rounded-t mb-2'>Total</h2>

                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>

                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Total Price</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                            </div>

                            <button className='bg-blue-600 p-2 mt-2 text-white w-full rounded-b'>
                                Buy Now
                            </button>
                        </div>
                    )
                }
            </div>
            
        </div>
    </div>
  )
}

export default Cart
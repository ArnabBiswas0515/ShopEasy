import React from 'react'
import { useState } from 'react'
import SummaryApi from '../common'
import { useEffect } from 'react'
import moment from 'moment'
import displayINRCurrency from '../Helpers/currencyDisplay'

const OrderPage = () => {

  const [data,setData] = useState([])

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url,{
      method : SummaryApi.getOrder.method,
      credentials : 'include'
    })

    const responseData = await response.json()

    setData(responseData.data)

    console.log("responseData",responseData)
  }

  useEffect(()=>{
    fetchOrderDetails()
  },[])

  return (
    <div>
      {
        !data[0] && (
          <p>No Orders Available</p>
        )
      }
      
      <div className='p-4 w-full'>
        {
          data.map((item,index)=>{
            return(
              <div key={item.userId+index}>
                <p className='font-medium text-lg'>
                  {moment(item.createdAt).format('LL')}
                </p>
                <div className='border rounded'>
                  <div className='flex flex-col lg:flex-row justify-between'>
                    <div className='grid gap-1 px-2 py-2'>
                      {
                        item?.productDetails.map((product,index)=>{
                          return(
                            <div key = {product.productId+index} className='flex gap-3 pr-10 bg-sky-100 border-slate-300 rounded'>
                              <img
                                src = {product.image[0]}
                                className='w-28 h-28 bg-slate-300 object-scale-down p-2 border-slate-300 rounded'
                              />
                              <div>
                                <div className='font-medium text-lg text-ellipsis line-clamp-1 py-1'>{product.name}</div>
                                <div className='flex items-center gap-5 mt-1'>
                                  <div className='text-lg text-cyan-500 italic'>{displayINRCurrency(product.price)}</div>
                                  <p className='italic'>Quantity : {product.quantity}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                      <div>
                        <div className='text-lg font-medium'>Payment Details : </div>
                        <p className='ml-1 italic'>Payment Method : {item.productDetails.payment_method_type}</p>
                        <p className='ml-1 italic'>Payment Status : {item.productDetails.payment_status}</p>
                      </div>
                      <div>
                        <div className='text-lg font-medium'>Shipping Details :</div>
                        {
                          item.shipping_options.map((shipping,index)=>{
                            return(
                              <div key={shipping.shipping_rate} className='ml-1 italic'>
                                Shipping Amount : {shipping.shipping_amount}
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                  <div className='font-semibold ml-auto w-fit lg:text-lg min-w-[290px]'>
                    Total Amount : {item.totalAmount}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OrderPage
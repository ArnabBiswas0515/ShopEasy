import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import ProductEdit from './ProductEdit';
import displayINRCurrency from '../Helpers/currencyDisplay';

const AdminProductCard = ({
    data,
    fetchdata
}) => {

  const [editProduct,setEditProduct] = useState(false)

  return (
    <div className='bg-sky-100 p-4 rounded'>
        <div className='w-40'>
          <div className='w-32 h-32 flex justify-center items-center'>
            <img src={data?.productImage[0]} className='mx-auto object-fill h-full mix-blend-multiply'/> 
          </div>
          <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

          <div>
            <p className='font-semibold italic'>
              {
                displayINRCurrency(data.sellingPrice)
              }
            </p>
            
            <div className='w-fit ml-auto p-2 hover:bg-emerald-500 hover:text-white rounded-full cursor-pointer bg-emerald-200' onClick={()=>setEditProduct(true)}>
              <MdEdit />
            </div>
          </div>

          
        </div>

        {
          editProduct && (
            <ProductEdit productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
          )
        }
        
    </div>
  )
}

export default AdminProductCard
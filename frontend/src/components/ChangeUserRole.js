import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoCloseOutline } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc
}) => {
    const [userRole,setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)

        console.log(e.target.value)
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
        })

        const responseData = await fetchResponse.json()

        if (responseData.success) {
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("Role Updated",responseData)
    }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 h-full w-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

            <button className='block ml-auto hover:bg-sky-200 rounded-full'onClick={onClose}>
                <IoCloseOutline />
            </button>

            <h1 className='pb-4 text-center text-lg font-medium'>Change User Role</h1>

            <p>Name : {name}</p>
            <p>Email : {email}</p>

            <div className=' flex items-center justify-between'>
                <p>Role : </p>

                <select className='border rounded-md px-24 py-1 my-2 flex' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(ROLE).map(el =>{
                            return(
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                </select>
            </div>

            <button className='w-fit mx-auto mt-3 block border py-1 px-3 rounded-full bg-sky-300 text-black hover:bg-sky-200' onClick={updateUserRole}>
                Change Role
            </button>
        </div>
    </div>
  )
}

export default ChangeUserRole
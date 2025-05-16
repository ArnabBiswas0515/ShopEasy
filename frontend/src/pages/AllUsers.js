import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { FaUserEdit } from 'react-icons/fa'
import ChangeUserRole from '../components/ChangeUserRole'

const AllUsers = () => {

    const [allUser,setAllUsers] = useState([])

    const [openUpdateRole,setOpenUpdateRole] = useState(false)

    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        _id : "",
        role : ""
    })

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    <div className='pb-4'>
        <table className='w-full userTable'>
            <thead>
                <tr>
                    <th>Sl.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className='bg-sky-100'>
                {
                    allUser.map((el,index)=>{
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('ll')}</td>
                                <td>
                                    <button 
                                        className='bg-purple-100 p-2 rounded-full cursor-pointer hover:bg-purple-300' 
                                        onClick={()=>{
                                            setUpdateUserDetails(el)
                                            setOpenUpdateRole(true)
                                        }}
                                    >
                                        <FaUserEdit />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

        {
            openUpdateRole && (
                <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )
        }

    </div>
  )
}

export default AllUsers
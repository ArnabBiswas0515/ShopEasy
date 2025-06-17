import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)

    const navigate = useNavigate()

    useEffect(()=>{
        if (user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div className='h-32 flex justify-center items-center flex-col'>
                <div className='text-6xl cursor-pointer relative flex justify-center'>
                    {
                        user?.profilepic ? (
                            <img src={user?.profilepic} className='w-20 h-20 rounded-full' alt={user?.name}/>
                        ) : (
                            <FaRegCircleUser />
                        )
                    }             
                </div>
                <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                <p className='italic text-sm'>{user?.role}</p>
            </div>

            {/* displaying all users on the sidebar */}
            <div>
                <nav className='grid p-4'>
                    <Link to={"all-users"} className='px-4 py-1 hover:bg-sky-200'>Users</Link>
                    <Link to={"all-products"} className='px-4 py-1 hover:bg-sky-200'>Products</Link>
                    <Link to={"admin-order"} className='px-4 py-1 hover:bg-sky-200'>Orders</Link>
                </nav>
            </div>
        </aside>

        <main className='w-full h-full p-4'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel
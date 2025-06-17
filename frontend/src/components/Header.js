import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';




const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const URLsearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLsearch.getAll("q")

    const [menuDisplay,setMenuDisplay] = useState(false)
    const [search,setSearch] = useState(searchQuery)

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url,{
            method : SummaryApi.logout_user.method,
            credentials : 'include'
        })

        const data = await fetchData.json()

        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
            navigate("/")
        }

        if (data.error) {
            toast.error(data.messsage)            
        }
    }

    const handleSearch = (e)=> {
        const { value } = e.target

        setSearch(value)

        if(value){
            navigate(`/search?q=${value}`)
        }else{
            navigate("/search")
        }
    }

    console.log("searchInput",searchInput?.search.split("=")[1])

  return (
    <header className='h-16 shadow-md bg-sky-100 fixed w-full z-40'>
        <div className= 'h-full container mx-auto flex items-center px-6 justify-between'>
            <div className=''>
                <Link to={"/"}>
                    <Logo w = {90} h = {70}/>
                </Link>
            </div>

            <div className='hidden lg:flex items-center w-full justify-between max-w-sm rounded-full border focus-within pl-3'>
                <input type='text' placeholder='Search...' className= 'w-full outline-none bg-sky-100 italic' onChange={handleSearch} value={search}/>
                <div className='text-lg min-w-[50px] h-8 bg-cyan-400 flex items-center justify-center rounded-r-full'>
                    <GrSearch/>
                </div>
            </div>

            <div className='flex items-center gap-6'>
                <div className='relative flex justify-center'>
                    {
                        user?._id && (
                            <div className='text-2xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                                {
                                    user?.profilepic ? (
                                        <img src={user?.profilepic} className='w-9 h-9 rounded-full' alt={user?.name}/>
                                    ) : (
                                        <FaRegCircleUser />
                                    )
                                }
                    
                            </div>
                        )
                    }
                    
                    {
                        menuDisplay && (
                            <div className='absolute bg-white bottom-0 top-11 h-fit p-3 shadow-lg rounded hidden md:block'>
                                <nav className='flex-col'>
                                    {
                                        user?.role === ROLE.ADMIN && (
                                            <Link to={"/admin-panel/all-products"} className='whitespace-nowrap  hover:bg-cyan-100 p-2 rounded-md' onClick={()=>setMenuDisplay(preve => !preve)}>
                                                Admin Panel
                                            </Link>
                                        )
                                    }

                                    <Link to={'/order'} className='whitespace-nowrap  hover:bg-cyan-100 p-2 rounded-md' onClick={()=>setMenuDisplay(preve => !preve)}>Orders</Link>
                                </nav>
                            </div>
                        )
                    }
                    
                </div>

                {
                    user?._id && (
                        <Link to={"/cart"} className='text-3xl relative'>
                            <span><FaOpencart /></span>
                            <div className='bg-cyan-600 text-white w-4 h-4 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-2 '>
                                <p className='text-xs'>{context?.cartProductCount}</p>
                            </div>
                        </Link>
                    )
                }

                <div>
                    {
                        user?._id ? (
                            <button onClick={handleLogout} className='bg-cyan-400 px-4 py-1 rounded-full text-black hover:bg-cyan-300 '>Logout</button>
                        ):(
                            <Link to={"/login"} className='bg-cyan-400 px-4 py-1 rounded-full text-black hover:bg-cyan-300 '>Login</Link>    
                        )
                    }
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header
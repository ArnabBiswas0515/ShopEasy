import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imgtobase64 from '../Helpers/imgtobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const [data,setData] = useState({
        name : "",
        email : "",
        password : "",
        confirmpassword : "",
        profilepic :""
    })

    const navigate = useNavigate()
  
    const handleonChange = (e) => {
      const { name, value } = e.target
  
      setData((preve) => {
        return{
          ...preve,
          [name] : value
        }
      })
    }
  
    const handleSubmit = async (e) =>{
      e.preventDefault()

      if(data.password === data.confirmpassword){
        const dataResponse = await fetch(SummaryApi.signUp.url,{
          method :SummaryApi.signUp.method,
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
  
        const dataApi = await dataResponse.json()

        if (dataApi.success) {
          toast.success(dataApi.message)
          navigate("/login")
        }

        if (dataApi.error) {
          toast.error(dataApi.message)
        }
  
      }else{
        toast.error("Password Don't Match")
      }

    }

    const handleProfilePicture = async(e) =>{
        const file = e.target.files[0]

        const imagePic = await imgtobase64(file)

        setData((preve)=>{
          return{
            ...preve,
            profilepic : imagePic
          }
        })
    }

  return (
    <section id = 'SignUp'>
      <div className='mx-auto container px-8 py-4'>
        
        <div className='bg-white p-4 w-full max-w-sm mx-auto'>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
              <div>
                <img src={data.profilepic || loginIcon} alt='login icons'/>
              </div>
              <form>
                <label>
                    <div className='text-xs bg-slate-200 bg-opacity-75 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                        Profile Picture
                    </div>
                    <input type='file' className='hidden' onChange={handleProfilePicture}/>
                </label>
              </form>
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='grid'>
                <label>Username :</label>
                <div className='bg-slate-100 p-2'>
                  <input 
                    type='text' 
                    placeholder='Enter Username'
                    name='name'
                    value={data.name}
                    onChange={handleonChange}
                    required
                    className='w-full h-full -py-2 outline-none bg-transparent'/>
                </div>
              </div>

              <div className='grid'>
                <label>Email Id :</label>
                <div className='bg-slate-100 p-2'>
                  <input 
                    type='email' 
                    placeholder='Enter Email'
                    name='email'
                    value={data.email}
                    onChange={handleonChange}
                    required
                    className='w-full h-full -py-2 outline-none bg-transparent'/>
                </div>
              </div>

              <div>
                <label>Password :</label>
                <div className='bg-slate-100 p-2 flex'>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder='Enter Password'
                    name='password'
                    value={data.password}
                    onChange={handleonChange} 
                    required
                    className='w-full h-full py-1 outline-none bg-transparent'/>
                  <div className='cursor-pointer text-xl px-1 py-1' onClick={()=>setShowPassword((preve)=>!preve)}>
                    <span>
                      {
                        showPassword ? (
                          <FaEyeSlash />
                        )
                        :
                        (
                          <FaEye />
                        )
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label>Confirm Password :</label>
                <div className='bg-slate-100 p-2 flex'>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder='Confirm Password'
                    name='confirmpassword'
                    value={data.confirmpassword}
                    onChange={handleonChange} 
                    required
                    className='w-full h-full py-1 outline-none bg-transparent'/>
                  <div className='cursor-pointer text-xl px-1 py-1' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                    <span>
                      {
                        showConfirmPassword ? (
                          <FaEyeSlash />
                        )
                        :
                        (
                          <FaEye />
                        )
                      }
                    </span>
                  </div>
                </div>
              </div>

              <button className='bg-cyan-400 text-black px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 hover:bg-cyan-300 transition-all mx-auto block mt-4'>Sign Up</button>
            </form>

            <p className='my-3 text-center'>
              Already have an account ? <Link to={"/login"} className='text-cyan-600 hover:text-cyan-400 hover:underline text-center'>Login</Link>
            </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
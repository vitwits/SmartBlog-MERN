import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import Sidebar from '../../components/admin/Sidebar'

const Layout = () => {

    const navigate = useNavigate()

    const logout = ()=> {
        navigate('/')
    }
  return (
    <>
        <div className='flex items-center justify-between py-5 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
            <img src={assets.logo} alt="log" className='w-32 sm:w-44 cursor-pointer' onClick={()=> navigate("/")} />
            <button onClick={logout} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Logout</button>
        </div>

        <div className='flex h-[calc(100vh-70px)]'>
            <Sidebar />
            <Outlet />

        </div>
    </>
  )
}

export default Layout
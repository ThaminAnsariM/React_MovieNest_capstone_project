import React from 'react'
import AdminNav from '../../component/Admin/AdminNav'
import AdminSidebar from '../../component/Admin/AdminSidebar'
import { Outlet } from 'react-router'


function Layout() {
  return (
    <>

    <AdminNav></AdminNav>
    <div className='flex'>
        <AdminSidebar></AdminSidebar>
        <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
            <Outlet/>
        </div>
    </div>
      
    </>
  )
}

export default Layout

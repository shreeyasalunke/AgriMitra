import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminRoute } from './AdminRoute'
import CustomerRoutes from './CustomerRoutes'

const Routers = () => {
  return (
   <Routes>
    <Route path='/admin/toolowners/*' element={<AdminRoute/>}></Route>
    <Route path='/*' element={<CustomerRoutes/>}></Route>
   </Routes>
   
  )
}

export default Routers
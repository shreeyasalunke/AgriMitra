import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Admin from '../../AdminComponent/Admin/Admin'

import CreateToolOwnerForm from '../../AdminComponent/CreateToolOwnerForm/CreateToolOwnerForm'
import { useSelector } from 'react-redux'
export const AdminRoute=()=>{
    const {toolowner} =useSelector((store)=>store)
    return(
        <div>
        <Routes>
            <Route path="/*" element={!toolowner.usersToolOwner ? <CreateToolOwnerForm/>  :<Admin />} />
        </Routes>

        </div>
    )
}
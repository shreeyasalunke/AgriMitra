import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Profile from '../Profile/Profile'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import ToolOwnerDetails from '../ToolOwner/ToolOwnerDetails'
import Cart from '../Cart/Cart'
import Auth from '../Auth/Auth'
import PaymentSuccess from '../PaymentSuccess/PaymentSuccess'
import SearchResult from '../searchResult/searchResult'
import Notification from '../Profile/Notification'
import AllToolsPage from '../Home/AllToolsPage'
import Footer from '../Home/Footer'

// import Auth from '../components/Auth/Auth'

function CustomerRoutes() {
  return (
    <div>
      <Navbar/>
      <Routes>
<Route  path='/' element={<Home/>} />
       <Route path='/account/:register' element={<Home/>} />
       
       <Route  path='/toolowner/:city/:title/:id'  element={<ToolOwnerDetails/>} />
       <Route path='/cart' element={<Cart/>}/>
       <Route path='/my-profile/*'  element={<Profile/>}/>
       <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>
       <Route path='/search' element={<SearchResult/>}/>
       
       <Route path='/*/notifications' element={<Notification/>}/>
       
       <Route path='/tools' element={<AllToolsPage/>}/>
       
       
       
       

      </Routes>
      <Footer/>
    
    </div>
  )
}

export default CustomerRoutes

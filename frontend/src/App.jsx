import React, { useEffect } from "react"

import CustomerRoutes from "./component/Routers/CustomerRoutes"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "./component/State/Authentication/Action"
import { findCart } from "./component/State/Cart/Action"
import Routers from "./component/Routers/Routers"
import { getToolOwnerByUserId } from "./component/State/Authentication/ToolOwner/Action"
// import Footer from "./component/Home/Footer"


function App() {
  const dispatch=useDispatch();
  const {auth}=useSelector((store)=>store)
  const jwt=localStorage.getItem("jwt")
  useEffect(()=>{
dispatch(getUser(auth.jwt || jwt))
dispatch(findCart(jwt))
  },[auth.jwt])


  useEffect(()=>{
dispatch(getToolOwnerByUserId(auth.jwt || jwt))
  },[auth.user])

  return (
    <>
    {/* <Navbar/> */}
    {/* <Home/> */}
     {/* <ToolOwnerDetails/> */}
     {/* <Cart/> */}
     {/* <ProfileNavigation/> */}
{/* <CustomerRoutes/> */}
<Routers/>
{/* <Footer/> */}
    </>
  )
}

export default App

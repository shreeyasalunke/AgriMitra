
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Button } from '@mui/material'
import { logout } from '../../component/State/Authentication/Action' // your logout action

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get user email from redux state (adjust path according to your state shape)
  const email = useSelector(state => state.auth?.user?.email)

  const handleLogout = () => {
    dispatch(logout())       // dispatch logout action
    navigate('/')            // redirect to home or login page
  }

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center justify-center">
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />
        <h1 className="py-5 text-2xl font-semibold">User Profile</h1>
        <p>Email: {email || "No Email Found"}</p>
        <Button onClick={handleLogout} sx={{ margin: "2rem 0rem" }}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default UserProfile

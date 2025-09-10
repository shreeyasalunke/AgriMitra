
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Modal } from '@mui/material';
import RegisterForm from './RegisterForm';
import LoginForm from '../Auth/LoginForm';

const Auth = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const handleOnClose=()=>{
        navigate('/')
    }
  return (
    <>
        <Modal onClose={handleOnClose} open={
        
            location.pathname==="/account/register"
            ||location.pathname==="/account/login"
        }>
<Box>
{
    location.pathname==="/account/register"?<RegisterForm/>:<LoginForm/>
}
</Box>
        </Modal>
    </>
  )
}

export default Auth
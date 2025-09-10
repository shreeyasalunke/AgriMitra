import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../State/Authentication/Action';
const initialValues = {
  fullName:"",
  email: '',
  password: '',
  role:"ROLE_CUSTOMER"
};

const RegisterForm = () => {
   const navigate = useNavigate();
   const dispatch=useDispatch();
   const handleSubmit = (values) => {
    console.log("Form data",values)
     dispatch(registerUser({userData:values,navigate}))
   };
  return (
     <div className="flex justify-center items-center min-h-screen px-4">
         <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 3, boxShadow: 4 }}>
           <CardContent>
             <Typography variant="h5" className="text-center mb-6">
               Register
             </Typography>
   
             <Formik onSubmit={handleSubmit} initialValues={initialValues}>
               <Form className="space-y-4">
                 <Field
                   as={TextField}
                   name="fullName"
                   label="full name"
                   fullWidth
                   variant="outlined"
                 />
                 <Field
                   as={TextField}
                   name="email"
                   label="Email"
                   fullWidth
                   variant="outlined"
                 />
                 <Field
                   as={TextField}
                   name="password"
                   label="Password"
                   type="password"
                   fullWidth
                   variant="outlined"
                 />
                 
    
      
        
        <Field
        fullWidth
        margin="normal"
          labelId="role-simple-select-label"
          id="role-simple-select"
          // value={age}
          label="Role"
          name="role"
          as={Select}
          // onChange={handleChange}
        >
          <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
          <MenuItem value={"ROLE_TOOL_OWNER"}>Tool Owner</MenuItem>
          
        </Field>
     
    
  

                 <Button
                   sx={{ mt: 2, py: 1.5 }}
                   fullWidth
                   type="submit"
                   variant="contained"
                 >
                  Register
                 </Button>
               </Form>
             </Formik>
   
             <Typography
               variant="body2"
               align="center"
               sx={{ mt: 3 }}
               className="text-gray-600"
             >
               if have an account  already?
               <Button
                 size="small"
                 onClick={() => navigate('/account/login')}
                 sx={{ textTransform: 'none', ml: 1 }}
               >
                 Login
               </Button>
             </Typography>
           </CardContent>
         </Card>
       </div>
  )
}

export default RegisterForm




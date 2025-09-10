

import { Button, TextField, Typography, Card, CardContent } from '@mui/material';
import { Form, Field, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../State/Authentication/Action';

const initialValues = {
  email: '',
  password: ''
};



const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleSubmit = (values) => {
    console.log("Sending Login Payload: ", values);

    dispatch(loginUser({userData:values,navigate}))
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" className="text-center mb-6">
            Login
          </Typography>

          <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <Form className="space-y-4">
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
              <Button
                sx={{ mt: 2, py: 1.5 }}
                fullWidth
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Form>
          </Formik>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
            className="text-gray-600"
          >
            Don&apos;t have an account?
            <Button
              size="small"
              onClick={() => navigate('/account/register')}
              sx={{ textTransform: 'none', ml: 1 }}
            >
              Register
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;

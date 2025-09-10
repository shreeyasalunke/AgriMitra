
import React from 'react';
import { Divider, Card, Button, Box, Grid, TextField } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Modal from '@mui/material/Modal';
import CartItem from './CartItem'; // Your component
import AddressCard from './AddressCard'; // Your component
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Orders/Action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: "none"
};

const initialValues = {
  streetAddress: '',
  state: '',
  pincode: '',
  city: ''
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string().required("Pincode is required"),
  city: Yup.string().required("City is required")
});

const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  // Get auth and cart from redux store
  const auth = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);
  const cartItems = cart?.cartItems || [];

  // Debug: check cartItems structure
  console.log("Cart items:", cartItems);

  // Calculate item total price
  const itemTotal = cartItems.reduce(
    (sum, item) => sum + (item.price ?? item.tool?.price ?? 0) * item.quantity,
    0
  );

  const deliveryFee = 20;
  const platformFee = 10;
  const gstCharges = 5;
  const totalPay = itemTotal + deliveryFee + platformFee + gstCharges;

  const handleOpenAddressModel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (values) => {
    // Take toolOwner id from first cart item
    const firstCartItem = cartItems.length > 0 ? cartItems[0] : null;

    // IMPORTANT: Access toolOwner with capital O (toolOwner)
    const toolownerId = firstCartItem?.tool?.toolOwner?.id;

    if (!toolownerId) {
      console.error("No toolOwnerId found in cart items");
      return;
    }

    const payload = {
      jwt: localStorage.getItem("jwt"),
      order: {
        toolownerId,
        deliveryAddress: {
          fullName: auth.user?.fullName || '',
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: "India",
        },
      },
    };

    dispatch(createOrder(payload));
    setOpen(false);
  };

  return (
    <>
      <main className='lg:flex justify-between'>
        {/* Left side - Cart Items */}
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10 px-5'>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />
          <div className='billDetails text-sm'>
            <p className='font-extralight py-5'>Bill Details</p>
            <div className='space-y-3'>
              <div className='flex justify-between text-gray-400'>
                <p>Item Total</p>
                <p>₹{itemTotal}</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>Delivery Fee</p><p>₹{deliveryFee}</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>Platform Fee</p><p>₹{platformFee}</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>GST Charges</p><p>₹{gstCharges}</p>
              </div>
              <Divider />
            </div>
            <div className='flex justify-between text-gray-400 font-semibold py-3'>
              <p>Total Pay</p><p>₹{totalPay}</p>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />

        {/* Right Side - Delivery Address Selection */}
        <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
          <div>
            <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
            <div className='flex gap-5 flex-wrap justify-center'>
              {/* Example address cards (replace with real addresses) */}
              {/* You can map user addresses here */}


              {auth.user?.addresses?.map((addr, index) => (
  <AddressCard
    key={index}
    item={{
      fullName: auth.user?.fullName,
      streetAddress: addr.streetAddress,
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      country: addr.country
    }}
    showButton={true}
    handleSelectAddress={() => console.log("Order created using selected address.")}
  />
))}

              {/* <AddressCard
                item={{
                  fullName: auth.user?.fullName,
                  streetAddress: item.streetAddress,
                  city: "Bhopal",
                  state: "MP",
                  postalCode: "462001",
                  country: "India"
                }}
                showButton={true}
                handleSelectAddress={() => console.log("Order created using selected address.")}
              /> */}
              {/* <Card className='flex gap-5 w-64 p-5 bg-gray-800 text-white cursor-pointer' onClick={handleOpenAddressModel}>
                <AddLocationAltIcon />
                <div className='space-y-3 text-gray-300'>
                  <h1 className='font-semibold text-lg text-white'>Add New Address</h1>
                  <Button variant="outlined" color="inherit">Add</Button>
                </div>
              </Card> */}


              <Card
  className="flex gap-4 w-64 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
  onClick={handleOpenAddressModel}
>
  <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full">
    <AddLocationAltIcon className="text-blue-500" />
  </div>
  
  <div className="flex flex-col justify-center space-y-2">
    <h1 className="font-semibold text-gray-800 text-lg">
      Add New Address
    </h1>
    <Button
      variant="contained"
      color="primary"
      size="small"
      className="normal-case"
    >
      Add
    </Button>
  </div>
</Card>

            </div>
          </div>
        </section>
      </main>

      {/* Modal Form to add new address */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={style}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="streetAddress" component="span" className="text-red-600" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="state" component="span" className="text-red-600" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="city" component="span" className="text-red-600" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="pincode" component="span" className="text-red-600" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" type="submit" color="primary">Deliver Here</Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;

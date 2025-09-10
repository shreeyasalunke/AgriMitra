// import React, { useState } from 'react'
// import {AddPhotoAlternate, Token} from '@mui/icons-material'
// import {Button, CircularProgress, Grid , IconButton, StepperContext, TextField} from '@mui/material'
// import {useFormik} from 'formik'
// import CloseIcon from '@mui/icons-material/Close';
// import { uploadImageToCloudnary } from '../util/UploadToCloudinary';
// import { useDispatch } from 'react-redux';
// import { createToolOwner } from '../../component/State/Authentication/ToolOwner/Action';

// // import { useDispatch } from 'react-redux';
// const initialValues={
//     name:"",
//      description:"",
//      streetAddress:"",
//       city:"",
//    stateProvince:"",
//      postalCode:"" ,
//      country:"",
//     email:"",
//     mobile:"",
//      twitter:"",
//    instagram:"",
//    openingHours:"Mon-Sun : 9:00 AM - 12:00 PM",
//    images:[]
   
  
   
   


// }

// const CreateToolOwnerForm = () => {
//      const [uploadImage,setUploadImage] = useState(false);
//          const dispatch = useDispatch()
//          const jwt= localStorage.getItem("jwt");
    
//         // const formik=useFormik({
//         //     initialValues,
//         //     onSumbit:(values)=>
//         //     {
//         //                   const data={
//         //                     name:values.name,
//         //                     description:values.description,
                            
//         //                     address:
                           
//         //                     {
//         //                         streetAddress:values.streetAddress,
//         //                         city:values.city,
//         //                         state:values.state,
//         //                         potalCode:values.potalCode,
//         //                         country:values.country,
    
//         //                     },
//         //                     contactInformation:
//         //                     {
//         //                         email:values.email,
//         //                     mobile:values.mobile,
//         //                     twitter:values.twitter,
//         //                     instagram:values.instagram,
//         //                     },
//         //                     openngHours:values.openingHours,
//         //                     images: values.images,
//         //                   };
//         //                   console.log("date --",data)
//         //                 //   dispatch(CreateAdmin({data,token:jwt}))
    
//         //     },
//         // });


//         const formik = useFormik({
//     initialValues,
//     onSubmit: (values) => {
//         const data = {
//             name: values.name,
//             description: values.description,
//             address: {
//                 streetAddress: values.streetAddress,
//                 city: values.city,
//                 // state: values.stateProvince,
//                  stateProvince: values.stateProvince,
//                 postalCode: values.postalCode,
//                 country: values.country,
//             },
//             contactInformation: {
//                 email: values.email,
//                 mobile: values.mobile,
//                 twitter: values.twitter,
//                 instagram: values.instagram,
//             },
//             openingHours: values.openingHours,
//             images: values.images,
//         };
//         console.log("data --", data);
//         console.log(JSON.stringify(data, null, 2)) 
//         dispatch(createToolOwner({data,token:jwt}))
//     },
// });

//        const handleImageChange = async (e) => {
//   const file = e.target.files[0];
//   setUploadImage(true);

//   const image = await uploadImageToCloudnary(file);
//   console.log("image ----", image);

//   formik.setFieldValue('images', [...formik.values.images, image]);
//   setUploadImage(false);
// };

//             const handleRemoveImage=(index)=>
//             {
    
//                 const updateImages=[...formik.values.images]
//                 updateImages.splice(index, 1);

//                 formik.setFieldValue("images",updateImages)
//             }
//   return (
//       <div className='py-10 lg:flex items-center justify-center min-h-screen'>
//                <div className='lg:max-w-4xl'>
//                 <h1 className='font-bold text-2xl text-center py-2'>
//                     Add New Owner
//                 </h1>
//                 <form
                
//                  onSubmit={formik.handleSubmit}
                 
//                   className='space-y-4'>
//                     <Grid conatiner spacing={2}>
//                         <Grid className='flex flex-wrap gap-5' item xs={12} >
//                          <input accept='image/*' id='fileInput' style={{display:"none"}} onChange={handleImageChange} type="file"/>
//                          <label  className= 'relative' htmlFor='fileInput'>
//                          <span className='w-24 h-24 cursor-pointer flex items-center justify p-3 border rounded-md borded-gray-600'>
//                             <AddPhotoAlternate  className="text-black "/>
//                          </span>
//                          {
//                             uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center'>
//                                 <CircularProgress/>
//                             </div>
//                          }
//                          </label>
//                          <div className='flex flex-wrap gap-2'>
//                             {formik.values.images.map((image,index)=><div classNmae="relative"> 
//                                 <img className='w-24 h-24 object-cover' key={index} src={image} alt="uploadimage"/>
//                                 <IconButton 
//                                 size='small'
//                                 sx={{
//                                     position:'absloute',
//                                     top:0,
//                                     right:0,
//                                     outline:"none"
//                                 }}
//                                 onClick={()=>handleRemoveImage(index)}
//                                 >
//                                     <CloseIcon sx={{fontsize:"1rem"}}>
    
//                                     </CloseIcon>
//                                 </IconButton>
    
//                             </div>)}
//                             </div>
    
                         
//                         </Grid>
//                       <Grid item xs={12}>
//                         <TextField fullWidth
//                         id="name"
//                         name="name"
//                         label="Name"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.name}
//                         >
    
//                         </TextField>
//                         </Grid> 
//                          <Grid item xs={12}>
//                         <TextField fullWidth
//                         id="description"
//                         name="description"
//                         label="Description"
//                         variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.description}>
    
//                         </TextField>
//                         </Grid>
//                          {/* <Grid item xs={12} lg={6}>
//                         <TextField fullWidth
//                         id="Category Tool"
//                         name="Category Tool"
//                         label="Category Tool"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.CategoryTool}>
    
//                         </TextField>
//                         </Grid>  */}
//                          <Grid item xs={12} lg={6}>
//                         <TextField fullWidth
//                         id="openingHours"
//                         name="openingHours"
//                         label="Opening Hours"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.openingHours}>
    
//                         </TextField>
//                         </Grid> 
//                          <Grid item xs={12}>
//                         <TextField fullWidth
//                         id="streetAddress"
//                         name="streetAddress"
//                         label="Street Address"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.streetAddress}>
    
//                         </TextField>
//                         </Grid> 
//                          <Grid item xs={12}>
//                         <TextField fullWidth
//                         id="city"
//                         name="city"
//                         label="City"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.city}>
    
//                         </TextField>
//                         </Grid>
//                          <Grid item xs={12} lg={4}>
//                         <TextField fullWidth
//                         id="stateProvince"
//                         name="stateProvince"
//                         label="StateProvince"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.stateProvince}>
    
//                         </TextField>
//                         </Grid> 
//                          <Grid item xs={12}>
//                         <TextField fullWidth
//                         id="postalCode"
//                         name="postalCode"
//                         label="PostalCode"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.postalCode}>
    
//                         </TextField>
//                         </Grid> 
//                          <Grid item xs={12} lg={4}>
//                         <TextField fullWidth
//                         id="country"
//                         name="country"
//                         label="Country"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.country}>
    
//                         </TextField>
//                         </Grid>  
//                          <Grid item xs={12} lg={6}>
//                         <TextField fullWidth
//                         id="email"
//                         name="email"
//                         label="Email"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.email}>
    
//                         </TextField>
//                         </Grid> 
//                          <Grid item xs={12} lg={6}>
//                         <TextField fullWidth
//                         id="mobile"
//                         name="mobile"
//                         label="Mobile"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.mobile}>
    
//                         </TextField>
//                         </Grid> 
//                          <Grid item xs={12} lg={6}>
//                         <TextField fullWidth
//                         id="instagram"
//                         name="instagram"
//                         label="Instagram"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.instagram}>
    
//                         </TextField>
//                         </Grid>  
//                          <Grid item xs={12} lg={6}>
//                         <TextField fullWidth
//                         id="twitter"
//                         name="twitter"
//                         label="Twitter"
//                        variant="outlined"
//                         onChange={formik.handleChange}
//                         value={formik.values.twitter}>
    
//                         </TextField>
//                         </Grid>  
                        
//                     </Grid>
                    
//                     <Button variant="contained" color="primary" type="submit">Create Owner</Button>
    
//                 </form>
//                 </div> 
             
    
//             </div>
//   )
// }

// export default CreateToolOwnerForm


import React, { useState } from 'react'
import { AddPhotoAlternate } from '@mui/icons-material'
import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material'
import { useFormik } from 'formik'
import CloseIcon from '@mui/icons-material/Close'
import { uploadImageToCloudnary } from '../util/UploadToCloudinary'
import { useDispatch } from 'react-redux'
import { createToolOwner } from '../../component/State/Authentication/ToolOwner/Action'

const initialValues = {
  name: '',
  description: '',
  streetAddress: '',
  city: '',
  stateProvince: '',
  postalCode: '',
  country: '',
  email: '',
  mobile: '',
  twitter: '',
  instagram: '',
  openingHours: 'Mon-Sun : 9:00 AM - 12:00 PM',
  images: []
}

const CreateToolOwnerForm = () => {
  const [uploadImage, setUploadImage] = useState(false)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          stateProvince: values.stateProvince,
          postalCode: values.postalCode,
          country: values.country
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram
        },
        openingHours: values.openingHours,
        images: values.images
      }
      console.log('data --', data)
      dispatch(createToolOwner({ data, token: jwt }))
    }
  })

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadImage(true)

    const image = await uploadImageToCloudnary(file)
    console.log('image ----', image)

    formik.setFieldValue('images', [...formik.values.images, image])
    setUploadImage(false)
  }

  const handleRemoveImage = (index) => {
    const updateImages = [...formik.values.images]
    updateImages.splice(index, 1)
    formik.setFieldValue('images', updateImages)
  }

  return (
    <div className="py-10 px-4 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="font-bold text-2xl text-center mb-6">Add New Owner</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <Grid container spacing={3}>
            {/* Image Upload */}
            <Grid item xs={12} className="flex flex-wrap gap-4 items-center">
              <input
                accept="image/*"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                type="file"
              />
              <label htmlFor="fileInput" className="relative cursor-pointer">
                <div className="w-24 h-24 flex items-center justify-center border rounded-md border-gray-400 hover:bg-gray-100 transition">
                  <AddPhotoAlternate className="text-gray-700" fontSize="large" />
                </div>
                {uploadImage && (
                  <div className="absolute inset-0 flex items-center justify-center w-24 h-24 bg-white bg-opacity-75 rounded-md">
                    <CircularProgress />
                  </div>
                )}
              </label>

              <div className="flex flex-wrap gap-3">
                {formik.values.images.map((image, index) => (
                  <div key={index} className="relative w-24 h-24 rounded overflow-hidden shadow-md">
                    <img
                      src={image}
                      alt={`upload-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,1)'
                        }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>

            {/* Text Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
                multiline
                minRows={3}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="stateProvince"
                name="stateProvince"
                label="State/Province"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.stateProvince}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Mobile"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} className="flex justify-center">
              <Button variant="contained" color="primary" type="submit" size="large">
                Create Owner
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  )
}

export default CreateToolOwnerForm

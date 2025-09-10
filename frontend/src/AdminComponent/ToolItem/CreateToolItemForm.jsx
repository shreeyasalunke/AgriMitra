import React, {  useState } from 'react'
import {AddPhotoAlternate} from '@mui/icons-material'
import {Button,FormControl, CircularProgress, Grid , IconButton, InputLabel, MenuItem, Select, StepperContext, TextField} from '@mui/material'
import {useFormik} from 'formik'
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudnary } from '../util/UploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { createToolItem } from '../../component/State/ToolItem/Action';


// import { useDispatch } from 'react-redux';
const initialValues={
    name:"",
     description:"",
     price:"",
    category:"",
    toolownerId:"",
   images:[]
   
  
   
   


}

const CreateToolItemForm = () => {
     const [uploadImage,setUploadImage] = useState(false);
         const dispatch = useDispatch()
         const jwt= localStorage.getItem("jwt");
         const {toolowner}=useSelector((store)=>store)
    
           

        const formik = useFormik({
    initialValues,
    // onSubmit: (values) => {
    //     values.toolownerId=2;
    //     dispatch(createToolItem({toolitem:values,jwt}))
    //     console.log("data --", values);
    // },
    onSubmit: (values) => {
  const payload = {
    name: values.name.trim(),
    description: values.description.trim(),
    price: Number(values.price),
    category: { id: values.category,name:values.name },

    // categoryId: values.category, // should already be an ID from the Select
    toolownerId: toolowner?.usersToolOwner?.id, // get from Redux store, not hardcoded
    images: values.images.filter(img => typeof img === "string" && img.startsWith("http"))
  };

  console.log("Final payload:", JSON.stringify(payload, null, 2));
  console.log("toolitems",toolowner)

  dispatch(createToolItem({ toolitem: payload, jwt }));
}

});

       const handleImageChange = async (e) => {
  const file = e.target.files[0];
  setUploadImage(true);

  const image = await uploadImageToCloudnary(file);
  console.log("image ----", image);

  formik.setFieldValue('images', [...formik.values.images, image]);
  setUploadImage(false);
};

            const handleRemoveImage=(index)=>
            {
    
                const updateImages=[...formik.values.images]
                updateImages.splice(index, 1);

                formik.setFieldValue("images",updateImages)
            }

           
  return (
      <div className='py-10 lg:flex items-center justify-center min-h-screen'>
               <div className='lg:max-w-4xl'>
                <h1 className='font-bold text-2xl text-center py-2'>
                    Add New Tool
                </h1>
                <form
                
                 onSubmit={formik.handleSubmit}
                 
                  className='space-y-4'>
                    <Grid conatiner spacing={2}>
                        <Grid className='flex flex-wrap gap-5' item xs={12} >
                         <input accept='image/*' id='fileInput' style={{display:"none"}} onChange={handleImageChange} type="file"/>
                         <label  className= 'relative' htmlFor='fileInput'>
                         <span className='w-24 h-24 cursor-pointer flex items-center justify p-3 border rounded-md borded-gray-600'>
                            <AddPhotoAlternate  className="text-black "/>
                         </span>
                         {
                            uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center'>
                                <CircularProgress/>
                            </div>
                         }
                         </label>
                         <div className='flex flex-wrap gap-2'>
                            {formik.values.images.map((image,index)=><div classNmae="relative"> 
                                <img className='w-24 h-24 object-cover' key={index} src={image} alt="uploadimage"/>
                                <IconButton 
                                size='small'
                                sx={{
                                    position:'absloute',
                                    top:0,
                                    right:0,
                                    outline:"none"
                                }}
                                onClick={()=>handleRemoveImage(index)}
                                >
                                    <CloseIcon sx={{fontsize:"1rem"}}>
    
                                    </CloseIcon>
                                </IconButton>
    
                            </div>)}
                            </div>
    
                         
                        </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth
                        id="name"
                        name="name"
                        label="Name"
                       variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        >
    
                        </TextField>
                        </Grid> 
                         <Grid item xs={12}>
                        <TextField fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.description}>
     
                        </TextField>
                        </Grid>
                         <Grid item xs={12} lg={6}>
                       <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Category
                        </InputLabel>
                        {/* <Select 
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={formik.values.category}
                        label="Category"
                        onChange={formik.handleChange}
                        name="category"
                        >
{toolowner.categories?.map((item)=><MenuItem value={item}>{item.name}</MenuItem>)
}

                        </Select> */}/


                        <Select
  labelId='demo-simple-select-label'
  id='demo-simple-select'
  value={formik.values.category}
  label="Category"
  onChange={formik.handleChange}
  name="category"
>
  {toolowner.categories?.map((item) => (
    <MenuItem key={item.id} value={item.id}>
      {item.name}
    </MenuItem>
  ))}
</Select>

                       </FormControl>
                        </Grid> 
                         <Grid item xs={12} lg={6}>
                        <TextField fullWidth
                        id="price"
                        name="price"
                        label="Price"
                       variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.price}>
    
                        </TextField>
                        </Grid> 
                         
                        
                         
                         
                         
                    </Grid>
                    
                    <Button variant="contained" color="primary" type="">Create ToolItem</Button>
    
                </form>
                </div> 
             
    
            </div>
  )
}

export default CreateToolItemForm
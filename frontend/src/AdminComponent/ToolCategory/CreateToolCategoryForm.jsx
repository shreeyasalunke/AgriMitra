import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
// import {AddPhotoAlternate} from '@mui/icons-material'
// import {CircularProgress, Grid , IconButton, StepperContext} from '@mui/material'
// import {useFormik} from 'formik'
// import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../component/State/Authentication/ToolOwner/Action';

const CreateToolCategoryForm = () => {
   const {toolowner} =useSelector((store)=> store)
   const  dispatch = useDispatch();
   // const jwt = localStorage.getItems("jwt")
    const [formData,setFormData] = useState({categoryName:"",toolownerId:""})
    const handleSubmit =(e)=>
    {   e.preventDefault();
        const data={
            name:formData.categoryName,
            toolownerId:
            {
            id: 1,
            },
        };
       dispatch(createCategoryAction({reqData:data,jwt:localStorage.getItem("jwt")}))
        console.log(data)

    }
    const handleInputChange =(e)=>
    {
        e.preventDefault();
        const {name,value}=e.target
        setFormData({
            ...formData,[name]:value

        })
    }
    return (
        <div className='' >
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>
<form  className='space-y-4' onSubmit={handleSubmit}>
    <TextField fullWidth
                    id="categoryName"
                    name="categoryName"
                    label="CategoryTool"
                    variant="outlined" 
                    onChange={handleInputChange}
                    value={formData.categoryName}/>

               
                    <Button varient="contained" type="Submit">
                        Create Category
                    </Button>
</form>
            </div>
            
        </div>
    )
}

export default CreateToolCategoryForm

// import { Divider, FormControlLabel, Grid, Radio, Typography } from '@mui/material'
// import React, { useState } from 'react'
// import LocationOnIcon from '@mui/icons-material/LocationOn' ;
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import { FormControl } from 'react-bootstrap';
// import { RadioGroup } from '@mui/material';

// const categories=[
//     "Tractor",
//     "Power tillers",
//     "Seeders",
//     "Harvesters",
//     "Sprayers",
//     "Ploughs"

// ]
// const ToolOwnerDetails = () => {
//     const[tool_category,setToolCategory]=useState("all");
//     const handleFilter=(e)=>{
//         console.log(e.target.value,e.target.name)
//     }
//   return (
//     <div className='px-5 lg:px-20'>
//         <section>
//             <h3>ToolOwnerDetails and Service</h3>
//             <div className='text-gray-500 py-2 mt-10'>
//                 <Grid container spacing={2}>
// <Grid item xs={12}>
// <img className='w-full h-[40vh] object-cover  ' src='https://i.pinimg.com/736x/95/58/c6/9558c6ed6831cc65c27bb3e926462eba.jpg' alt='img1'  />
// </Grid>
// <Grid item xs={12} lg={6} >
// <img className='w-full h-[40vh] object-cover  ' src='https://i.pinimg.com/736x/95/58/c6/9558c6ed6831cc65c27bb3e926462eba.jpg' alt='img1'  />
// </Grid>
// <Grid item xs={12} lg={6} >
// <img className='w-full h-[40vh] object-cover  ' src='https://i.pinimg.com/736x/95/58/c6/9558c6ed6831cc65c27bb3e926462eba.jpg' alt='img1'  />
// </Grid>
//                 </Grid>
//             </div>
//             <div className='pt-3 pb-5'>
//             <h1 className='text-4xl font-semibold'>Tools  </h1>
//             <div className='space-y-3 mt-3'>
//                <p className='text-gray-500 mt-1 '>
             
//              <span>
// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

//              </span>
//                 </p> 
//                 <p className='text-gray-500 flex items-center gap '>
//              <LocationOnIcon/>
//              <span>
// Pune,Maharashtra 

//              </span>
//                 </p> 
//                 <p className='text-gray-500 flex items-center gap '>
//              <CalendarTodayIcon/>
//              <span>
// Mon-Sun:9:00 PM(Today) 

//              </span>
//                 </p> 
//            </div>

//             </div>
//         </section>
//         <Divider/>
//         <section className='pt-[2rem] lg:flex relative'>
//         <div className='space-y-10 lg:w-[20%] filter'>
//           <div className='box space-y-5 lg:sticky top-28'>
// <div>
//     <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
// Tool Category
//     </Typography>
//     <FormControl className="py-10 space-y-5 " component={"fieldset"}>
//         <RadioGroup onChange={handleFilter} name="tool_category" value={tool_category} >
//         {
//             categories.map((item)=>(
//                 <FormControlLabel 
// key={item}
// value={item}
// control={<Radio/>}
// label={item}

//                 />
//             ))
//         }

//         </RadioGroup>
//     </FormControl>
// </div>
//           </div>

//         </div>
        
       


//         </section>
//     </div>
//   )
// }

// export default ToolOwnerDetails



import { Divider, FormControlLabel, Grid, Radio, Typography, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { FormControl } from '@mui/material';
import ToolCard from './ToolCard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getToolOwnerById, getToolOwnersCategory } from '../State/Authentication/ToolOwner/Action';
import { getToolItemsByToolOwnerId } from '../State/ToolItem/Action';


// const categories = [
//   "Tractor",
//   "Power tillers",
//   "Seeders",
//   "Harvesters",
//   "Sprayers",
//   "Ploughs"
// ];
// const toolItems=[1,1,1,1]
const ToolOwnerDetails = () => {
  const [tool_category, setCategory] = useState("");

   
    const dispatch=useDispatch()
    const jwt=localStorage.getItem("jwt")
    const {toolowner,toolitem} = useSelector(store=>store)
    const {id}=useParams();

  
  const handleFilter = (e,value) => {
    setCategory(e.target.value)
    console.log(e.target.value, e.target.name,value);
  };
console.log("toolowner",toolowner)
console.log("toolitem",toolitem)
useEffect(()=>{
dispatch(getToolOwnerById({jwt,toolownerId:id}))
dispatch(getToolOwnersCategory({jwt,toolownerId:id}))
dispatch(getToolItemsByToolOwnerId({jwt,toolownerId:id}))
},[])


useEffect(() => {
  console.log("Selected category:", tool_category);
  dispatch(getToolItemsByToolOwnerId({
    jwt, toolownerId: id,
    tool_category: tool_category,
  }));
}, [tool_category]);

return (
    <div className='px-5 lg:px-20'>
      <section>
        <h3>ToolOwnerDetails and Service</h3>
        <div className='text-gray-500 py-2 mt-10'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img className='w-full h-[40vh] object-cover' src={toolowner.toolowner?.images[0]} alt='img1' />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img className='w-full h-[40vh] object-cover' src={toolowner.toolowner?.images[1]} alt='img2' />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img className='w-full h-[40vh] object-cover' src={toolowner.toolowner?.images[2]} alt='img3' />
            </Grid>
          </Grid>
        </div>

        <div className='pt-3 pb-5'>
          <h1 className='text-4xl font-semibold'>{toolowner.toolowner?.name}</h1>
          <div className='space-y-3 mt-3'>
            <p className='text-gray-500 mt-1'>
              <span>
              {toolowner.toolowner?.description}
              </span>
            </p>
            <p className='text-gray-500 flex items-center gap-2'>
              <LocationOnIcon />
              <span>Pune, Maharashtra</span>
            </p>
            <p className='text-gray-500 flex items-center gap-2'>
              <CalendarTodayIcon />
              <span>Mon-Sun: 9:00 PM (Today)</span>
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <section className='pt-[2rem] lg:flex relative flex justify-between'>
        <div className='space-y-10 lg:w-[20%] filter'>
          <div className='box space-y-5 lg:sticky top-28'>
            <div>
              <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                Tool Category
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup onChange={handleFilter} name="tool_category" value={tool_category}>
                 {toolowner.categories.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))} 
                  

                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className='space-x-5 lg:w-[80%] '>
            {toolitem.toolItems.map((item)=>
            <ToolCard item={item}/>
            )}
        </div>
      </section>
    </div>
  );
};

export default ToolOwnerDetails;

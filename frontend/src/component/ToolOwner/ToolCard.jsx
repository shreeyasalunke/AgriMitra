// import React from 'react'
// import { Accordion,AccordionSummary ,AccordionDetails, Typography} from '@mui/material'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Button } from '@mui/material'; // ✅ MUI Button
// import { useDispatch } from 'react-redux';
// import { addItemToCart } from '../State/Cart/Action';


// const ToolCard = ({item}) => {
// const dispatch=useDispatch()
//   const handleAddItemToCart=(e)=>{
//     e.preventDefault()
//   const reqData=  {
//  token:localStorage.getItem("jwt"),
//     cartItem:{
// toolItemId:item.id,
// quantity:1,

//     },
//     };
//     dispatch(addItemToCart(reqData))
//     console.log("reqData",reqData)
   
//   };

  
//     return (
//          <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1-content"
//           id="panel1-header"
//         >
//             <div className='lg:flex items-center justify-between'>
//                 <div className="lg:flex items-center lg:gap-5">
//                     <img 
//                     className='w-[7rem] h-[7rem] object-cover'
//                     src={item.images[0]} alt=""/>
//                     <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
//                         <p className='font-semibold text-xl'>{item.name}</p>
//                         <p>{item.price}</p>
//                         <p className='text-gray-400'>{item.description}</p>
//                         <p className='text-red-400'>{item.available}</p>
//                     </div>

//                 </div>

//             </div>
//           <Typography component="span"></Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//          <div className='pt-5'>
//             <Button onClick={handleAddItemToCart} variant="contained " disable={false} type="Submit" >
//                  {true?"Add to Cart":"Out Of Stock"}
//             </Button>
//          </div>
//         </AccordionDetails>
//       </Accordion>
//     )
// }

// export default ToolCard

import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material'; 
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';

const ToolCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        toolItemId: item.id,
        quantity: 1,
      },
    };
    dispatch(addItemToCart(reqData));
    console.log("reqData", reqData);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className='lg:flex items-center justify-between'>
          <div className="lg:flex items-center lg:gap-5">
            <img
              className='w-[7rem] h-[7rem] object-cover'
              src={item.images[0]}
              alt={item.name}
            />
            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
              <p className='font-semibold text-xl'>{item.name}</p>
              <p>₹{item.price}</p>
              <p className='text-gray-400'>{item.description}</p>

              {/* ✅ Availability text */}
              <p className={item.available ? 'text-green-500' : 'text-red-500'}>
                {item.available ? "Available" : "Unavailable"}
              </p>
            </div>
          </div>
        </div>
        <Typography component="span"></Typography>
      </AccordionSummary>

      <AccordionDetails>
        <div className='pt-5'>
          {/* ✅ Agar available hai to Add to Cart dikhana, warna disabled */}
          <Button
            onClick={handleAddItemToCart}
            variant="contained"
            disabled={!item.available}
            type="submit"
          >
            {item.available ? "Add to Cart" : "Out Of Stock"}
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default ToolCard

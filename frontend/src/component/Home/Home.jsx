import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Bannner1 from '../../assets/Banner1.png';
import Banner2 from '../../assets/Banner2.png';
import Banner3 from '../../assets/Banner3.png';
import MultiitemsCarousel from './MultiItemCarousel';
import ToolOwnerCard from '../ToolOwner/ToolOwnerCard';
import Auth from '../Auth/Auth';
import { useDispatch, useSelector, } from 'react-redux';
import { getAllToolOwnersAction } from '../State/Authentication/ToolOwner/Action';

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeToolsPreview from './HomeToolsPreview ';

const toolowners=[1,1,1,1,1,1,1,1]
const Home = () => {
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt");
  const {toolowner}=useSelector(store=>store)
  const navigate=useNavigate()
  console.log("ToolOwner",toolowner);
  
  useEffect(() => {
  dispatch(getAllToolOwnersAction(jwt));
  
  
}, []);



  return (
    <div className="w-full flex flex-col items-center px-2 md:px-6 py-4 bg-white pb-10">
      <div className="w-full max-w-7xl">
        {/* Bootstrap Carousel */}
        <Carousel fade indicators={true} controls={true} interval={3000} pause="hover">
          <Carousel.Item>
            <img
              src={Bannner1}
              alt="slider1"
              className="w-full h-[220px] sm:h-[300px] md:h-[450px] lg:h-[550px] object-cover rounded-2xl"
            />
            <Carousel.Caption className="bg-opacity-40 rounded p-3">
              <h3 className="text-xl md:text-2xl font-semibold"></h3>
              <p className="text-sm md:text-base">
                
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              src={Banner2}
              alt="slider2"
              className="w-full h-[220px] sm:h-[300px] md:h-[450px] lg:h-[550px] object-cover rounded-2xl"
            />
            <Carousel.Caption className="bg-opacity-40 rounded p-3">
              <h3 className="text-xl md:text-2xl font-semibold"></h3>
              <p className="text-sm md:text-base">
                
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              src={Banner3}
              alt="slider3"
              className="w-full h-[220px] sm:h-[300px] md:h-[450px] lg:h-[550px] object-cover rounded-2xl"
            />
            <Carousel.Caption className="bg-opacity-40 rounded p-3">
              <h3 className="text-xl md:text-2xl font-semibold"></h3>
              <p className="text-sm md:text-base">
              
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>



      {/* Top Tools Section */}
      <section className="w-full max-w-7xl mt-8  ">
        <h2 className="text-2xl font-bold mb-4 ">Top Tools</h2>
        <MultiitemsCarousel />
      </section>
<section  className="w-full max-w-7xl mt-8  ">
  <HomeToolsPreview/>
</section>
      
      {/* <section className='px-5 lg:px-20 pt-5'>
       
      <h1 className='text-2xl font-semibold text-gray-400 pb-5 '>
        Our Trusted Tool Owners
      </h1>
       <div className='flex flex-wrap items-center justify-around gap-5'>
      {
  toolowner?.toolowners?.length > 0 ? (
    toolowner.toolowners.map((item) => (
      <ToolOwnerCard key={item.id} item={item} />
    ))
  ) : (
    <p className="text-gray-500">No tool owners found.</p>
  )
}

       </div>
      
      </section> */}


      <section className='px-5 lg:px-20 pt-5'>
  <h1 className='text-2xl font-semibold text-gray-400 pb-5 '>
    Our Trusted Tool Owners
  </h1>

  <div className='flex flex-wrap items-center justify-around gap-5'>
    {jwt ? (
      toolowner?.toolowners?.length > 0 ? (
        toolowner.toolowners.map((item) => (
          <ToolOwnerCard key={item.id} item={item} />
        ))
      ) : (
        <p className="text-gray-500">No tool owners available yet.</p>
      )
    ) : (
      <div className="flex flex-col items-center text-center">
        <p className="text-gray-600 mb-3">
          Please login to explore tool owner profiles
        </p>
        <button
          onClick={() => navigate("/account/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Owner Profiles
        </button>
      </div>
    )}
  </div>
</section>

      <Auth/>
    </div>
  );
};

export default Home;

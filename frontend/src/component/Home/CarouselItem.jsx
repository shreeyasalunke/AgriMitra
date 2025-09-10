

import React from 'react';

const CarouselItem = ({ image, title }) => {
  return (
    
    <div className="flex flex-col justify-center items-center ">
    
      <img
        className="w-[12rem] h-[10rem] lg:w-[16rem] lg:h-[12rem] rounded-xl object-cover object-center shadow-md hover:shadow-xl transition-shadow duration-300 "
        src={image}
        alt={title}
      />
      <span className="py-4 font-semibold text-xl text-gray-700">{title}</span>
    </div>
  );
};

export default CarouselItem;

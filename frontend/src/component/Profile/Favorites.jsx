
import React from 'react';
import ToolOwnerCard from '../ToolOwner/ToolOwnerCard';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const favorites = useSelector(store => store.auth.favorites); // ✅ lowercase

  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>
        My Favorites
      </h1>
      <div className='flex flex-wrap gap-4 justify-center'>
        {favorites?.length > 0 ? (
          favorites.map(item => (
            <ToolOwnerCard key={item.id} item={item} />
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;

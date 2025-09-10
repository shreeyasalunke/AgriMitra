

import React from 'react';
import { Button, Card } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card className="flex gap-5 w-64 p-5">
      <HomeIcon />
      <div className="space-y-3 text-gray-500">
        <h1 className="font-semibold text-lg text-white">
          {item?.fullName || 'Home'}
        </h1>
        <p>
          {item
            ? `${item.streetAddress || ''}, ${item.city || ''}, ${item.state || ''}, ${item.postalCode || ''}, ${item.country || ''}`
            : 'No address available'}
        </p>
        {showButton && (
          <Button
            variant="outlined"
            onClick={() => handleSelectAddress(item)}
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;

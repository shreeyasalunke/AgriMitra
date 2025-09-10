
import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = ({ item, order }) => {
  return (
    <Card className='flex justify-between items-center '>
      <div className='flex items-center space-x-5'>
        <img
          className='h-16 w-16'
          src={item.tool.images && item.tool.images.length > 0 ? item.tool.images[0] : '/default-image.png'}
          alt='image'
        />
        <div>
          <p>{item.tool.name}</p>
          <p>{item.totalPrice}</p>
        </div>
      </div>
      <div>
        <Button className='cursor-not-allowed'>{order.orderStatus}</Button>
      </div>
    </Card>
  )
}

export default OrderCard




import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrders } from '../State/Orders/Action'

const Orders = () => {
  const { auth, order } = useSelector((store) => store)
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch()

  useEffect(() => {
    if (jwt) {
      dispatch(getUsersOrders(jwt))
    }
  }, [jwt, dispatch])

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Order</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
        {order.orders && order.orders.length > 0 ? (
          order.orders.map((order) =>
            order.items.map((item) => (
              <OrderCard key={item.id} order={order} item={item} />
            ))
          )
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  )
}

export default Orders

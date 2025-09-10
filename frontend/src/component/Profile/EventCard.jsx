

import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const EventCard = ({ event }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        sx={{ height: 200, width: '100%', objectFit: 'cover' }}
        image={event.image || 'https://via.placeholder.com/345x200?text=No+Image'}
        alt={event.name || 'Event Image'}
      />
      <CardContent>
        <Typography variant="h5">{event.name}</Typography>
        <Typography>{event.description || ''}</Typography> {/* if you have a description */}
        <div className='py-2 space-y-2'>
          <p>{event.location}</p>
          <p className='text-sm text-blue-500'>{event.startedAt}</p>
          <p className='text-sm text-red-500'>{event.endsAt}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard

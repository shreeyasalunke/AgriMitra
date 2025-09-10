

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from './EventCard';
import { getToolOwnersEvents } from '../../component/State/Authentication/ToolOwner/Action';  // your thunk action

const Events = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  // Get the toolownerId from your usersToolOwner (assuming it's saved in redux)
  const toolowner = useSelector(state => state.toolowner.usersToolOwner);
  const events = useSelector(state => state.toolowner.toolownersEvents);

  // Fetch events on component mount or when toolowner changes
  useEffect(() => {
    if (toolowner && jwt) {
      dispatch(getToolOwnersEvents({ toolownerId: toolowner.id, jwt }));
    }
  }, [toolowner, jwt, dispatch]);

  if (!events || events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;

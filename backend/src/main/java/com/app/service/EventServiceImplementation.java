package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Exception.ToolOwnerException;
import com.app.model.Events;
import com.app.model.ToolOwner;
import com.app.repository.EventRepository;

@Service
public class EventServiceImplementation implements EventsService {

	@Autowired
	private EventRepository eventRepository;

	@Autowired
	private ToolOwnerService toolownerService;

	@Override
	public Events createEvent(Events event, Long toolownerId) throws ToolOwnerException {
		ToolOwner toolowner = toolownerService.findToolOwnerById(toolownerId);

		Events createdEvent = new Events();
		createdEvent.setToolOwner(toolowner);
		createdEvent.setImage(event.getImage());
		createdEvent.setStartedAt(event.getStartedAt());
		createdEvent.setEndsAt(event.getEndsAt());
		createdEvent.setLocation(event.getLocation());
		createdEvent.setName(event.getName());

		return eventRepository.save(createdEvent);
	}

	@Override
	public List<Events> findAllEvent() {
		// TODO Auto-generated method stub
		return eventRepository.findAll();
	}

	@Override
	public List<Events> findToolOwnersEvent(Long id) {
		// TODO Auto-generated method stub
		return eventRepository.findEventsByToolOwnerId(id);
	}

	@Override
	public void deleteEvent(Long id) throws Exception {
		Events event = findById(id);
		eventRepository.delete(event);

	}

	@Override
	public Events findById(Long id) throws Exception {
		Optional<Events> opt = eventRepository.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new Exception("event not found withy id " + id);

	}

}

package com.app.service;

import java.util.List;

import com.app.Exception.ToolOwnerException;
import com.app.model.Events;

public interface EventsService {

	public Events createEvent(Events event, Long toolownerId) throws ToolOwnerException;

	public List<Events> findAllEvent();

	public List<Events> findToolOwnersEvent(Long id);

	public void deleteEvent(Long id) throws Exception;

	public Events findById(Long id) throws Exception;

}

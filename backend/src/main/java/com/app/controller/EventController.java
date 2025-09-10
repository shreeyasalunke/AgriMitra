package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.Exception.ToolOwnerException;
import com.app.model.Events;
import com.app.response.ApiResponse;
import com.app.service.EventsService;

@RestController
@RequestMapping("/api")
public class EventController {

	@Autowired
	public EventsService eventService;

	@PostMapping("/admin/events/toolowner/{toolownerId}")
	public ResponseEntity<Events> createEvents(@RequestBody Events event, @PathVariable Long toolownerId)
			throws ToolOwnerException {
		Events createdEvents = eventService.createEvent(event, toolownerId);
		return new ResponseEntity<>(createdEvents, HttpStatus.ACCEPTED);
	}

	@GetMapping("/events")
	public ResponseEntity<List<Events>> findAllEvents() throws ToolOwnerException {
		List<Events> events = eventService.findAllEvent();
		return new ResponseEntity<>(events, HttpStatus.ACCEPTED);
	}

	@GetMapping("/admin/events/toolowner/{toolownerId}")
	public ResponseEntity<List<Events>> findToolOwnersEvents(@PathVariable Long toolownerId)
			throws ToolOwnerException {
		List<Events> events = eventService.findToolOwnersEvent(toolownerId);
		return new ResponseEntity<>(events, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/admin/events/{id}")
	public ResponseEntity<ApiResponse> deleteEvents(@PathVariable Long id) throws Exception {
		eventService.deleteEvent(id);
		ApiResponse res = new ApiResponse();
		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}

}

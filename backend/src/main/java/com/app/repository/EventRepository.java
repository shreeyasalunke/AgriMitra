package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.Events;

public interface EventRepository extends JpaRepository<Events, Long> {

	public List<Events> findEventsByToolOwnerId(Long id);
}

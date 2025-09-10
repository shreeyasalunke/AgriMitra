package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query("SELECT u FROM User u Where u.status='PENDING'")
	public List<User> getPenddingToolOwners();

	public User findByEmail(String username);

}

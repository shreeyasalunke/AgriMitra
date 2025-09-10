//package com.app.repository;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import com.app.model.ToolOwner;
//
//public interface ToolOwnerRepository extends JpaRepository<ToolOwner, Long> {
//
//	@Query("SELECT r FROM ToolOwner r WHERE lower(r.name) LIKE lower(concat('%', :query, '%')) OR lower(r.cuisineType) LIKE lower(concat('%', :query, '%'))")
//	List<ToolOwner> findBySearchQuery(String query);
//
//	ToolOwner findByOwnerId(Long userId);
//
//}
package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.model.ToolOwner;

public interface ToolOwnerRepository extends JpaRepository<ToolOwner, Long> {

	@Query("SELECT r FROM ToolOwner r WHERE lower(r.name) LIKE lower(concat('%', :query, '%'))")
	List<ToolOwner> findBySearchQuery(String query);

	ToolOwner findByOwnerId(Long userId);
}

package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	@Query("SELECT o FROM Order o WHERE o.customer.id = :userId")
	List<Order> findAllUserOrders(@Param("userId") Long userId);

	@Query("SELECT o FROM Order o WHERE o.toolOwner.id = :toolownerId")
	List<Order> findOrdersByToolOwnerId(@Param("toolownerId") Long toolownerId);
}

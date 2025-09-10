package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {



}

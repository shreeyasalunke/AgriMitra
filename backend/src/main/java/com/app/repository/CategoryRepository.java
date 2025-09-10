package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	public List<Category> findByToolOwnerId(Long id);
}

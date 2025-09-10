package com.app.service;

import java.util.List;

import com.app.Exception.ToolOwnerException;
import com.app.model.Category;

public interface CategoryService {

	public Category createCategory(String name, Long userId) throws ToolOwnerException;

	public List<Category> findCategoryByToolOwnerId(Long toolownerId) throws ToolOwnerException;

	public Category findCategoryById(Long id) throws ToolOwnerException;

}

package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Exception.ToolOwnerException;
import com.app.model.Category;
import com.app.model.ToolOwner;
import com.app.repository.CategoryRepository;

@Service
public class CategoryServiceImplementation implements CategoryService {

	@Autowired
	private ToolOwnerService toolOwnerService;

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Category createCategory(String name, Long userId) throws ToolOwnerException {
		ToolOwner toolOwner = toolOwnerService.getToolOwnersByUserId(userId);
		Category createdCategory = new Category();

		createdCategory.setName(name);
		createdCategory.setToolOwner(toolOwner);
		return categoryRepository.save(createdCategory);
	}

	@Override
	public List<Category> findCategoryByToolOwnerId(Long id) throws ToolOwnerException {
		ToolOwner toolOwner = toolOwnerService.findToolOwnerById(id);
		return categoryRepository.findByToolOwnerId(id);
	}

	@Override
	public Category findCategoryById(Long id) throws ToolOwnerException {
		Optional<Category> opt = categoryRepository.findById(id);

		if (opt.isEmpty()) {
			throw new ToolOwnerException("category not exist with id " + id);
		}

		return opt.get();
	}

}

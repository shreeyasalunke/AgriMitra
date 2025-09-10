package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.Exception.ToolOwnerException;
import com.app.Exception.UserException;
import com.app.model.Category;
import com.app.model.User;
import com.app.service.CategoryService;
import com.app.service.UserService;

@RestController
@RequestMapping("/api")
public class CategoryController {

	@Autowired
	public CategoryService categoryService;

	@Autowired
	public UserService userService;

	@PostMapping("/admin/category")
	public ResponseEntity<Category> createdCategory(@RequestHeader("Authorization") String jwt,
			@RequestBody Category category) throws ToolOwnerException, UserException {
		User user = userService.findUserProfileByJwt(jwt);

		Category createdCategory = categoryService.createCategory(category.getName(), user.getId());
		return new ResponseEntity<>(createdCategory, HttpStatus.OK);
	}

	@GetMapping("/category/toolowner/{id}")
	public ResponseEntity<List<Category>> getToolOwnersCategory(@PathVariable Long id,
			@RequestHeader("Authorization") String jwt) throws ToolOwnerException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		List<Category> categories = categoryService.findCategoryByToolOwnerId(id);
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}

}

package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.Exception.ToolException;
import com.app.Exception.ToolOwnerException;
import com.app.Exception.UserException;
import com.app.model.Tool;
import com.app.model.ToolOwner;
import com.app.model.User;
import com.app.request.CreateToolRequest;
import com.app.service.CategoryService;
import com.app.service.ToolService;
import com.app.service.ToolOwnerService;
import com.app.service.UserService;

@RestController
@RequestMapping("/api/admin/tool")
public class AdminMenuItemController {

	@Autowired
	private ToolService menuItemService;
	@Autowired
	private UserService userService;
	@Autowired
	private ToolOwnerService toolownerService;
	@Autowired
	private CategoryService categoryService;

	@PostMapping()
	public ResponseEntity<Tool> createItem(@RequestBody CreateToolRequest item,
			@RequestHeader("Authorization") String jwt) throws ToolException, UserException, ToolOwnerException {
		System.out.println("req-controller ----" + item);
		User user = userService.findUserProfileByJwt(jwt);
//		Category category=categoryService.findCategoryById(item.getCategoryId());
		ToolOwner toolowner = toolownerService.findToolOwnerById(item.getToolownerId());
		Tool menuItem = menuItemService.createTool(item, item.getCategory(), toolowner);
		return ResponseEntity.ok(menuItem);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteItem(@PathVariable Long id, @RequestHeader("Authorization") String jwt)
			throws UserException, ToolException {
		User user = userService.findUserProfileByJwt(jwt);

		menuItemService.deleteTool(id);
		return ResponseEntity.ok("Menu item deleted");

	}

	@GetMapping("/search")
	public ResponseEntity<List<Tool>> getMenuItemByName(@RequestParam String name) {
		List<Tool> menuItem = menuItemService.searchTool(name);
		return ResponseEntity.ok(menuItem);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Tool> updateAvilibilityStatus(@PathVariable Long id) throws ToolException {
		Tool menuItems = menuItemService.updateAvailibilityStatus(id);
		return ResponseEntity.ok(menuItems);
	}

}

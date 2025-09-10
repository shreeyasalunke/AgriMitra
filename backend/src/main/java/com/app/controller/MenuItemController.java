package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.Exception.ToolException;
import com.app.model.Tool;
import com.app.service.ToolService;
import com.app.service.UserService;

@RestController
@RequestMapping("/api/tool")
public class MenuItemController {
	@Autowired
	private ToolService toolcatalogService;

	@Autowired
	private UserService userService;

	@GetMapping("/search")
	public ResponseEntity<List<Tool>> searchTool(@RequestParam String name) {
		List<Tool> toolcatalog = toolcatalogService.searchTool(name);
		return ResponseEntity.ok(toolcatalog);
	}

	@GetMapping("/toolowner/{toolownerId}")
	public ResponseEntity<List<Tool>> getMenuItemByToolOwnerId(@PathVariable Long toolownerId,
		
			@RequestParam(required = false) String tool_category) throws ToolException {
		List<Tool> toolcatalogs = toolcatalogService.getToolOwnersTool(toolownerId, 
				tool_category);
		return ResponseEntity.ok(toolcatalogs);
	}
	
	
	@GetMapping("/all")
	public ResponseEntity<List<Tool>> getAllTools() throws ToolException {
	    List<Tool> tools = toolcatalogService.getAllTools();
	    return ResponseEntity.ok(tools);
	}


}

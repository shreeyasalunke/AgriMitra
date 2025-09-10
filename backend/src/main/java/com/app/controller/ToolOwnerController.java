package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.Exception.ToolOwnerException;
import com.app.Exception.UserException;
import com.app.dto.ToolDto;
import com.app.model.ToolOwner;
import com.app.model.User;
import com.app.service.ToolOwnerService;
import com.app.service.UserService;

@RestController
@RequestMapping("/api/toolowner")
public class ToolOwnerController {

	@Autowired
	private ToolOwnerService toolownerService;

	@Autowired
	private UserService userService;

	@GetMapping("/search")
	public ResponseEntity<List<ToolOwner>> findToolOwnerByName(@RequestParam String keyword) {
		List<ToolOwner> toolowner = toolownerService.searchToolOwner(keyword);

		return ResponseEntity.ok(toolowner);
	}

	@GetMapping()
	public ResponseEntity<List<ToolOwner>> getAllToolOwners() {

		List<ToolOwner> toolowner = toolownerService.getAllToolOwner();

		return ResponseEntity.ok(toolowner);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ToolOwner> findToolOwnerById(@PathVariable Long id) throws ToolOwnerException {

		ToolOwner toolowner = toolownerService.findToolOwnerById(id);
		return ResponseEntity.ok(toolowner);

	}

	@PutMapping("/{id}/add-favorites")
	public ResponseEntity<ToolDto> addToFavorite(@RequestHeader("Authorization") String jwt,
			@PathVariable Long id) throws ToolOwnerException, UserException {

		User user = userService.findUserProfileByJwt(jwt);
		ToolDto toolowner = toolownerService.addToFavorites(id, user);
		return ResponseEntity.ok(toolowner);

	}

}

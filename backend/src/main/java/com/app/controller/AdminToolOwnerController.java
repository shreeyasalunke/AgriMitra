package com.app.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.app.Exception.ToolOwnerException;
import com.app.Exception.UserException;
import com.app.model.ToolOwner;
import com.app.model.User;
import com.app.request.CreateToolOwnerRequest;
import com.app.response.ApiResponse;
import com.app.service.ToolOwnerService;
import com.app.service.UserService;

@RestController
@RequestMapping("/api/admin/toolowners")
public class AdminToolOwnerController {
	@Autowired
	private ToolOwnerService toolownerService;

	@Autowired
	private UserService userService;

	@PostMapping()
	public ResponseEntity<ToolOwner> createToolOwner(@RequestBody CreateToolOwnerRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException {

		User user = userService.findUserProfileByJwt(jwt);

		System.out.println("----TRUE___-----" + jwt);
		ToolOwner toolowner = toolownerService.createToolOwner(req, user);
		return ResponseEntity.ok(toolowner);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ToolOwner> updateToolOwner(@PathVariable Long id, @RequestBody CreateToolOwnerRequest req,
			@RequestHeader("Authorization") String jwt) throws ToolOwnerException, UserException {
		User user = userService.findUserProfileByJwt(jwt);

		ToolOwner toolowner = toolownerService.updateToolOwner(id, req);
		return ResponseEntity.ok(toolowner);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteToolOwnerById(@PathVariable("id") Long toolownerId,
			@RequestHeader("Authorization") String jwt) throws ToolOwnerException, UserException {
		User user = userService.findUserProfileByJwt(jwt);

		toolownerService.deleteToolOwner(toolownerId);

		ApiResponse res = new ApiResponse();
		return ResponseEntity.ok(res);
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<ToolOwner> updateStataurantStatus(@RequestHeader("Authorization") String jwt,
			@PathVariable Long id) throws ToolOwnerException, UserException {

		ToolOwner toolowner = toolownerService.updateToolOwnerStatus(id);
		return ResponseEntity.ok(toolowner);

	}

	@GetMapping("/user")
	public ResponseEntity<ToolOwner> findToolOwnerByUserId(@RequestHeader("Authorization") String jwt)
			throws ToolOwnerException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		ToolOwner toolowner = toolownerService.getToolOwnersByUserId(user.getId());
		return ResponseEntity.ok(toolowner);

	}

}

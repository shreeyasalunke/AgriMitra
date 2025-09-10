package com.app.service;

import java.util.List;

import com.app.Exception.ToolOwnerException;
import com.app.dto.ToolDto;
import com.app.model.ToolOwner;
import com.app.model.User;
import com.app.request.CreateToolOwnerRequest;

public interface ToolOwnerService {

	public ToolOwner createToolOwner(CreateToolOwnerRequest req, User user);

	public ToolOwner updateToolOwner(Long ToolOwnerId, CreateToolOwnerRequest updatedToolOwner)
			throws ToolOwnerException;

	public void deleteToolOwner(Long ToolOwnerId) throws ToolOwnerException;

	public List<ToolOwner> getAllToolOwner();

	public List<ToolOwner> searchToolOwner(String keyword);

	public ToolOwner findToolOwnerById(Long id) throws ToolOwnerException;

	public ToolOwner getToolOwnersByUserId(Long userId) throws ToolOwnerException;

	public ToolDto addToFavorites(Long ToolOwnerId, User user) throws ToolOwnerException;

	public ToolOwner updateToolOwnerStatus(Long id) throws ToolOwnerException;
}

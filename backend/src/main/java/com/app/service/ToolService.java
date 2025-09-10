package com.app.service;

import java.util.List;

import com.app.Exception.ToolException;
import com.app.Exception.ToolOwnerException;
import com.app.model.Category;
import com.app.model.Tool;
import com.app.model.ToolOwner;
import com.app.request.CreateToolRequest;

public interface ToolService {

	public Tool createTool(CreateToolRequest req, Category category, ToolOwner toolowner)
			throws ToolException, ToolOwnerException;

	void deleteTool(Long toolId) throws ToolException;

	public List<Tool> getToolOwnersTool(Long toolownerId,
			String toolCategory) throws ToolException;

	public List<Tool> searchTool(String keyword);

	public Tool findToolById(Long toolId) throws ToolException;

	public Tool updateAvailibilityStatus(Long toolId) throws ToolException;
	public List<Tool> getAllTools() throws ToolException;

}

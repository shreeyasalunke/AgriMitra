package com.app.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Exception.ToolException;
import com.app.Exception.ToolOwnerException;
import com.app.model.Category;
import com.app.model.Tool;
import com.app.model.ToolOwner;

import com.app.repository.ToolRepository;

import com.app.request.CreateToolRequest;

@Service
public class ToolServiceImplementation implements ToolService {
	@Autowired
	private ToolRepository toolRepository;

//	@Autowired
//	private RestaurantRepository toolownerRepository;

	

	

	@Override
	public Tool createTool(CreateToolRequest req, Category category, ToolOwner toolowner)
			throws ToolException, ToolOwnerException {

		Tool tool = new Tool();
		tool.setToolCategory(category);
		tool.setCreationDate(new Date());
		tool.setDescription(req.getDescription());
		tool.setImages(req.getImages());
		tool.setName(req.getName());
		tool.setPrice((long) req.getPrice());
		
		tool.setToolOwner(toolowner);
		tool = toolRepository.save(tool);

		toolowner.getTools().add(tool);
		return tool;

	}

	@Override
	public void deleteTool(Long toolId) throws ToolException {
		Tool tool = findToolById(toolId);
		tool.setToolOwner(null);
//		toolRepository.save(tool);
		toolRepository.delete(tool);

	}

	@Override
	public List<Tool> getToolOwnersTool(Long toolownerId,
			String toolCategory) throws ToolException {
		List<Tool> tools = toolRepository.findByToolOwnerId(toolownerId);

		
		if (toolCategory != null && !toolCategory.equals("")) {
			tools = filterByToolCategory(tools, toolCategory);
		}

		return tools;

	}

	

	private List<Tool> filterByToolCategory(List<Tool> tools, String toolCategory) {

		return tools.stream().filter(tool -> {
			if (tool.getToolCategory() != null) {
				return tool.getToolCategory().getName().equals(toolCategory);
			}
			return false; // Return true if tool category is null
		}).collect(Collectors.toList());
	}

//	@Override
//	public List<Tool> searchTool(String keyword) {
//		List<Tool> items = new ArrayList<>();
//
//		if (keyword != "") {
//			System.out.println("keyword -- " + keyword);
//			items = toolRepository.searchByNameOrCategory(keyword);
//		}
//
//		return items;
//	}
	
	@Override
	public List<Tool> searchTool(String keyword) {
	    if (keyword == null || keyword.trim().isEmpty()) {
	        return new ArrayList<>();
	    }
	    return toolRepository.searchByNameOrCategory(keyword.trim());
	}


	@Override
	public Tool updateAvailibilityStatus(Long id) throws ToolException {
		Tool tool = findToolById(id);

		tool.setAvailable(!tool.isAvailable());
		toolRepository.save(tool);
		return tool;
	}

	@Override
	public Tool findToolById(Long toolId) throws ToolException {
		Optional<Tool> tool = toolRepository.findById(toolId);
		if (tool.isPresent()) {
			return tool.get();
		}
		throw new ToolException("tool with id" + toolId + "not found");
	}
	
	@Override
	public List<Tool> getAllTools() {
	    return toolRepository.findAll();
	}


}

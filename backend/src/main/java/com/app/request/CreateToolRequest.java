package com.app.request;

import java.util.List;

import com.app.model.Category;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class CreateToolRequest {

	private String name;
	private String description;
	private Long price;

	private Category category;
	private List<String> images;

	private Long toolownerId;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public Long getToolownerId() {
		return toolownerId;
	}

	public void setToolownerId(Long toolownerId) {
		this.toolownerId = toolownerId;
	}

	



	
}

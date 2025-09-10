package com.app.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor

public class Tool {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String description;
	private Long price;

	@ManyToOne
	private Category toolCategory;

	@ElementCollection
	@Column(length = 1000)
	private List<String> images;

	private boolean available;

//    @JsonIgnore
	@ManyToOne
	private ToolOwner toolOwner;

	
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


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


	public Category getToolCategory() {
		return toolCategory;
	}


	public void setToolCategory(Category toolCategory) {
		this.toolCategory = toolCategory;
	}


	public List<String> getImages() {
		return images;
	}


	public void setImages(List<String> images) {
		this.images = images;
	}


	public boolean isAvailable() {
		return available;
	}


	public void setAvailable(boolean available) {
		this.available = available;
	}


	public ToolOwner getToolOwner() {
		return toolOwner;
	}


	public void setToolOwner(ToolOwner toolOwner) {
		this.toolOwner = toolOwner;
	}


	public Date getCreationDate() {
		return creationDate;
	}


	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	
	
}

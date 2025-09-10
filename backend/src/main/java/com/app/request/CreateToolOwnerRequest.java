package com.app.request;

import java.time.LocalDateTime;
import java.util.List;

import com.app.model.Address;
import com.app.model.ContactInformation;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class CreateToolOwnerRequest {

	private Long id;
	private String name;
	private String description;

	private Address address;
	private ContactInformation contactInformation;
	private String openingHours;
	private List<String> images;
	private LocalDateTime registrationDate;
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
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public ContactInformation getContactInformation() {
		return contactInformation;
	}
	public void setContactInformation(ContactInformation contactInformation) {
		this.contactInformation = contactInformation;
	}
	public String getOpeningHours() {
		return openingHours;
	}
	public void setOpeningHours(String openingHours) {
		this.openingHours = openingHours;
	}
	public List<String> getImages() {
		return images;
	}
	public void setImages(List<String> images) {
		this.images = images;
	}
	public LocalDateTime getRegistrationDate() {
		return registrationDate;
	}
	public void setRegistrationDate(LocalDateTime registrationDate) {
		this.registrationDate = registrationDate;
	}

}

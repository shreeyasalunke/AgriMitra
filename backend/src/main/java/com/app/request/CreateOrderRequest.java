package com.app.request;

import com.app.model.Address;

import jakarta.validation.constraints.NotNull;

public class CreateOrderRequest {
	 
	private Long toolownerId;
	 
	private Address deliveryAddress;

	public Long getToolownerId() {
		return toolownerId;
	}

	public void setToolownerId(Long toolownerId) {
		this.toolownerId = toolownerId;
	}

	public Address getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(Address deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	
}

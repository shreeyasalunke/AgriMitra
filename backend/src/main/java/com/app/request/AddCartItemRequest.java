package com.app.request;

import java.util.List;

public class AddCartItemRequest {

	private Long toolItemId;
	private int quantity;
	public Long getToolItemId() {
		return toolItemId;
	}
	public void setToolItemId(Long toolItemId) {
		this.toolItemId = toolItemId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	

	
}

package com.app.request;

public class ReviewRequest {

	private Long toolownerId;

	private double rating;

	private String reviewText;

	public Long getToolownerId() {
		return toolownerId;
	}

	public void setToolownerId(Long toolownerId) {
		this.toolownerId = toolownerId;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public String getReviewText() {
		return reviewText;
	}

	public void setReviewText(String reviewText) {
		this.reviewText = reviewText;
	}

	
	
}

package com.app.service;

import java.util.List;

import com.app.Exception.ReviewException;
import com.app.model.Review;
import com.app.model.User;
import com.app.request.ReviewRequest;

public interface ReviewSerive {

	public Review submitReview(ReviewRequest review, User user);

	public void deleteReview(Long reviewId) throws ReviewException;

	public double calculateAverageRating(List<Review> reviews);
}

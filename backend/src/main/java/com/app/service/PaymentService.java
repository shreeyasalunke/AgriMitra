package com.app.service;

import com.app.model.Order;
import com.app.model.PaymentResponse;
import com.stripe.exception.StripeException;

import lombok.Data;

@Data
public interface PaymentService {
	

	public PaymentResponse createPaymentLink(Order order) throws StripeException;

}

package com.app.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.app.model.Order;
import com.app.model.OrderItem;
import com.app.model.PaymentResponse;
import com.app.model.Tool;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentServiceImplementation implements PaymentService {

	@Value("${stripe.api.key}")

//	@Value("${frontend.url}")
	private String stripeSecretKey;

//	@Override
//	public PaymentResponse createPaymentLink(Order order) throws StripeException {
//
//		Stripe.apiKey = stripeSecretKey;
//
//		SessionCreateParams params = SessionCreateParams.builder()
//				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
//				.setMode(SessionCreateParams.Mode.PAYMENT)
//				.setSuccessUrl("https://localhost:5173/payment/success/" + order.getId())
//				.setCancelUrl(
//						"https://localhost:5173/payment/cancel")
//				.addLineItem(
//						SessionCreateParams.LineItem.builder().setQuantity(1L)
//								.setPriceData(
//										SessionCreateParams.LineItem.PriceData.builder().setCurrency("usd")
//												.setUnitAmount(order.getTotalAmount() * 100) // Specify the order amount
//																								// in cents
//												.setProductData(SessionCreateParams.LineItem.PriceData.ProductData
//														.builder().setName("pizza burger").build())
//												.build())
//								.build())
//				.build();
//
//		Session session = Session.create(params);
//
//		System.out.println("session _____ " + session);
//
//		PaymentResponse res = new PaymentResponse();
//		res.setPayment_url(session.getUrl());
//
//		return res;
//
//	}
//	@Override
//	public PaymentResponse createPaymentLink(Order order) throws StripeException {
//	    Stripe.apiKey = stripeSecretKey;
//
//	    SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
//	            .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
//	            .setMode(SessionCreateParams.Mode.PAYMENT)
//	            .setSuccessUrl("http://localhost:5173/payment/success/" + order.getId())
//	            .setCancelUrl("http://localhost:5173/payment/cancel");
//
//	    // Order ke items ko Stripe ke line items me convert karo
////	    for (OrderItem item : order.getItems()) {
////	        paramsBuilder.addLineItem(
////	                SessionCreateParams.LineItem.builder()
////	                        .setQuantity((long) item.getQuantity())
////	                        .setPriceData(
////	                                SessionCreateParams.LineItem.PriceData.builder()
////	                                        .setCurrency("usd")
////	                                        .setUnitAmount(item.getPrice() * 100) // cents me amount
////	                                        .setProductData(
////	                                                SessionCreateParams.LineItem.PriceData.ProductData
////	                                                        .builder()
////	                                                        .setName(item.getProductName()) // cart ka naam yaha set hoga
////	                                                        .build())
////	                                        .build())
////	                        .build());
////	    }
//	    
//	    for (OrderItem item : order.getItems()) {
//	        Tool tool = item.getTool(); // har orderItem ka tool nikalo
//
//	        paramsBuilder.addLineItem(
//	            SessionCreateParams.LineItem.builder()
//	                .setQuantity((long) item.getQuantity()) // order ki quantity
//	                .setPriceData(
//	                    SessionCreateParams.LineItem.PriceData.builder()
//	                        .setCurrency("inr")
//	                        .setUnitAmount(tool.getPrice() * 100) // price cents me bhejna zaroori hai
//	                        .setProductData(
//	                            SessionCreateParams.LineItem.PriceData.ProductData
//	                                .builder()
//	                                .setName(tool.getName()) // Tool ka naam
//	                                .build()
//	                        )
//	                        .build()
//	                )
//	                .build()
//	        );
//	    }
//
//
//	    Session session = Session.create(paramsBuilder.build());
//
//	    PaymentResponse res = new PaymentResponse();
//	    res.setPayment_url(session.getUrl());
//
//	    return res;
//	}
	
	@Override
	public PaymentResponse createPaymentLink(Order order) throws StripeException {
	    Stripe.apiKey = stripeSecretKey;

	    SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
	            .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
	            .setMode(SessionCreateParams.Mode.PAYMENT)
	            .setSuccessUrl("http://localhost:5173/payment/success/" + order.getId())
	            .setCancelUrl("http://localhost:5173/payment/cancel");

	    // ✅ Order items ko line items me convert karo
	    for (OrderItem item : order.getItems()) {
	        Tool tool = item.getTool();

	        paramsBuilder.addLineItem(
	            SessionCreateParams.LineItem.builder()
	                .setQuantity((long) item.getQuantity())
	                .setPriceData(
	                    SessionCreateParams.LineItem.PriceData.builder()
	                        .setCurrency("inr")
	                        .setUnitAmount((long) (tool.getPrice() * 100)) // ✅ Long me convert
	                        .setProductData(
	                            SessionCreateParams.LineItem.PriceData.ProductData
	                                .builder()
	                                .setName(tool.getName())
	                                .build()
	                        )
	                        .build()
	                )
	                .build()
	        );
	    }

	    Session session = Session.create(paramsBuilder.build());

	    PaymentResponse res = new PaymentResponse();
	    res.setPayment_url(session.getUrl());

	    return res;
	}


}

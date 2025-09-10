package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.Exception.CartException;
import com.app.Exception.OrderException;
import com.app.Exception.ToolOwnerException;
import com.app.Exception.UserException;
import com.app.model.Order;
import com.app.model.PaymentResponse;
import com.app.model.User;
import com.app.request.CreateOrderRequest;
import com.app.service.OrderService;
import com.app.service.PaymentService;
import com.app.service.UserService;
import com.stripe.exception.StripeException;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class OrderController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private UserService userService;
	
	

	@PostMapping("/order")
	public ResponseEntity<PaymentResponse> createOrder(@RequestBody CreateOrderRequest order,
			@RequestHeader("Authorization") String jwt) 
			throws UserException, ToolOwnerException, CartException, StripeException, OrderException {
		User user = userService.findUserProfileByJwt(jwt);
		System.out.println("req user " + user.getEmail());
		if (order != null) {
			PaymentResponse res = orderService.createOrder(order, user);
			return ResponseEntity.ok(res);

		} else {
			throw new OrderException("Please provide valid request body");
		}

	}

//	@GetMapping("/order/user")
//	public ResponseEntity<List<Order>> getAllUserOrders(@RequestHeader("Authorization") String jwt)
//			throws OrderException, UserException {
//
//		User user = userService.findUserProfileByJwt(jwt);
//
//		if (user.getId() != null) {
//			List<Order> userOrders = orderService.getUserOrders(user.getId());
//			return ResponseEntity.ok(userOrders);
//		} else {
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
//	}
	
	@GetMapping("/order/user")
	public ResponseEntity<List<Order>> getAllUserOrders(@RequestHeader("Authorization") String jwt)
	        throws OrderException, UserException {

	    User user = userService.findUserProfileByJwt(jwt);

	    System.out.println("User id in getAllUserOrders: " + user.getId());
	    List<Order> userOrders = orderService.getUserOrders(user.getId());
	    System.out.println("Orders count: " + (userOrders != null ? userOrders.size() : 0));

	    if (user.getId() != null) {
	        return ResponseEntity.ok(userOrders);
	    } else {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
	}


}

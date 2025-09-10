package com.app.service;

import java.util.List;

import com.app.Exception.CartException;
import com.app.Exception.OrderException;
import com.app.Exception.ToolOwnerException;
import com.app.Exception.UserException;
import com.app.model.Order;
import com.app.model.PaymentResponse;
import com.app.model.User;
import com.app.request.CreateOrderRequest;
import com.stripe.exception.StripeException;

public interface OrderService {

	public PaymentResponse createOrder(CreateOrderRequest order, User user)
			throws UserException, ToolOwnerException, CartException, StripeException;

	public Order updateOrder(Long orderId, String orderStatus) throws OrderException;

	public void cancelOrder(Long orderId) throws OrderException;

	public List<Order> getUserOrders(Long userId) throws OrderException;

	public List<Order> getOrdersOfToolOwner(Long ToolOwnerId, String orderStatus)
			throws OrderException, ToolOwnerException;

}

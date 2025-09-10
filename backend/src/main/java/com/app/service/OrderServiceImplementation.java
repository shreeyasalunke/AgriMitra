package com.app.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Exception.CartException;
import com.app.Exception.OrderException;
import com.app.Exception.ToolOwnerException;
import com.app.Exception.UserException;
import com.app.model.Address;
import com.app.model.Cart;
import com.app.model.CartItem;
import com.app.model.Notification;
import com.app.model.Order;
import com.app.model.OrderItem;
import com.app.model.Payment;
import com.app.model.PaymentResponse;
import com.app.model.ToolOwner;
import com.app.model.User;
import com.app.repository.AddressRepository;
import com.app.repository.OrderItemRepository;
import com.app.repository.OrderRepository;
import com.app.repository.PaymentRepository;
import com.app.repository.ToolOwnerRepository;
import com.app.repository.UserRepository;
import com.app.request.CreateOrderRequest;
import com.stripe.exception.StripeException;

@Service
public class OrderServiceImplementation implements OrderService {

	@Autowired
	private AddressRepository addressRepository;
	@Autowired
	private CartSerive cartService;
	@Autowired
	private OrderItemRepository orderItemRepository;
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private ToolOwnerRepository toolownerRepository;

	@Autowired
	private UserRepository userRepository;
@Autowired
private PaymentRepository paymentRepository;
	@Autowired
	private PaymentService paymentSerive;

	@Autowired
	private NotificationService notificationService;

	@Override
	public PaymentResponse createOrder(CreateOrderRequest order, User user)
			throws UserException, ToolOwnerException, CartException, StripeException {

		Address shippAddress = order.getDeliveryAddress();

		Address savedAddress = addressRepository.save(shippAddress);

		if (!user.getAddresses().contains(savedAddress)) {
			user.getAddresses().add(savedAddress);
		}

		System.out.println("user addresses --------------  " + user.getAddresses());

		userRepository.save(user);

		Optional<ToolOwner> toolowner = toolownerRepository.findById(order.getToolownerId());
		if (toolowner.isEmpty()) {
			throw new ToolOwnerException("ToolOwner not found with id " + order.getToolownerId());
		}

		Order createdOrder = new Order();

		createdOrder.setCustomer(user);
		createdOrder.setDeliveryAddress(savedAddress);
		createdOrder.setCreatedAt(new Date());
		createdOrder.setOrderStatus("PENDING");
		createdOrder.setToolOwner(toolowner.get());

		Cart cart = cartService.findCartByUserId(user.getId());

		List<OrderItem> orderItems = new ArrayList<>();

		for (CartItem cartItem : cart.getItems()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setTool(cartItem.getTool());
			
			orderItem.setQuantity(cartItem.getQuantity());
			orderItem.setTotalPrice(cartItem.getTool().getPrice() * cartItem.getQuantity());

			OrderItem savedOrderItem = orderItemRepository.save(orderItem);
			orderItems.add(savedOrderItem);
		}

		Long totalPrice = cartService.calculateCartTotals(cart);

		createdOrder.setTotalAmount(totalPrice);
		createdOrder.setToolOwner(toolowner.get());

		createdOrder.setItems(orderItems);
		Order savedOrder = orderRepository.save(createdOrder);

		toolowner.get().getOrders().add(savedOrder);

		toolownerRepository.save(toolowner.get());
		Payment payment = new Payment();
		payment.setOrder(savedOrder);
		payment.setPaymentMethod("CARD");
		payment.setPaymentStatus("PENDING");
		payment.setTotalAmount(savedOrder.getTotalAmount());
		payment.setCreatedAt(new Date());

		// pehle payment save karo
		Payment savedPayment = paymentRepository.save(payment);

		// fir order ke saath link karo
		savedOrder.setPayment(savedPayment);
		orderRepository.save(savedOrder);

		PaymentResponse res = paymentSerive.createPaymentLink(savedOrder);
		return res;

	}

	@Override
	public void cancelOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		if (order == null) {
			throw new OrderException("Order not found with the id " + orderId);
		}

		orderRepository.deleteById(orderId);

	}

	public Order findOrderById(Long orderId) throws OrderException {
		Optional<Order> order = orderRepository.findById(orderId);
		if (order.isPresent()) {
			return order.get();
		}

		throw new OrderException("Order not found with the id " + orderId);
	}

	@Override
	public List<Order> getUserOrders(Long userId) throws OrderException {
		List<Order> orders = orderRepository.findAllUserOrders(userId);
		return orders;
	}

	@Override
	public List<Order> getOrdersOfToolOwner(Long toolownerId, String orderStatus)
			throws OrderException, ToolOwnerException {

		List<Order> orders = orderRepository.findOrdersByToolOwnerId(toolownerId);

		if (orderStatus != null) {
			orders = orders.stream().filter(order -> order.getOrderStatus().equals(orderStatus))
					.collect(Collectors.toList());
		}

		return orders;
	}
//    private List<MenuItem> filterByVegetarian(List<MenuItem> menuItems, boolean isVegetarian) {
//    return menuItems.stream()
//            .filter(menuItem -> menuItem.isVegetarian() == isVegetarian)
//            .collect(Collectors.toList());
//}

	@Override
	public Order updateOrder(Long orderId, String orderStatus) throws OrderException {
		Order order = findOrderById(orderId);

		System.out.println("--------- " + orderStatus);

		if (orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") || orderStatus.equals("COMPLETED")
				|| orderStatus.equals("PENDING")) {
			order.setOrderStatus(orderStatus);
			Notification notification = notificationService.sendOrderStatusNotification(order);
			return orderRepository.save(order);
		} else {
			throw new OrderException("Please Select A Valid Order Status");
		}

	}

}

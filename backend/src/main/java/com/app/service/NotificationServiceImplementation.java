package com.app.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.model.Notification;
import com.app.model.Order;
import com.app.model.ToolOwner;
import com.app.model.User;
import com.app.repository.NotificationRepository;

@Service
public class NotificationServiceImplementation implements NotificationService {

	@Autowired
	private NotificationRepository notificationRepository;

	@Override
	public Notification sendOrderStatusNotification(Order order) {
		Notification notification = new Notification();
		notification.setMessage("your order is " + order.getOrderStatus() + " order id is - " + order.getId());
		notification.setCustomer(order.getCustomer());
		notification.setSentAt(new Date());

		return notificationRepository.save(notification);
	}

	@Override
	public void sendToolOwnerNotification(ToolOwner toolowner, String message) {
		// TODO Auto-generated method stub
		 Notification notification = new Notification();
		    notification.setToolOwner(toolowner);
		    notification.setMessage(message);
		    notification.setSentAt(new Date());
		    notification.setReadStatus(false);
		    notificationRepository.save(notification);

	}

	@Override
	public void sendPromotionalNotification(User user, String message) {
		// TODO Auto-generated method stub
		
		 Notification notification = new Notification();
		    notification.setCustomer(user);
		    notification.setMessage(message);
		    notification.setSentAt(new Date());
		    notification.setReadStatus(false);
		    notificationRepository.save(notification);

	}

	@Override
	public List<Notification> findUsersNotification(Long userId) {
		// TODO Auto-generated method stub
		return notificationRepository.findByCustomerId(userId);
	}

}

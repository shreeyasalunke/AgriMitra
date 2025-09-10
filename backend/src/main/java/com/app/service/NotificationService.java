package com.app.service;

import java.util.List;

import com.app.model.Notification;
import com.app.model.Order;
import com.app.model.ToolOwner;
import com.app.model.User;

public interface NotificationService {

	public Notification sendOrderStatusNotification(Order order);

	public void sendToolOwnerNotification(ToolOwner toolowner, String message);

	public void sendPromotionalNotification(User user, String message);

	public List<Notification> findUsersNotification(Long userId);

}

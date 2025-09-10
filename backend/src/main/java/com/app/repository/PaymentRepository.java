package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
//    Payment findByOrderId(Long orderId); // Optional helper method
	 Optional<Payment> findByOrderId(Long orderId);

}

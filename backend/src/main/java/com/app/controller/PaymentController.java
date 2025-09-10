//package com.app.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.app.service.PaymentService;
//
//@RestController
//@RequestMapping("/api")
//public class PaymentController {
//
//	@Autowired
//	private PaymentService paymentService;
//
////	@PostMapping("/{orderId}/payment")
////	public ResponseEntity<PaymentResponse> generatePaymentLink(@PathVariable Long orderId)
////			throws StripeException{
////
////		PaymentResponse res = paymentService.generatePaymentLink(orderId);
////
////		return new ResponseEntity<PaymentResponse>(res,HttpStatus.ACCEPTED);
////	}
//
//}
package com.app.controller;

import com.app.model.Payment;
import com.app.repository.PaymentRepository;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    // ✅ Stripe Webhook Endpoint
    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(HttpServletRequest request) {
        try {
            // Request body पढ़ो
            String payload = request.getReader().lines().collect(Collectors.joining());

            // Stripe का Event object बनाओ
            Event event = Event.GSON.fromJson(payload, Event.class);

            // अगर checkout session success हुआ
            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) event.getDataObjectDeserializer()
                        .getObject().orElseThrow();

                // Success URL से orderId निकालो
                String successUrl = session.getSuccessUrl();
                String orderId = successUrl.substring(successUrl.lastIndexOf("/") + 1);

                // Payment को DB में update करो
                Payment payment = paymentRepository.findByOrderId(Long.parseLong(orderId))
                        .orElseThrow(() -> new RuntimeException("Payment not found"));
                payment.setPaymentStatus("PAID");
                paymentRepository.save(payment);

                System.out.println("✅ Payment Success: Order " + orderId + " marked as PAID");
            }

            return ResponseEntity.ok("Event received");

        } catch (Exception e) {
            return ResponseEntity.status(400).body("Webhook error: " + e.getMessage());
        }
    }
}

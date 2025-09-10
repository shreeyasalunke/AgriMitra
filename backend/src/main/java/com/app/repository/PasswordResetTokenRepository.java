package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
	PasswordResetToken findByToken(String token);
}

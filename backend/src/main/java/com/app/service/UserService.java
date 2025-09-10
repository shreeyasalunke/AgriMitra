package com.app.service;

import java.util.List;

import com.app.Exception.UserException;
import com.app.model.User;

public interface UserService {

	public User findUserProfileByJwt(String jwt) throws UserException;

	public User findUserByEmail(String email) throws UserException;

	public List<User> findAllUsers();

	public List<User> getPenddingToolOwner();

	void updatePassword(User user, String newPassword);

	void sendPasswordResetEmail(User user);

}

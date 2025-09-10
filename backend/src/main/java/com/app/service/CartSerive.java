package com.app.service;

import com.app.Exception.CartException;
import com.app.Exception.CartItemException;
import com.app.Exception.ToolException;
import com.app.Exception.UserException;
import com.app.model.Cart;
import com.app.model.CartItem;
import com.app.request.AddCartItemRequest;

public interface CartSerive {

	public CartItem addItemToCart(AddCartItemRequest req, String jwt)
			throws UserException, ToolException, CartException, CartItemException;

	public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws CartItemException;

	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException;

	public Long calculateCartTotals(Cart cart) throws UserException;

	public Cart findCartById(Long id) throws CartException;

	public Cart findCartByUserId(Long userId) throws CartException, UserException;

	public Cart clearCart(Long userId) throws CartException, UserException;

}

package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Exception.CartException;
import com.app.Exception.CartItemException;
import com.app.Exception.ToolException;
import com.app.Exception.UserException;
import com.app.model.Cart;
import com.app.model.CartItem;
import com.app.model.Tool;
import com.app.model.User;
import com.app.repository.CartItemRepository;
import com.app.repository.CartRepository;
import com.app.repository.ToolRepository;
import com.app.request.AddCartItemRequest;

@Service
public class CartServiceImplementation implements CartSerive {
	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private CartItemRepository cartItemRepository;
	@Autowired
	private ToolRepository menuItemRepository;

	@Override
	public CartItem addItemToCart(AddCartItemRequest req, String jwt)
			throws UserException, ToolException, CartException, CartItemException {

		User user = userService.findUserProfileByJwt(jwt);

		Optional<Tool> menuItem = menuItemRepository.findById(req.getToolItemId());
		if (menuItem.isEmpty()) {
			throw new ToolException("Menu Item not exist with id " + req.getToolItemId());
		}

		Cart cart = findCartByUserId(user.getId());

		for (CartItem cartItem : cart.getItems()) {
			if (cartItem.getTool().equals(menuItem.get())) {

				int newQuantity = cartItem.getQuantity() + req.getQuantity();
				return updateCartItemQuantity(cartItem.getId(), newQuantity);
			}
		}

		CartItem newCartItem = new CartItem();
		newCartItem.setTool(menuItem.get());
		newCartItem.setQuantity(req.getQuantity());
		newCartItem.setCart(cart);
		
		newCartItem.setTotalPrice(req.getQuantity() * menuItem.get().getPrice());

		CartItem savedItem = cartItemRepository.save(newCartItem);
		cart.getItems().add(savedItem);
		cartRepository.save(cart);

		return savedItem;

	}

	@Override
	public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws CartItemException {
		Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);
		if (cartItem.isEmpty()) {
			throw new CartItemException("cart item not exist with id " + cartItemId);
		}
		cartItem.get().setQuantity(quantity);
		cartItem.get().setTotalPrice((cartItem.get().getTool().getPrice() * quantity));
		return cartItemRepository.save(cartItem.get());
	}

	@Override
	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException {

		User user = userService.findUserProfileByJwt(jwt);

		Cart cart = findCartByUserId(user.getId());

		Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);

		if (cartItem.isEmpty()) {
			throw new CartItemException("cart item not exist with id " + cartItemId);
		}

		cart.getItems().remove(cartItem.get());
		return cartRepository.save(cart);
	}

	@Override
	public Long calculateCartTotals(Cart cart) throws UserException {

		long total = 0L;
		for (CartItem cartItem : cart.getItems()) {
			total += cartItem.getTool().getPrice() * cartItem.getQuantity();
		}
		return total;
	}

	@Override
	public Cart findCartById(Long id) throws CartException {
		Optional<Cart> cart = cartRepository.findById(id);
		if (cart.isPresent()) {
			return cart.get();
		}
		throw new CartException("Cart not found with the id " + id);
	}

	@Override
	public Cart findCartByUserId(Long userId) throws CartException, UserException {

		Optional<Cart> opt = cartRepository.findByCustomer_Id(userId);

		if (opt.isPresent()) {
			return opt.get();
		}
		throw new CartException("cart not found");

	}

	@Override
	public Cart clearCart(Long userId) throws CartException, UserException {
		Cart cart = findCartByUserId(userId);

		cart.getItems().clear();
		return cartRepository.save(cart);
	}

}

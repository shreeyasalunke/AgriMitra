package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Exception.ToolOwnerException;
import com.app.dto.ToolDto;
import com.app.model.Address;
import com.app.model.ToolOwner;
import com.app.model.User;
import com.app.repository.AddressRepository;
import com.app.repository.ToolOwnerRepository;
import com.app.repository.UserRepository;
import com.app.request.CreateToolOwnerRequest;

@Service
public class ToolOwnerServiceImplementation implements ToolOwnerService {
	@Autowired
	private ToolOwnerRepository ToolOwnerRepository;
	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Override
	public ToolOwner createToolOwner(CreateToolOwnerRequest req, User user) {
		Address address = new Address();
		address.setCity(req.getAddress().getCity());
		address.setCountry(req.getAddress().getCountry());
		address.setFullName(req.getAddress().getFullName());
		address.setPostalCode(req.getAddress().getPostalCode());
		address.setState(req.getAddress().getState());
		address.setStreetAddress(req.getAddress().getStreetAddress());
		Address savedAddress = addressRepository.save(address);

		ToolOwner ToolOwner = new ToolOwner();

		ToolOwner.setAddress(savedAddress);
		ToolOwner.setContactInformation(req.getContactInformation());
	
		ToolOwner.setDescription(req.getDescription());
		ToolOwner.setImages(req.getImages());
		ToolOwner.setName(req.getName());
		ToolOwner.setOpeningHours(req.getOpeningHours());
		ToolOwner.setRegistrationDate(req.getRegistrationDate());
		ToolOwner.setOwner(user);
		ToolOwner savedToolOwner = ToolOwnerRepository.save(ToolOwner);

		return savedToolOwner;
	}

	@Override
	public ToolOwner updateToolOwner(Long ToolOwnerId, CreateToolOwnerRequest updatedReq)
			throws ToolOwnerException {
		ToolOwner ToolOwner = findToolOwnerById(ToolOwnerId);
	
		if (ToolOwner.getDescription() != null) {
			ToolOwner.setDescription(updatedReq.getDescription());
		}
		return ToolOwnerRepository.save(ToolOwner);
	}

	@Override
	public ToolOwner findToolOwnerById(Long ToolOwnerId) throws ToolOwnerException {
		Optional<ToolOwner> ToolOwner = ToolOwnerRepository.findById(ToolOwnerId);
		if (ToolOwner.isPresent()) {
			return ToolOwner.get();
		} else {
			throw new ToolOwnerException("ToolOwner with id " + ToolOwnerId + "not found");
		}
	}

	@Override
	public void deleteToolOwner(Long ToolOwnerId) throws ToolOwnerException {
		ToolOwner ToolOwner = findToolOwnerById(ToolOwnerId);
		if (ToolOwner != null) {
			ToolOwnerRepository.delete(ToolOwner);
			return;
		}
		throw new ToolOwnerException("ToolOwner with id " + ToolOwnerId + " Not found");

	}

	@Override
	public List<ToolOwner> getAllToolOwner() {
		return ToolOwnerRepository.findAll();
	}

	@Override
	public ToolOwner getToolOwnersByUserId(Long userId) throws ToolOwnerException {
		ToolOwner ToolOwners = ToolOwnerRepository.findByOwnerId(userId);
		return ToolOwners;
	}

	@Override
	public List<ToolOwner> searchToolOwner(String keyword) {
		return ToolOwnerRepository.findBySearchQuery(keyword);
	}

	@Override
	public ToolDto addToFavorites(Long ToolOwnerId, User user) throws ToolOwnerException {
		ToolOwner ToolOwner = findToolOwnerById(ToolOwnerId);

		ToolDto dto = new ToolDto();
		dto.setTitle(ToolOwner.getName());
		dto.setImages(ToolOwner.getImages());
		dto.setId(ToolOwner.getId());
		dto.setDescription(ToolOwner.getDescription());

		boolean isFavorited = false;
		List<ToolDto> favorites = user.getFavorites();
		for (ToolDto favorite : favorites) {
			if (favorite.getId().equals(ToolOwnerId)) {
				isFavorited = true;
				break;
			}
		}

		if (isFavorited) {
			favorites.removeIf(favorite -> favorite.getId().equals(ToolOwnerId));
		} else {
			favorites.add(dto);
		}

		User updatedUser = userRepository.save(user);
		return dto;
	}

	@Override
	public ToolOwner updateToolOwnerStatus(Long id) throws ToolOwnerException {
		ToolOwner ToolOwner = findToolOwnerById(id);
		ToolOwner.setOpen(!ToolOwner.isOpen());
		return ToolOwnerRepository.save(ToolOwner);
	}

}

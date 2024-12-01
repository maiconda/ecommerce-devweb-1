package com.educandoweb.course.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.educandoweb.course.entities.Bag;
import com.educandoweb.course.entities.Order;
import com.educandoweb.course.repositories.BagRepository;
import com.educandoweb.course.repositories.OrderRepository;
import com.educandoweb.course.repositories.UserRepository;
import com.educandoweb.course.services.exceptions.DatabaseException;
import com.educandoweb.course.services.exceptions.ResourceNotFoundException;

@Service
public class BagService {
	
	@Autowired
	UserRepository repository;
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	BagRepository bagRepository;
	
	public List<Order> getBag(@RequestBody JwtAuthenticationToken jwt) {
		var user = repository.findById(Long.parseLong(jwt.getName()));
		return user.get().getOrders();
	}
	
	public void save(Bag bag) {
		bagRepository.save(bag);
	}
	
	public Bag findById(Long id) {
		return bagRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id));
	}
	
	public void delete(Bag bag) {
		try {
			bagRepository.delete(bag);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(bag.getId());
		}
		catch(DataIntegrityViolationException e) {
			throw new DatabaseException(e.getMessage());
		}
	}
}

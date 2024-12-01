package com.educandoweb.course.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.educandoweb.course.entities.OrderItem;
import com.educandoweb.course.repositories.OrderItemRepository;

public class OrderItemService {
	
	@Autowired
	OrderItemRepository repository;
	
	public void save(OrderItem oI) {
		repository.save(oI);
	}
	
}

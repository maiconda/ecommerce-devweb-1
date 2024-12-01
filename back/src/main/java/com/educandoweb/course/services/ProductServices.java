package com.educandoweb.course.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.educandoweb.course.entities.Product;
import com.educandoweb.course.repositories.ProductRepository;
import com.educandoweb.course.services.exceptions.ResourceNotFoundException;

@Service
public class ProductServices {
	
	@Autowired
	private ProductRepository repository;
	
	public List<Product> findAll(){
		return repository.findAll();
	}
	
	public void save(Product product){
		repository.save(product);
	}
	
	
	public Product findById(Long id) {
		Optional<Product> obj = repository.findById(id); //meio q faz uma objetificada
		return obj.get();
	}
	
	public List<Product> findByString(String st) {
		List<Product> prods = repository.findAll();
		List<Product> prods2 = new ArrayList<>();
		for (Product p : prods) {
			if(p.getName().substring(0, st.length()).toLowerCase().equals(st.toLowerCase())) {
				prods2.add(p);
			}
		}
		
		if(!prods2.isEmpty()) {
			return prods2;
		} else {
			throw new ResourceNotFoundException("Not found");
		}
	}
}

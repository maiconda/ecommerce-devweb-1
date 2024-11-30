package com.educandoweb.course.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.educandoweb.course.entities.Category;
import com.educandoweb.course.entities.Product;
import com.educandoweb.course.repositories.CategoryRepository;

@Service
public class CategoryServices {
	
	@Autowired
	private CategoryRepository repository;
	
	public List<Category> findAll(){
		return repository.findAll();
	}
	
	public Category findById(Long id) {
		Optional<Category> obj = repository.findById(id); //meio q faz uma objetificada
		return obj.get();
	}
	
	public Set<Product> findByProductsById(Long categoryId) {
		Optional<Category> obj = repository.findById(categoryId); //meio q faz uma objetificada
		return obj.get().getProducts();
	}
	
	public void create(Category category) {
		repository.save(category);
	}
}

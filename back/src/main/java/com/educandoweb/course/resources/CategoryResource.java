package com.educandoweb.course.resources;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.educandoweb.course.entities.Category;
import com.educandoweb.course.entities.Product;
import com.educandoweb.course.resources.dto.CreateCatDTO;
import com.educandoweb.course.resources.dto.EditCategory;
import com.educandoweb.course.services.CategoryServices;

@RestController
@RequestMapping(value = "/categories")
public class CategoryResource {

	@Autowired
	private CategoryServices service;

	@GetMapping
	public ResponseEntity<List<Category>> findAll() {
		List<Category> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}") // passa na url o valor do id do usuário e adiciona um parâmetro
	public ResponseEntity<Category> findById(@PathVariable Long id) { // para o spring aceitar a variável q será colocada na url
		Category obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "products/{id}") // passa na url o valor do id do usuário e adiciona um parâmetro
	public ResponseEntity<Set<Product>> findProductsById(@PathVariable Long id) { // para o spring aceitar a variável q será colocada na url
		Set<Product> obj = service.findByProductsById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	
	@PostMapping
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	public ResponseEntity<Void> create(@RequestBody CreateCatDTO cat){
		Category category = new Category(null, cat.name(), cat.image());
		service.create(category);
		return null;
	}
	
	@PostMapping(value = "/img")
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	public ResponseEntity<Void> changeImg(@RequestBody EditCategory cat){
		Category category = service.findById(cat.id());
		category.setImgUrl(cat.imgUrl());
		service.create(category);
		return null;
	}
	
	
}

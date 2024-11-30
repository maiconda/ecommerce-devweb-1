package com.educandoweb.course.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.educandoweb.course.entities.Product;
import com.educandoweb.course.resources.dto.ProductString;
import com.educandoweb.course.services.ProductServices;

@RestController
@RequestMapping(value = "/products")
public class ProductResource {

	@Autowired
	private ProductServices service;

	@GetMapping
	public ResponseEntity<List<Product>> findAll() {
		List<Product> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}") // passa na url o valor do id do usuário e adiciona um parâmetro
	public ResponseEntity<Product> findById(@PathVariable Long id) { // para o spring aceitar a variável q será colocada na url
		Product obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/search") // passa na url o valor do id do usuário e adiciona um parâmetro
	public ResponseEntity<List<Product>> findProductsByString(@RequestBody ProductString st) { // para o spring aceitar a variável q será colocada na url
		List<Product> prod = service.findByString(st.st());
		return ResponseEntity.ok().body(prod);
	}
	
	@PostMapping// passa na url o valor do id do usuário e adiciona um parâmetro
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	public ResponseEntity<Void> create(@RequestBody Product product) { // para o spring aceitar a variável q será colocada na url
		service.save(product);
		return null;
	}
}

package com.educandoweb.course.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.educandoweb.course.entities.User;
import com.educandoweb.course.entities.factory.UserFactory;
import com.educandoweb.course.resources.dto.CreateUserDTO;
import com.educandoweb.course.services.RoleService;
import com.educandoweb.course.services.UserServices;

@RestController
@RequestMapping(value = "/users")
@Import(RoleService.class)
public class UserResource {
	
	@Autowired
	private UserServices service;
	
//	@Autowired
//	private RoleService roleService;
//	
//	@Autowired
//	private PasswordEncoder encoder;
	
	@Autowired
	private UserFactory factory;
	
	@GetMapping
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	public ResponseEntity<List<User>> findAll(){
		List<User> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}") // passa na url o valor do id do usuário e adiciona um parâmetro
	public ResponseEntity<User> findById(@PathVariable Long id){ //para o spring aceitar a variável q será colocada na url
		User obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
//	@PostMapping //post é para inserir , get é para pegar
//	public ResponseEntity<User> insert(@RequestBody User obj){
//		var role = roleService.findByName(Role.Values.USER.name());
//		obj.setPassword(encoder.encode(obj.getPassword()));
//		obj.setRoles(Set.of(role));
//		obj = service.insert(obj);
//		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
//				buildAndExpand(obj.getId()).toUri();
//		return ResponseEntity.created(uri).body(obj);
//	}
	
	@PostMapping
	public ResponseEntity<Void> newUser(@RequestBody CreateUserDTO dto){
//		var role = roleService.findByName(Role.Values.USER.name());
		var userFound = service.findByUsernameCreation(dto.username());
		if(userFound != null) {
			throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
		}
		User user = factory.crateUser(null, dto.name(), dto.email(), dto.phone(), dto.username(), dto.password(), dto.img());
		service.insert(user);
		return ResponseEntity.ok().build();

	}
	
	@PostMapping(value = "/newAdmin")
	@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
	public ResponseEntity<Void> newAdmin(@RequestBody CreateUserDTO dto){
		var userFound = service.findByUsernameCreation(dto.username());
		if(userFound != null) {
			throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
		}
		User user = factory.crateAdmin(null, dto.name(), dto.email(), dto.phone(), dto.username(), dto.password(), dto.img());
		service.insert(user);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete (@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@PutMapping (value = "/{id}")
	public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User obj){
		obj = service.update(id, obj);
		return ResponseEntity.ok().body(obj);
		
	}
	
}

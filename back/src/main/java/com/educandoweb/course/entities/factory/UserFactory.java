package com.educandoweb.course.entities.factory;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.educandoweb.course.entities.Role;
import com.educandoweb.course.entities.User;
import com.educandoweb.course.repositories.RoleRepository;

public class UserFactory {
	
	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private RoleRepository repository;

	public User crateAdmin(Long id, String name, String email, String phone, String username, String password) {
		User user = new User(id, name, email, phone, username, encoder.encode(password));
		var admin = repository.findByName(Role.Values.ADMIN.name());
		user.setRolesOptional(Set.of(admin));
		return user;
	}
	
	public User crateAdmin(Long id, String name, String email, String phone, String username, String password, String img) {
		User user = new User(id, name, email, phone, username, img, encoder.encode(password));
		var admin = repository.findByName(Role.Values.ADMIN.name());
		user.setRolesOptional(Set.of(admin));
		return user;
	}

	public User crateUser(Long id, String name, String email, String phone, String username, String password) {
		User user = new User(id, name, email, phone, username, encoder.encode(password));
		var userRole = repository.findByName(Role.Values.USER.name());
		user.setRolesOptional(Set.of(userRole));
		return user;
	}
	
	public User crateUser(Long id, String name, String email, String phone, String username, String password, String img) {
		User user = new User(id, name, email, phone, username, img, encoder.encode(password));
		var userRole = repository.findByName(Role.Values.USER.name());
		user.setRolesOptional(Set.of(userRole));
		return user;
	}
}
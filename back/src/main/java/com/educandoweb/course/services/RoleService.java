package com.educandoweb.course.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.educandoweb.course.entities.Role;
import com.educandoweb.course.repositories.RoleRepository;

public class RoleService {
	
	@Autowired
	RoleRepository repository;
	
	public List<Role> findAll(){
		return repository.findAll();
	}
	
	public Role findById(Long id) {
		Optional<Role> obj = repository.findById(id); //meio q faz uma objetificada
		return obj.get();
	}
	
	public Role findByName(String name) {
		Optional<Role> obj = repository.findByName(name);
		return obj.get();
	}
}

//package com.educandoweb.course.services;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import com.educandoweb.course.entities.User;
//import com.educandoweb.course.repositories.UserRepository;
//import com.educandoweb.course.services.exceptions.ResourceNotFoundException;
//
//public class UserDetailsServiceImpl implements UserDetailsService{
//	
//	@Autowired
//	UserRepository repository;
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		User user = repository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException(username));
//		return user;
//	}
//
//}

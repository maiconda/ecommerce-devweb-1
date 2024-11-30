package com.educandoweb.course.resources;

import java.time.Instant;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.educandoweb.course.entities.Role;
import com.educandoweb.course.repositories.UserRepository;
import com.educandoweb.course.resources.dto.LoginRequest;
import com.educandoweb.course.resources.dto.LoginResponse;

@RestController
public class TokenResource {

	private final JwtEncoder jwtEncoder;
	
	private final UserRepository repository;
	
	private final BCryptPasswordEncoder passwordEncoder;
	
	public TokenResource(JwtEncoder jwtEncoder, UserRepository repository, BCryptPasswordEncoder passwordEncoder) {
		this.jwtEncoder = jwtEncoder;
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
		var user = repository.findByUsername(loginRequest.username());
		
		if(user.isEmpty() || !user.get().isLoginCorrect(loginRequest, passwordEncoder)) {
			throw new BadCredentialsException("Credential error. Wrong username or password");
		}
		
		Instant now = Instant.now();
		Long expiresIn = 300L;
		
		var scope = user.get().getRoles().stream().map(Role::getName).collect(Collectors.joining(" "));
		
		var claim = JwtClaimsSet.builder()
				.issuer("backend")
				.subject(user.get().getId().toString())
				.issuedAt(now)
				.expiresAt(now.plusSeconds(expiresIn))
				.claim("scope", scope)
				.build();
		
		var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claim)).getTokenValue();

		return ResponseEntity.ok(new LoginResponse(jwtValue, expiresIn, user.get()));
	}
}

package com.educandoweb.course.config;

import java.time.Instant;
import java.util.Arrays;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.educandoweb.course.config.security.WebSecurityConfig;
import com.educandoweb.course.entities.Category;
import com.educandoweb.course.entities.Order;
import com.educandoweb.course.entities.OrderItem;
import com.educandoweb.course.entities.Payment;
import com.educandoweb.course.entities.Product;
import com.educandoweb.course.entities.Role;
import com.educandoweb.course.entities.User;
import com.educandoweb.course.entities.enums.OrderStatus;
import com.educandoweb.course.entities.factory.UserFactory;
import com.educandoweb.course.repositories.CategoryRepository;
import com.educandoweb.course.repositories.OrderItemRepository;
import com.educandoweb.course.repositories.OrderRepository;
import com.educandoweb.course.repositories.ProductRepository;
import com.educandoweb.course.repositories.RoleRepository;
import com.educandoweb.course.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Configuration // classe específica de configuração
@Profile("test") // escolhe o perfil test dentro da file do main/resources
@Import({WebSecurityConfig.class, UserFactory.class})
public class TestConfig implements CommandLineRunner{
	
	@Autowired // injeção de dependência
	private UserRepository userRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserFactory userFactory;

	@Override
	@Transactional
	public void run(String... args) throws Exception {
		
		Category cat1 = new Category(null, "Electronics", "");
		Category cat2 = new Category(null, "Books", null);
		Category cat3 = new Category(null, "Computers", null); 
		
		Product p1 = new Product(null, "The Lord of the Rings", "Lorem ipsum dolor sit amet, consectetur.", 90.5, "");
		Product p2 = new Product(null, "Smart TV", "Nulla eu imperdiet purus. Maecenas ante.", 2190.0, "");
		Product p3 = new Product(null, "Macbook Pro", "Nam eleifend maximus tortor, at mollis.", 1250.0, "");
		Product p4 = new Product(null, "PC Gamer", "Donec aliquet odio ac rhoncus cursus.", 1200.0, "");
		Product p5 = new Product(null, "Rails for Dummies", "Cras fringilla convallis sem vel faucibus.", 100.99, ""); 
		
		categoryRepository.saveAll(Arrays.asList(cat1, cat2, cat3));
		productRepository.saveAll(Arrays.asList(p1,p2,p3,p4,p5));
		
		p1.getCategories().add(cat2);
		p2.getCategories().add(cat1);
		p2.getCategories().add(cat3);
		p3.getCategories().add(cat3);
		p4.getCategories().add(cat3);
		p5.getCategories().add(cat1);
		
		productRepository.saveAll(Arrays.asList(p1,p2,p3,p4,p5));
		
		Role adminRole = new Role(null, "ADMIN");
		Role userRole = new Role(null, "USER");
		
		roleRepository.saveAll(Arrays.asList(adminRole, userRole));
		
		//var roleAdmin = roleRepository.findById(1L);
		
		var roleAdmin2 = roleRepository.findByName(Role.Values.ADMIN.name());
		//var roleUser = roleRepository.findByName(Role.Values.USER.name());
		var userAdmin = userRepository.findByUsername("bobB");
		
		userAdmin.ifPresentOrElse(
				user -> {
					System.out.println("Already exists");
				},
				() -> {
					User user = new User();
					user.setName("Bob Brown");
					user.setEmail("bob@gmail.com");
					user.setPhone("998888888");
					user.setUsername("bobB");
					user.setPassword(encoder.encode("test"));
					user.setRolesOptional(Set.of(roleAdmin2));
					userRepository.save(user);
				}
		);
		
		User u1 = userFactory.crateAdmin(null, "Maria Brown", "maria@gmail.com", "988888888", "mariaB", "test", "img");
		User u2 = userFactory.crateUser(null, "Alex Green", "alex@gmail.com", "977777777", "alexG", "test", "img");
		
//		User u1 = new User(null, "Maria Brown", "maria@gmail.com", "988888888", "mariaB", encoder.encode("test"));
//		User u2 = new User(null, "Alex Green", "alex@gmail.com", "977777777", "alexG" , encoder.encode("test")); 
//		u1.setRolesOptional(Set.of(roleUser));
//		u2.setRolesOptional(Set.of(roleUser));
		
		Order o1 = new Order(null, Instant.parse("2019-06-20T19:53:07Z"), OrderStatus.PAID, u1);
		Order o2 = new Order(null, Instant.parse("2019-07-21T03:42:10Z"), OrderStatus.DELIVERED, u2);
		Order o3 = new Order(null, Instant.parse("2019-07-22T15:21:22Z"), OrderStatus.SHIPPED, u1); 
		
		userRepository.saveAll(Arrays.asList(u1, u2));
		orderRepository.saveAll(Arrays.asList(o1,o2,o3));
		
		OrderItem oi1 = new OrderItem(o1, p1, 2, p1.getPrice());
		OrderItem oi2 = new OrderItem(o1, p3, 1, p3.getPrice());
		OrderItem oi3 = new OrderItem(o2, p3, 2, p3.getPrice());
		OrderItem oi4 = new OrderItem(o3, p5, 2, p5.getPrice());
		
		orderItemRepository.saveAll(Arrays.asList(oi1, oi2, oi3, oi4));
		
		Payment pay1 = new Payment(null, Instant.parse("2019-06-20T21:53:07Z"), o1);
		o1.setPayment(pay1);
		orderRepository.save(o1);
	}
	
	
}
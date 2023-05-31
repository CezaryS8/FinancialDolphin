package dev.cezarys8.fdserver;

import dev.cezarys8.fdserver.user.Role;
import dev.cezarys8.fdserver.user.User;
import dev.cezarys8.fdserver.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
@EnableScheduling
@SpringBootApplication
public class FdServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FdServerApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder encoder) {
		return args -> {
			User user = new User(null,"Jan","Czarek","czarek@wp.pl", encoder.encode( "czarek"), Role.USER,new ArrayList<>());
			userRepository.save(user);
		};
	}

}

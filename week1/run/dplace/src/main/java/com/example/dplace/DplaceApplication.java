package com.example.dplace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

//@SpringBootApplication
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class}) //로그인화면이 뜨지 않게 하는방법
public class DplaceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DplaceApplication.class, args);
	}

}

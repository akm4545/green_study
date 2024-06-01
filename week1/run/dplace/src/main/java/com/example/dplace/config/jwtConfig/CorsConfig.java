package com.example.dplace.config.jwtConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);//서버가 응답할 때, JSON을 JS에서 처리할 수 있게 할까? Yes
		config.addAllowedOrigin("*");//모든 ip에 응답을 허용
		config.addAllowedHeader("*");//모든 header에 응답을 허용
		config.addAllowedMethod("*");//모든 post, get, put, delete, patch 요청을 허용하겠다.
		//모든 요청을 허용했으므로 CORS 정책에서 벗어나게 되었습니다.

		source.registerCorsConfiguration("/api/**", config);
		return new CorsFilter(source);
	}
}

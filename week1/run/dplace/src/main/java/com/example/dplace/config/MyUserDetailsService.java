package com.example.dplace.config;

import com.example.dplace.user.repository.UserMapperDto;
import com.example.dplace.user.repository.UserMapperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MyUserDetailsService implements UserDetailsService {

	private final UserMapperRepository UserMapperRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserMapperDto userMapperDto = UserMapperRepository.userSelectByUserId(UserMapperDto.builder().userId(username).build());

		return User.builder()
				.username(userMapperDto.getUserId())
				.password(userMapperDto.getUserPassword())
				.roles("USER_USERS")
				.build();
	}
}

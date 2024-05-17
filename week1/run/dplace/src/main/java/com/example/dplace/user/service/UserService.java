package com.example.dplace.user.service;

import com.example.dplace.user.repository.UserMapperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserMapperRepository userMapperRepository;

}

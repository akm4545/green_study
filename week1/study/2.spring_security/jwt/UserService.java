public SingleResult<UserResponse.TokenDto> loginUser(UserRequest.LoginDto loginDto) {
        String email = encryptUtil.encryp(loginDto.getEmail());
        String passowrd = loginDto.getPassword();

        User user = userRepository.findByEmailAndDeleteAtIsNull(email).orElseThrow(() -> NOT_FOUND_USER_EXCEPTION);

        if (!passwordEncoder.matches(passowrd, user.getPassword())){
            throw NOT_FOUND_USER_EXCEPTION;
        }

        HashMap<String, Object> claimMap = new HashMap<>();
        claimMap.put("userSeq", user.getUserSeq());
        claimMap.put("email", user.getEmail());
        claimMap.put("authorityType", user.getAuthorityType());

        setSpringSecurityContextHolder(claimMap);

        return responseService.getSingleResult(UserResponse.TokenDto.builder()
                .accessToken(jwtUtil.createToken(claimMap, JwtUtil.TokenType.ACCESS_TOKEN))
                .refreshToken(jwtUtil.createToken(claimMap, JwtUtil.TokenType.REFRESH_TOKEN))
                .build());
    }

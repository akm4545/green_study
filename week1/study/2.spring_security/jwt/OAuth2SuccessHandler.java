@Component
@AllArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        HttpSession session = request.getSession();
        PrincipalDetails oAuth2User = (PrincipalDetails) authentication.getPrincipal();
        User user = oAuth2User.getUser();
        Boolean registerSw = oAuth2User.getRegisterSw();

        HashMap<String, Object> claimMap = new HashMap<>();
        claimMap.put("userSeq", user.getUserSeq());
        claimMap.put("email", user.getEmail());
        claimMap.put("authorityType", user.getAuthorityType());

        if(registerSw){
            session.setAttribute("snsUser", AuthRequest.OAuthUserDto.builder()
                    .providerType(user.getLoginType())
                    .registerSw(registerSw)
                    .userSeq(user.getUserSeq())
                    .build());
        }else{
            UserResponse.TokenDto tokenDto = UserResponse.TokenDto.builder()
                    .accessToken(jwtUtil.createToken(claimMap, JwtUtil.TokenType.ACCESS_TOKEN))
                    .refreshToken(jwtUtil.createToken(claimMap, JwtUtil.TokenType.REFRESH_TOKEN))
                    .build();

            session.setAttribute("snsUser", tokenDto);
        }

        String targetUrl = UriComponentsBuilder.fromUriString("/auth/sns/success")
                .queryParam("registerSw", registerSw)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private Map<String, Object> loginInfoByProviderType(User user){
        String providerType = user.getLoginType();
        Map<String, Object> snsInfoMap = new HashMap<String, Object>();

        switch (providerType) {
            case "GOOGLE":
                snsInfoMap.put("email", user.getEmail());
                snsInfoMap.put("name", user.getName());
                return snsInfoMap;
            case "NAVER":
                snsInfoMap.put("name", user.getName());
                snsInfoMap.put("phone", user.getPhone());
                snsInfoMap.put("birth", user.getBirth());
                return snsInfoMap;
            case "KAKAO":
                snsInfoMap.put("email", user.getEmail());
                return snsInfoMap;
            default: return snsInfoMap;
        }
    }
}
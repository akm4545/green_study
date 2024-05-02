@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthorizationExtractor authExtractor;
    private final JwtUtil jwtUtil;

    private final CustomOAuth2UserService customOAuth2UserService;

    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    private final RedisUtil redisUtil;

    public SpringSecurityConfig(AuthorizationExtractor authExtractor, JwtUtil jwtUtil, CustomOAuth2UserService customOAuth2UserService, OAuth2SuccessHandler oAuth2SuccessHandler, RedisUtil redisUtil) {
        this.authExtractor = authExtractor;
        this.jwtUtil = jwtUtil;
        this.customOAuth2UserService = customOAuth2UserService;
        this.oAuth2SuccessHandler = oAuth2SuccessHandler;
        this.redisUtil = redisUtil;
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.cors().disable()
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeRequests()
                .anyRequest().authenticated()
            .and()
                .oauth2Login()
                .successHandler(oAuth2SuccessHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
            .and()
                .redirectionEndpoint()
                .baseUri("/*/oauth2/code/*");

        http.addFilterBefore(new JwtAuthorizationFilter(authExtractor, jwtUtil, redisUtil), UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new JwtExceptionFilter(), JwtAuthorizationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers(HttpMethod.GET, getMethodIgnoringArray());
        web.ignoring().antMatchers(HttpMethod.POST, postMethodIgnoringArray());
        web.ignoring().antMatchers(HttpMethod.PUT, putMethodIgnoringArray());
    }

    @Bean
    public AuthorizationRequestRepository<OAuth2AuthorizationRequest> authorizationRequestRepository() {
        return new HttpSessionOAuth2AuthorizationRequestRepository();
    }

    private String[] getMethodIgnoringArray(){
        String[] ignoringArray = new String[]{
                "/user/email",
                "/user/findPassword",
                "/user/findEmail",
                "/user/pet/insert/info",
                "/banner",
                "/ad",
                "/auth/**",
                "/notice/**",
                "/event/**",
                "/product/*/qna/list",
                "/qna/*",
                "/product/search",
                "/user/coupon/couponStorage/**",
                "/search/list",
                "/product",
                "/product/**",
                "/product/detail/**",
                "/product/list",
                "/commonCode",
                "/review/*",
                "/product/*/review/list",
                "/category/list",
                "/common/**",
                "/qr",
                "/common/**",
                "/payment/**",
                "/payment/result"
        };

        return ignoringArray;
    }

    private String[] postMethodIgnoringArray(){
        String[] ignoringArray = new String[]{
                "/user",
                "/auth/refresh",
                "/auth/**",
                "/login/**",
                "/payment/**",
                "/payResult",
                "/user/findPassword",
                "/user/findEmail"
        };

        return ignoringArray;
    }

    private String[] putMethodIgnoringArray(){
        String[] ignoringArray = new String[]{"/user/SNS/*"};

        return ignoringArray;
    }
}
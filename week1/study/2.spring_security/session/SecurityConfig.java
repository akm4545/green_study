@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	RestAuthenticationEntryPoint restAuthenticationEntryPoint;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
        return new SaltUtil();
    }
	
	@Bean
	public DaoAuthenticationProvider authProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(customUserDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}
	
	@Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider());
    }
	
	@Override
    public void configure(WebSecurity web) throws Exception{
        web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/lib/**");
    }
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.httpBasic().disable() //rest api 이므로 기본설정 사용안함. 기본설정은 비인증시 로그인폼 화면으로 리다이렉트
			.cors().configurationSource(corsConfigurationSource()).and()
			.csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //JWT Token인증이므로 불필요
			.and()
			.exceptionHandling()
				.authenticationEntryPoint(restAuthenticationEntryPoint)
			.and()
			.authorizeRequests()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.antMatchers("/selectInfoList").permitAll()
				.antMatchers("/selectAd").permitAll()
				.antMatchers("/admin**").hasRole("USER")
				.antMatchers("/**Ad").hasRole("USER") .antMatchers("/**Info").hasRole("USER")
				.antMatchers("/**InfoList").hasRole("USER")
				.antMatchers("/**Admin").hasRole("ADMIN")
				.antMatchers("/**AdminList").hasRole("ADMIN")
		http
			.exceptionHandling()
				.authenticationEntryPoint(restAuthenticationEntryPoint);
			//.accessDeniedPage("/secuxperPackage"); //인증은 성공했으나 권한이 없으면...


        // http.csrf().disable();
        // http.authorizeRequests()
        //         .antMatchers("/user/**").authenticated()
        //         .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
        //         .anyRequest().permitAll()
        //         .and()
        //         .formLogin()
        //         .loginPage("/auth/login") // GET
        //         .loginProcessingUrl("/auth/login") // POST
        //         .defaultSuccessUrl("/");
	}
	
	 @Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration configuration = new CorsConfiguration();

	        configuration.addAllowedOriginPattern("*");
	        configuration.addAllowedHeader("*");
	        configuration.addAllowedMethod("*");
	        configuration.setAllowCredentials(true);

	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", configuration);
	        return source;
	    }
	 
}
public class JwtAuthorizationFilter extends GenericFilterBean {

    private final AuthorizationExtractor authExtractor;
    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;

    public JwtAuthorizationFilter(AuthorizationExtractor authExtractor, JwtUtil jwtUtil, RedisUtil redisUtil) {
        this.authExtractor = authExtractor;
        this.jwtUtil = jwtUtil;
        this.redisUtil = redisUtil;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest)request;
        String path = httpServletRequest.getServletPath();

        if(!path.contains("/oauth/code/") && !path.contains("/login")){
            String token = authExtractor.extract((HttpServletRequest) request, "Bearer");
            if (StringUtils.isNullOrEmpty(token) || !jwtUtil.validateToken(token)) throw INVALID_JWT_EXCEPTION;

            if (redisUtil.hasKeyBlackList(token)){
                throw INVALID_JWT_EXCEPTION;
            }

            Map<String, Object> claimMap = jwtUtil.parseTokenToMap(token);
            SecurityContextHolder.getContext().setAuthentication(jwtUtil.authenticate(claimMap));
        }

        chain.doFilter(request, response);
    }
}
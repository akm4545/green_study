public class JwtExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        }catch (JwtException.InvalidJwtException exception){
            setErrorResponse(HttpStatus.UNAUTHORIZED, response, exception);
        }
    }

    public void setErrorResponse(HttpStatus status, HttpServletResponse response, JwtException.InvalidJwtException exception) throws IOException {
        response.setStatus(status.value());
        response.setContentType("application/json; charset=UTF-8");

        response.getWriter().write("{\n" +
                "    \"code\": " + exception.getErrorCodeAndMessage().getCode() + ",\n" +
                "    \"message\": \"" + exception.getErrorCodeAndMessage().getMessage() + "\"\n" +
                "}");
    }
}
